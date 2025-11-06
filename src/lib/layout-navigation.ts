import { ActionType } from '@/hooks/use-permissions'

import { CiSettings } from 'react-icons/ci'
import { FaSyringe } from 'react-icons/fa'
import { IconType } from 'react-icons'
import {
  BsFillPersonFill,
  BsHouse,
  BsGeoAlt,
  BsFileEarmarkText,
  BsSearch,
  BsHeart,
  BsBell,
} from 'react-icons/bs'

export interface NavigationItem {
  id: string
  icon: IconType
  label?: string
  href: string
  badge?: string | number
  disabled?: boolean
  external?: boolean
  requiredPermission?: ActionType // controle de permissões
  hideForRoles?: string[] // Ocultar para roles específicos
  showOnlyForRoles?: string[] // Mostrar apenas para roles específicos
}

// Menu principal do sidebar (desktop)
export const sidebarNavigation: NavigationItem[] = [
  {
    id: 'home',
    icon: BsHouse,
    label: 'Home',
    href: '/inicio',
  },
  {
    id: 'ubs',
    icon: BsGeoAlt,
    label: 'UBS',
    href: '/ubs',
    requiredPermission: 'ubs',
    hideForRoles: ['ADMIN'],
  },
  {
    id: 'registro',
    icon: BsFileEarmarkText,
    label: 'Registro de vacinas',
    href: '/vacinacao',
    requiredPermission: 'vaccination',
    hideForRoles: ['agent'],
  },
  {
    id: 'user-register',
    icon: BsFileEarmarkText,
    label: 'Registro por morador',
    href: '/registro-usuario',
    requiredPermission: 'user-register',
    hideForRoles: ['public'],
  },
  {
    id: 'alert-settings',
    icon: BsBell,
    label: 'Ajustes de alertas',
    href: '/ajustes-alertas',
    requiredPermission: 'alert-settings',
    hideForRoles: ['public'],
  },
  {
    id: 'cartilha',
    icon: FaSyringe,
    label: 'Cartilha de vacinas',
    href: '/cartilha-vacinas',
    requiredPermission: 'guide',
    hideForRoles: ['ADMIN'],
  },
  {
    id: 'gestao-ubs',
    icon: BsFileEarmarkText,
    label: 'Gestão de UBS',
    href: '/gestao-ubs',
    requiredPermission: 'ubs-management',
    hideForRoles: ['MORADOR', 'AGENTE_SAUDE'],
  },
  {
    id: 'gestao-usuarios',
    icon: BsFileEarmarkText,
    label: 'Gestão de Usuários',
    href: '/gestao-usuarios',
    requiredPermission: 'user-management',
    hideForRoles: ['MORADOR', 'AGENTE_SAUDE'],
  },
  {
    id: 'gestao-vacinas',
    icon: BsFileEarmarkText,
    label: 'Gestão de Vacinas',
    href: '/gestao-vacinas',
    requiredPermission: 'vaccine-management',
    hideForRoles: ['MORADOR', 'AGENTE_SAUDE'],
  },
  {
    id: 'pesquisar',
    icon: BsSearch,
    label: 'Pesquisar',
    href: '/busca',
  },
  {
    id: 'favoritos',
    icon: BsHeart,
    label: 'Favoritos',
    href: '/favoritos',
  },
  {
    id: 'materiais-educativos',
    icon: BsFileEarmarkText,
    label: 'Materiais Educativos',
    href: '/materiais-educativos',
    requiredPermission: 'educational-materials',
    hideForRoles: ['MORADOR', 'AGENTE_SAUDE'],
  },

  {
    id: 'alert-settings',
    icon: BsBell,
    label: 'Ajustes de notificações',
    href: '/ajustes-alertas',
    requiredPermission: 'alert-settings',
    hideForRoles: ['MORADOR', 'AGENTE_SAUDE'],
  },
  {
    id: 'configuracoes',
    icon: CiSettings,
    label: 'Configurações',
    href: '/configuracoes',
    requiredPermission: 'settings',
  },
  {
    id: 'avaliacoes',
    icon: BsFileEarmarkText,
    label: 'Avaliações',
    href: '/avaliacao',
    requiredPermission: 'assessments',
    hideForRoles: ['MORADOR', 'AGENTE_SAUDE'],
  },
]

// Ações do navbar (ícones do canto direito)
export const navbarActions: NavigationItem[] = [
  // {
  //   id: 'tema',
  //   icon: BsSun,
  //   href: '/',
  // },
  {
    id: 'configuracao',
    icon: CiSettings,
    href: '/configuracoes',
    requiredPermission: 'settings',
    showOnlyForRoles: ['admin', 'agent', 'public'],
  },
  {
    id: 'profile',
    icon: BsFillPersonFill,
    href: '/perfil',
    showOnlyForRoles: ['MORADOR'],
  },
]

// Menu principal do footer (mobile/tablet)
export const footerNavigation: NavigationItem[] = [
  {
    id: 'home',
    icon: BsHouse,
    label: 'Home',
    href: '/inicio',
  },
  {
    id: 'pesquisar',
    icon: BsSearch,
    label: 'Buscar',
    href: '/busca',
  },
  {
    id: 'carteira-vacinacao',
    icon: FaSyringe,
    label: 'Carteira de Vacinação',
    href: '/cartilha-vacinas',
    requiredPermission: 'vaccination',
    hideForRoles: ['agent'],
  },
  {
    id: 'ubs',
    icon: BsGeoAlt,
    label: 'UBS',
    href: '/ubs',
    requiredPermission: 'ubs',
    hideForRoles: ['ADMIN'],
  },
  {
    id: 'gestao-ubs',
    icon: BsGeoAlt,
    label: 'Gestão de UBS',
    href: '/gestao-ubs',
    requiredPermission: 'ubs-management',
    hideForRoles: ['MORADOR', 'AGENTE_SAUDE'],
  },
  {
    id: 'favoritos',
    icon: BsHeart,
    label: 'Favoritos',
    href: '/favoritos',
  },
]
