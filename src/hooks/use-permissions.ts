import { useAuth, UserRole } from '@/hooks/use-firebase-auth'
import { filterNavigationByRole, NavigationItem } from '@/lib/layout-navigation'

export type ActionType =
  | 'ubs'
  | 'evaluation'
  | 'calendar'
  | 'cartilha'
  | 'settings'
  | 'notifications'
  | 'ubs-management'
  | 'user-management'
  | 'vaccine-management'

export const ROLE_ACTIONS: Record<UserRole, ActionType[]> = {
  public: ['ubs', 'evaluation', 'calendar', 'cartilha'],
  agent: ['evaluation', 'calendar', 'cartilha', 'notifications'],
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

  const hasPermission = (action: ActionType): boolean => {
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
    // Admin gets all actions (including public and agent)
    if (role === 'admin') {
      return ROLE_ACTIONS['admin']
    }

    // Agent gets agent + public actions
    if (role === 'agent') {
      return [...new Set([...ROLE_ACTIONS['agent'], ...ROLE_ACTIONS['public']])]
    }

    // Public only gets public actions
    return ROLE_ACTIONS['public']
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
