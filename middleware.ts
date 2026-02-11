import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    if (path.startsWith('/dashboard') && !token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    if ((path === '/auth/signin' || path === '/auth/signup') && token) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}
