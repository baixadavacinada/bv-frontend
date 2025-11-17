import { useAuth, UserRole } from '@/hooks/use-firebase-auth'
import { filterNavigationByRole, NavigationItem } from '@/lib/layout-navigation'

export type ActionType =
  | 'ubs'
  | 'evaluation'
  | 'cartilha'
  | 'vaccination'
  | 'settings'
  | 'notifications'
  | 'ubs-management'
  | 'user-management'
  | 'vaccine-management'

export const ROLE_ACTIONS: Record<UserRole, ActionType[]> = {
  public: ['ubs', 'evaluation', 'cartilha', 'settings'],
  agent: ['notifications', 'ubs-management', 'vaccine-management', 'settings'],
  admin: [
    'evaluation',
    'cartilha',
    'notifications',
    'ubs-management',
    'user-management',
    'vaccine-management',
    'settings',
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
    // Agent gets only agent actions (not public actions)
    else if (role === 'agent') {
      allowedActions = ROLE_ACTIONS['agent']
    }
    // Public only gets public actions
    else {
      allowedActions = ROLE_ACTIONS['public']
    }

    // Add vaccination if user is authenticated
    if (isAuthenticated && !allowedActions.includes('vaccination')) {
      allowedActions = [...allowedActions, 'vaccination']
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
