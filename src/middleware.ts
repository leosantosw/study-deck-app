import * as jose from 'jose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SIGN_IN_PATH = '/sign-in'
const DASHBOARD_PATH = '/dashboard'

interface JWTPayload {
  user_id: string
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value ?? null
  const currentPathname = request.nextUrl.pathname

  if (!accessToken) {
    return currentPathname === SIGN_IN_PATH
      ? NextResponse.next({ request })
      : NextResponse.redirect(new URL(SIGN_IN_PATH, request.url))
  }

  const userId = await verifyToken(accessToken)

  if (!userId) {
    return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url))
  }

  request.cookies.set('user_id', String(userId))

  if (currentPathname.includes(DASHBOARD_PATH)) {
    return NextResponse.next({ request })
  }

  return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url))
}

async function verifyToken(accessToken: string): Promise<boolean | string> {
  try {
    const {
      payload: { user_id: userId },
    } = await jose.jwtVerify<JWTPayload>(
      accessToken,
      new TextEncoder().encode(String(process.env.JWT_SECRET_KEY))
    )
    return userId
  } catch (error) {
    return false
  }
}

export const config = {
  matcher: ['/', '/sign-in', '/dashboard/:path*'],
}
