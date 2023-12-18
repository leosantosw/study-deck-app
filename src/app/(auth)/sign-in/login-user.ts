'use server'

import { db } from '@/src/db'
import { usersSchema } from '@/src/db/schema'
import { compare } from 'bcrypt'
import { eq } from 'drizzle-orm'
import * as jose from 'jose'

interface ILoginUser {
  username: string
  password: string
}

interface ILoginUserResponse {
  message: string
  status: number
  access_token?: string
}

export async function loginUser({
  username,
  password,
}: ILoginUser): Promise<ILoginUserResponse> {
  const [user] = await db
    .select({
      id: usersSchema.id,
      name: usersSchema.name,
      username: usersSchema.username,
      password_hash: usersSchema.password_hash,
    })
    .from(usersSchema)
    .where(eq(usersSchema.username, username))
    .limit(1)

  if (!user) {
    return { message: 'wrong username or password', status: 401 }
  }

  const isSamePassword = await compare(password, user.password_hash)

  if (!isSamePassword) {
    return { message: 'wrong username or password', status: 401 }
  }

  const accessToken = await new jose.SignJWT({
    user_id: user.id,
    full_name: user.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(String(process.env.JWT_SECRET_KEY)))

  return { message: 'User logged in', status: 201, access_token: accessToken }
}
