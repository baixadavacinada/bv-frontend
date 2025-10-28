import { useAuth, UserRole } from '@/hooks/use-firebase-auth'

export type ActionType =
  | 'ubs'
  | 'vaccination'
  | 'settings'
  | 'guide'
  | 'user-register'
  | 'alert-settings'
  | 'ubs-management'
  | 'user-management'
  | 'vaccine-management'
  | 'educational-materials'
  | 'assessments'

export const ROLE_PERMISSIONS: Record<UserRole, ActionType[]> = {
  public: ['ubs', 'vaccination', 'settings', 'guide'],
  agent: [
    'ubs',
    'user-register',
    'alert-settings',
    'settings',
    'gestao-ubs',
    'vaccination-edit',
    'locations-edit',
    'schedules-edit',
  ],
  admin: [
    'ubs',
    'vaccination',
    'settings',
    'alert-settings',
    'ubs-management',
    'user-management',
    'vaccine-management',
    'educational-materials',
    'assessments',
  ],
}

interface NavigationItem {
  requiredPermission?: ActionType
  hideForRoles?: string[]
  showOnlyForRoles?: string[]
}

export function usePermissions() {
  const { user } = useAuth()
  const role = user?.role || 'public'

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
