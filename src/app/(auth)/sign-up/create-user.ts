'use server'

import { db } from '@/src/db'
import { usersSchema } from '@/src/db/schema'
import { hash } from 'bcrypt'
import { eq } from 'drizzle-orm'

interface ICreateUser {
  name: string
  username: string
  password: string
}

interface ICreateUserResponse {
  message: string
  status: number
}

export async function createUser({
  name,
  username,
  password,
}: ICreateUser): Promise<ICreateUserResponse> {
  const [userAlreadyExists] = await db
    .select({ username: usersSchema.username })
    .from(usersSchema)
    .where(eq(usersSchema.username, username))
    .limit(1)

  if (userAlreadyExists) {
    return { message: 'User already exists', status: 409 }
  }

  const hashedPassword = await hash(password, 8)

  await db
    .insert(usersSchema)
    .values({ name, username, password_hash: hashedPassword })

  return { message: 'User created', status: 201 }
}
