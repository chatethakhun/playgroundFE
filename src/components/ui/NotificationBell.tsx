import { FaRegBell } from 'react-icons/fa'
import { cn } from '@/utils/cn'
import useNotifications from '@/hooks/useNotifications'
import { memo } from 'react'

const NotificationBell = () => {
  const { notifications } = useNotifications()

  return (
    <div className="relative">
      <FaRegBell className={cn('text-2xl')} />
      {notifications.length > 0 && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
      )}
    </div>
  )
}

const MemoizedNotificationBell = memo(NotificationBell)

export default MemoizedNotificationBell
