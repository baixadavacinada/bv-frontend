import { useAuth, UserRole } from '@/hooks/use-firebase-auth'
import { filterNavigationByRole, NavigationItem } from '@/lib/layout-navigation'

export type ActionType =
  | 'ubs'
  | 'evaluation'
  | 'calendar'
  | 'cartilha'
  | 'vaccination'
  | 'settings'
  | 'notifications'
  | 'ubs-management'
  | 'user-management'
  | 'vaccine-management'

export const ROLE_ACTIONS: Record<UserRole, ActionType[]> = {
  public: ['ubs', 'evaluation', 'calendar', 'cartilha', 'vaccination'],
  agent: ['ubs', 'evaluation', 'calendar', 'cartilha', 'notifications'],
  admin: [
    'evaluation',
    'calendar',
    'cartilha',
    'notifications',
    'ubs-management',
    'user-management',
    'vaccine-management',
  ],
}

export function usePermissions() {
  const { user } = useAuth()
  const role = user?.role || 'public'
  const isAuthenticated = !!user

  const hasPermission = (action: ActionType): boolean => {
    // Vaccination requires authentication
    if (action === 'vaccination' && !isAuthenticated) {
      return false
    }

    // Admin has access to all actions
    if (role === 'admin') {
      return true
    }

    // Agent has access to agent and public actions
    if (role === 'agent') {
      return ROLE_ACTIONS['agent'].includes(action) || ROLE_ACTIONS['public'].includes(action)
    }

    // Public can only access public actions
    return ROLE_ACTIONS['public'].includes(action)
  }

  const getAllowedActions = (): ActionType[] => {
    let allowedActions: ActionType[] = []

    // Admin gets all actions (including public and agent)
    if (role === 'admin') {
      allowedActions = ROLE_ACTIONS['admin']
    }
    // Agent gets agent + public actions
    else if (role === 'agent') {
      allowedActions = [...new Set([...ROLE_ACTIONS['agent'], ...ROLE_ACTIONS['public']])]
    }
    // Public only gets public actions
    else {
      allowedActions = ROLE_ACTIONS['public']
    }

    // Filter out vaccination if user is not authenticated
    if (!isAuthenticated) {
      allowedActions = allowedActions.filter((action) => action !== 'vaccination')
    }

    return allowedActions
  }

  const filterNavigationItems = <T extends NavigationItem>(items: T[]): T[] => {
    return filterNavigationByRole(items, role, isAuthenticated)
  }

  return {
    role,
    isAuthenticated,
    hasPermission,
    getAllowedActions,
    filterNavigationItems,
  }
}
