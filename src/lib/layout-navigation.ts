import { CiSettings } from 'react-icons/ci'
import { FaSyringe, FaCircle } from 'react-icons/fa'
import { IconType } from 'react-icons'
import {
  BsSun,
  BsFillPersonFill,
  BsArrowBarRight,
  BsHouse,
  BsGeoAlt,
  BsFileEarmarkText,
  BsSearch,
  BsHeart,
} from 'react-icons/bs'

export interface NavigationItem {
  id: string
  icon: IconType
  label?: string
  href: string
  badge?: string | number
  disabled?: boolean
  external?: boolean
}

// Menu principal do sidebar (desktop)
export const sidebarNavigation: NavigationItem[] = [
  {
    id: 'home',
    icon: BsHouse,
    label: 'Home',
    href: '/',
  },
  {
    id: 'ubs',
    icon: BsGeoAlt,
    label: 'UBS',
    href: '/',
  },
  {
    id: 'registro',
    icon: BsFileEarmarkText,
    label: 'Registro de vacinas',
    href: '/',
  },
  {
    id: 'cartilha',
    icon: FaSyringe,
    label: 'Cartilha de vacinas',
    href: '/',
  },
  {
    id: 'pesquisar',
    icon: BsSearch,
    label: 'Pesquisar',
    href: '/',
  },
  {
    id: 'favoritos',
    icon: BsHeart,
    label: 'Favoritos',
    href: '/',
  },
  {
    id: 'configuracoes',
    icon: CiSettings,
    label: 'Configurações',
    href: '/',
  },
]

// Ações do navbar (ícones do canto direito)
export const navbarActions: NavigationItem[] = [
  {
    id: 'tema',
    icon: BsSun,
    href: '/',
  },
  {
    id: 'configuracao',
    icon: CiSettings,
    href: '/',
  },
  {
    id: 'profile',
    icon: BsFillPersonFill,
    href: '/',
  },
  {
    id: 'logout',
    icon: BsArrowBarRight,
    href: '/',
  },
]

// Menu principal do footer (mobile/tablet)
export const footerNavigation: NavigationItem[] = [
  {
    id: 'home',
    icon: BsHouse,
    label: 'Home',
    href: '/',
  },
  {
    id: 'pesquisar',
    icon: BsSearch,
    label: 'Buscar',
    href: '/',
  },
  {
    id: 'configuracao',
    icon: FaCircle,
    label: 'Configurações',
    href: '/',
  },
  {
    id: 'ubs',
    icon: BsGeoAlt,
    label: 'UBS',
    href: '/',
  },
  {
    id: 'favoritos',
    icon: BsHeart,
    label: 'Favoritos',
    href: '/',
  },
]
