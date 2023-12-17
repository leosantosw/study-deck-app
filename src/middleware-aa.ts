import * as jose from 'jose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface GetAccessToken {
  name: string
  value: string
}

interface JWTPayload {
  user_id: string
}

export async function middleware(request: NextRequest) {
  console.log('redict middleware')

  const accessTokenCookie = request.cookies.get(
    'access_token'
  ) as GetAccessToken

  if (!accessTokenCookie?.value) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  const { value: accessToken } = accessTokenCookie

  try {
    const {
      payload: { user_id: userId },
    } = await jose.jwtVerify<JWTPayload>(
      accessToken,
      new TextEncoder().encode(String(process.env.JWT_SECRET_KEY))
    )
    request.cookies.set('user_id', userId)
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: '/',
}
