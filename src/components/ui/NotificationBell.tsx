import { FaRegBell } from 'react-icons/fa'
import { cn } from '@/utils/cn'
import useNotifications from '@/hooks/useNotifications'

const NotificationBell = () => {
  const { notifications } = useNotifications()

  console.log({ notifications })
  return (
    <div className="relative">
      <FaRegBell className={cn('text-2xl')} />
      {notifications.length > 0 && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
      )}
    </div>
  )
}

export default NotificationBell
