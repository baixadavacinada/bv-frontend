import { UserRole } from '@/hooks/use-firebase-auth'

import { CiSettings } from 'react-icons/ci'
import { FaSyringe } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { BsHouse, BsGeoAlt, BsFileEarmarkText, BsBell } from 'react-icons/bs'

export interface NavigationItem {
  id: string
  icon: IconType
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
    id: 'home',
    icon: BsHouse,
    label: 'Home',
    href: '/inicio',
    allowedRoles: ['public', 'agent', 'admin'],
  },
  {
    id: 'ubs',
    icon: BsGeoAlt,
    label: 'UBS',
    href: '/ubs',
    allowedRoles: ['public', 'agent'],
  },
  {
    id: 'notifications',
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
    id: 'home',
    icon: BsHouse,
    label: 'Home',
    href: '/inicio',
    allowedRoles: ['public', 'agent', 'admin'],
  },
  {
    id: 'carteira-vacinacao',
    icon: FaSyringe,
    label: 'Carteira de Vacinação',
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

// Função para filtrar itens de navegação baseado na role
export function filterNavigationByRole<T extends NavigationItem>(
  items: T[],
  userRole: UserRole | null,
): T[] {
  if (!userRole) {
    return items.filter((item) => item.allowedRoles.includes('public'))
  }

  return items.filter((item) => item.allowedRoles.includes(userRole))
}
