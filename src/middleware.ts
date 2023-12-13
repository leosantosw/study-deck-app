import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'
import { db } from './db'
import { usersSchema } from './db/schema'
import { eq } from 'drizzle-orm'

interface GetAccessToken {
  name: string
  value: string
}

interface JWTPayload {
  user_id: string
}

export async function middleware(request: NextRequest) {
  const { value: accessToken = null } = request.cookies.get(
    'access_token'
  ) as GetAccessToken

  if (!accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    const {
      payload: { user_id: userId },
    } = await jose.jwtVerify<JWTPayload>(
      accessToken,
      new TextEncoder().encode(String(process.env.JWT_SECRET_KEY))
    )
    console.log('userId', userId)

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: '/dashboard',
}
