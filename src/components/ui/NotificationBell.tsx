import { cn } from '@/utils/cn'
import useNotifications from '@/hooks/useNotifications'
import { memo } from 'react'
import useCustomRouter from '@/hooks/useCustomRouter'
import { Bell as FaRegBell } from 'lucide-react'
const NotificationBell = () => {
  const { notifications } = useNotifications()
  const { goTo } = useCustomRouter()

  const allRead = notifications.every((notification) => notification.read)
  return (
    <div className="relative" onClick={() => goTo('/notifications')}>
      <FaRegBell className={cn('text-2xl')} />
      {!allRead && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
      )}
    </div>
  )
}

const MemoizedNotificationBell = memo(NotificationBell)

export default MemoizedNotificationBell
