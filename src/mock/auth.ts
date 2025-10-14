export type UserRole = 'MORADOR' | 'AGENTE_SAUDE' | 'ADMIN'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

// Mock de usuários para teste
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.agente@saude.gov.br',
    role: 'AGENTE_SAUDE',
  },
  {
    id: '2',
    name: 'Maria Admin',
    email: 'maria.admin@saude.gov.br',
    role: 'ADMIN',
  },
  {
    id: '3',
    name: 'Carlos Morador',
    email: 'carlos.morador@email.com',
    role: 'MORADOR',
  },
]

// Simula login com Google
export async function mockGoogleLogin(
  email: string,
): Promise<{ token: string; user: User } | null> {
  // Simula delay de API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email)
  if (!user) return null

  // Mock JWT token (em produção seria gerado pelo backend)
  const mockToken = `mock.jwt.token.${user.id}.${Date.now()}`

  return { token: mockToken, user }
}

// Hook para verificar autenticação no client-side
export function useAuth() {
  if (typeof window === 'undefined') {
    return {
      isAuthenticated: false,
      role: 'MORADOR' as UserRole,
      user: null,
    }
  }

  const token = document.cookie
    .split(';')
    .find((row) => row.trim().startsWith('token='))
    ?.split('=')[1]

  const role =
    (document.cookie
      .split(';')
      .find((row) => row.trim().startsWith('userRole='))
      ?.split('=')[1] as UserRole) || 'MORADOR'

  const userId = document.cookie
    .split(';')
    .find((row) => row.trim().startsWith('userId='))
    ?.split('=')[1]

  // Simula buscar dados do usuário (em produção viria da API)
  const user = userId ? mockUsers.find((u) => u.id === userId) || null : null

  return {
    isAuthenticated: !!token,
    role,
    user,
  }
}

// Função para setar cookies no client-side
export function setClientAuthCookies(token: string, user: User) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()

  document.cookie = `token=${token}; expires=${expires}; path=/; SameSite=Lax`
  document.cookie = `userRole=${user.role}; expires=${expires}; path=/; SameSite=Lax`
  document.cookie = `userId=${user.id}; expires=${expires}; path=/; SameSite=Lax`
  document.cookie = `userName=${encodeURIComponent(user.name)}; expires=${expires}; path=/; SameSite=Lax`
}

// Função para limpar cookies no client-side
export function clearClientAuthCookies() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
