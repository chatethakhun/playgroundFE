import { cn } from '@/lib/utils'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation('dashboard')
    return (
      <div className="flex items-center gap-2">
        <div
          className={cn('rounded-full px-4 py-1 leading-1', {
            'bg-blue-300': role === 'admin',
            'bg-green-200': role === 'user',
            'bg-red-500': role === 'guest',
          })}
        >
          <span className="text-gray-700 text-xs">{t(roleToLocale(role))}</span>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.role === nextProps.role
  },
)

export default UserRole
