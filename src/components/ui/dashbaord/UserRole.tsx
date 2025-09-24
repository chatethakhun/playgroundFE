import { cn } from '@/lib/utils'
import { memo } from 'react'

const roleToLocale = (role: string) => {
  switch (role) {
    case 'admin':
      return 'dashboard.users.role_admin'
    case 'user':
      return 'dashboard.users.role_user'
    case 'guest':
      return 'dashboard.users.role_guest'
    default:
      return 'dashboard.users.role_unknown'
  }
}

const UserRole = memo(
  ({ role }: { role: string }) => {
    return (
      <div className="flex items-center gap-2">
        <div
          className={cn('rounded-full px-2', {
            'bg-blue-300': role === 'admin',
            'bg-green-200': role === 'user',
            'bg-red-500': role === 'guest',
          })}
        >
          <span className="text-gray-700">{roleToLocale(role)}</span>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.role === nextProps.role
  },
)

export default UserRole
