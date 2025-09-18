import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Definição das rotas públicas e comportamento baseado na autenticação
const publicRoutes = [
  { path: '/login', whenAuthenticated: 'redirect' },
  { path: '/cadastro', whenAuthenticated: 'redirect' },
  { path: '/inicio', whenAuthenticated: 'next' },
  { path: '/ubs', whenAuthenticated: 'next' },
  { path: '/configuracao', whenAuthenticated: 'next' },
  { path: '/cartilha-vacinas', whenAuthenticated: 'next' },
]

// Rotas que requerem roles específicos
const roleBasedRoutes = [
  { path: '/cadastro-usuario', allowedRoles: ['AGENTE_SAUDE', 'ADMIN'] },
  { path: '/alertas', allowedRoles: ['AGENTE_SAUDE', 'ADMIN'] },
  { path: '/gestao-ubs', allowedRoles: ['AGENTE_SAUDE', 'ADMIN'] },
  { path: '/vacinacao/editar', allowedRoles: ['AGENTE_SAUDE', 'ADMIN'] },
  { path: '/locais/editar', allowedRoles: ['AGENTE_SAUDE', 'ADMIN'] },
  { path: '/horarios/editar', allowedRoles: ['AGENTE_SAUDE', 'ADMIN'] },
]

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/inicio'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Redirecionamento da raiz para /inicio
  if (pathname === '/') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/inicio'
    return NextResponse.redirect(redirectUrl)
  }

  // Verificação de token de autenticação
  const authToken = request.cookies.get('token')
  const isAuthenticated = !!authToken

  // Obter role do usuário
  const userRole = request.cookies.get('userRole')?.value || 'MORADOR'

  // Verifica se a rota atual é pública
  const publicRoute = publicRoutes.find((route) => pathname.startsWith(route.path))

  // Verifica se a rota requer role específico
  const roleRoute = roleBasedRoutes.find((route) => pathname.startsWith(route.path))

  // 1. Usuário NÃO autenticado acessando rota privada
  if (!isAuthenticated && !publicRoute && roleRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  // 2. Usuário autenticado acessando /login ou /cadastro
  if (isAuthenticated && publicRoute?.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  // 3. Verificação de roles para rotas específicas
  if (roleRoute && isAuthenticated && !roleRoute.allowedRoles.includes(userRole)) {
    // Usuário autenticado mas sem permissão
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|map)$).*)',
  ],
}
