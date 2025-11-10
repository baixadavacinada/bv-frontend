import { useAuth, UserRole } from '@/hooks/use-firebase-auth'
import { filterNavigationByRole, NavigationItem } from '@/lib/layout-navigation'

export type ActionType =
  | 'ubs'
  | 'settings'
  | 'notifications'
  | 'ubs-management'
  | 'user-management'
  | 'vaccine-management'

export const ROLE_ACTIONS: Record<UserRole, ActionType[]> = {
  public: ['ubs', 'notifications'],
  agent: ['ubs', 'notifications'],
  admin: ['ubs-management', 'user-management', 'vaccine-management', 'notifications'],
}

export function usePermissions() {
  const { user } = useAuth()
  const role = user?.role || 'public'

  const hasPermission = (action: ActionType): boolean => {
    return ROLE_ACTIONS[role].includes(action)
  }

  const getAllowedActions = (): ActionType[] => {
    return ROLE_ACTIONS[role]
  }

  const filterNavigationItems = <T extends NavigationItem>(items: T[]): T[] => {
    return filterNavigationByRole(items, role)
  }

  return {
    role,
    hasPermission,
    getAllowedActions,
    filterNavigationItems,
  }
}
