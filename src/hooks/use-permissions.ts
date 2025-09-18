import { useAuth, UserRole } from '@/mock/auth'

export type ActionType =
  | 'ubs'
  | 'vaccination'
  | 'settings'
  | 'guide'
  | 'user-register'
  | 'alert-settings'
  | 'gestao-ubs'
  | 'vaccination-edit'
  | 'locations-edit'
  | 'schedules-edit'

// Mapeamento de permissões por role
export const ROLE_PERMISSIONS: Record<UserRole, ActionType[]> = {
  MORADOR: ['ubs', 'vaccination', 'settings', 'guide'],
  AGENTE_SAUDE: [
    'ubs',
    'user-register',
    'alert-settings',
    'settings',
    'gestao-ubs',
    'vaccination-edit',
    'locations-edit',
    'schedules-edit',
  ],
  ADMIN: [
    'ubs',
    'vaccination',
    'settings',
    'guide',
    'user-register',
    'alert-settings',
    'gestao-ubs',
    'vaccination-edit',
    'locations-edit',
    'schedules-edit',
  ],
}

interface NavigationItem {
  requiredPermission?: ActionType
  hideForRoles?: string[]
  showOnlyForRoles?: string[]
}

export function usePermissions() {
  const { role } = useAuth()

  const hasPermission = (action: ActionType): boolean => {
    return ROLE_PERMISSIONS[role].includes(action)
  }

  const getAllowedActions = (): ActionType[] => {
    return ROLE_PERMISSIONS[role]
  }

  const filterAllowedActions = (actions: ActionType[]): ActionType[] => {
    const allowedActions = getAllowedActions()
    return actions.filter((action) => allowedActions.includes(action))
  }

  // filtrar itens de navegação
  const filterNavigationItems = <T extends NavigationItem>(items: T[]): T[] => {
    return items.filter((item) => {
      if (item.requiredPermission && !hasPermission(item.requiredPermission)) {
        return false
      }

      if (item.hideForRoles && item.hideForRoles.includes(role)) {
        return false
      }

      if (item.showOnlyForRoles && !item.showOnlyForRoles.includes(role)) {
        return false
      }

      return true
    })
  }

  return {
    role,
    hasPermission,
    getAllowedActions,
    filterAllowedActions,
    filterNavigationItems,
  }
}
