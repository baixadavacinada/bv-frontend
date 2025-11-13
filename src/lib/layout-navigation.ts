import { UserRole } from '@/hooks/use-firebase-auth'

import { CiSettings } from 'react-icons/ci'
import { FaSyringe } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { BsHouse, BsGeoAlt, BsFileEarmarkText, BsBell } from 'react-icons/bs'
import { Star, Calendar, BookOpen } from 'lucide-react'

export interface NavigationItem {
  id: string
  icon: IconType | typeof Star
  label?: string
  href: string
  badge?: string | number
  disabled?: boolean
  external?: boolean
  allowedRoles: UserRole[]
}

// Menu principal do sidebar (desktop)
export const sidebarNavigation: NavigationItem[] = [
  {
    id: 'inicio',
    icon: BsHouse,
    label: 'Início',
    href: '/inicio',
    allowedRoles: ['public', 'agent', 'admin'],
  },
  {
    id: 'ubs',
    icon: BsGeoAlt,
    label: 'UBS',
    href: '/ubs',
    allowedRoles: ['public', 'agent', 'admin'],
  },
  {
    id: 'avaliar-ubs',
    icon: Star,
    label: 'Avaliar UBS',
    href: '/ubs/avaliar',
    allowedRoles: ['public', 'agent', 'admin'],
  },
  {
    id: 'calendario-vacinas',
    icon: Calendar,
    label: 'Calendário de Vacinação',
    href: '/calendario-vacinas',
    allowedRoles: ['public', 'agent', 'admin'],
  },
  {
    id: 'cartilha-vacinas',
    icon: BookOpen,
    label: 'Cartilha de Vacinas',
    href: '/cartilha-vacinas',
    allowedRoles: ['public', 'agent', 'admin'],
  },
  {
    id: 'registro-vacinacao',
    icon: FaSyringe,
    label: 'Registro de Vacinação',
    href: '/vacinacao',
    allowedRoles: ['public', 'agent', 'admin'],
  },
  {
    id: 'notificacoes',
    icon: BsBell,
    label: 'Notificações',
    href: '/notificacoes',
    allowedRoles: ['agent', 'admin'],
  },
  {
    id: 'gestao-ubs',
    icon: BsFileEarmarkText,
    label: 'Gestão de UBS',
    href: '/gestao-ubs',
    allowedRoles: ['admin'],
  },
  {
    id: 'gestao-usuarios',
    icon: BsFileEarmarkText,
    label: 'Gestão de Usuários',
    href: '/gestao-usuarios',
    allowedRoles: ['admin'],
  },
  {
    id: 'gestao-vacinas',
    icon: BsFileEarmarkText,
    label: 'Gestão de Vacinas',
    href: '/gestao-vacinas',
    allowedRoles: ['admin'],
  },
]

// Ações do navbar (ícones do canto direito)
export const navbarActions: NavigationItem[] = [
  {
    id: 'configuracao',
    icon: CiSettings,
    href: '/configuracoes',
    allowedRoles: ['agent', 'admin'],
  },
]

// Menu principal do footer (mobile/tablet)
export const footerNavigation: NavigationItem[] = [
  {
    id: 'inicio',
    icon: BsHouse,
    label: 'Início',
    href: '/inicio',
    allowedRoles: ['public', 'agent', 'admin'],
  },
  {
    id: 'registro-vacinacao',
    icon: FaSyringe,
    label: 'Registro de Vacinação',
    href: '/vacinacao',
    allowedRoles: ['public', 'agent', 'admin'],
  },
  {
    id: 'cartilha-vacinas',
    icon: BookOpen,
    label: 'Cartilha de Vacinas',
    href: '/cartilha-vacinas',
    allowedRoles: ['public', 'agent', 'admin'],
  },
  {
    id: 'ubs',
    icon: BsGeoAlt,
    label: 'UBS',
    href: '/ubs',
    allowedRoles: ['public', 'agent', 'admin'],
  },
]

// Função para filtrar itens de navegação baseado na role e autenticação
export function filterNavigationByRole<T extends NavigationItem>(
  items: T[],
  userRole: UserRole | null,
  isAuthenticated: boolean = false,
): T[] {
  if (!userRole) {
    // If not authenticated, exclude vaccination-related items
    const filteredItems = items.filter((item) => item.allowedRoles.includes('public'))
    if (!isAuthenticated) {
      return filteredItems.filter((item) => item.id !== 'registro-vacinacao')
    }
    return filteredItems
  }

  let allowedItems: T[] = []

  // Admin has access to all roles (hierarchy: admin > agent > public)
  if (userRole === 'admin') {
    allowedItems = items.filter(
      (item) =>
        item.allowedRoles.includes('admin') ||
        item.allowedRoles.includes('agent') ||
        item.allowedRoles.includes('public'),
    )
  }
  // Agent can access agent and public items
  else if (userRole === 'agent') {
    allowedItems = items.filter(
      (item) => item.allowedRoles.includes('agent') || item.allowedRoles.includes('public'),
    )
  }
  // Public can only access public items
  else {
    allowedItems = items.filter((item) => item.allowedRoles.includes('public'))
  }

  // Filter out vaccination registration if not authenticated
  if (!isAuthenticated) {
    allowedItems = allowedItems.filter((item) => item.id !== 'registro-vacinacao')
  }

  return allowedItems
}
