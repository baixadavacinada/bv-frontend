import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authRoutes = ['/login', '/registro-usuario']

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/login'
const REDIRECT_WHEN_AUTHENTICATED = '/inicio'

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Pular verificação para arquivos estáticos, API routes, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Verificação simples de token
  const firebaseToken = request.cookies.get('firebase-token')
  const isAuthenticated = !!firebaseToken?.value

  // Se há token mas queremos validação mais robusta, podemos implementar aqui
  // Por enquanto, apenas verificamos a presença do token

  // Se é uma rota de autenticação e o usuário já está logado, redireciona
  if (isAuthenticated && authRoutes.includes(pathname)) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED
    return NextResponse.redirect(redirectUrl)
  }

  // Se é uma rota privada (dentro do grupo (private)) e não está autenticado
  if (pathname.startsWith('/(private)') && !isAuthenticated) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|map)$).*)',
  ],
}
