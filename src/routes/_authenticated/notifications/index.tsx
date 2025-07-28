import PageContainer from '@/components/ui/PageContainer'
import useNotifications from '@/hooks/useNotifications'
import { cn } from '@/utils/cn'
import { createFileRoute } from '@tanstack/react-router'
import { FaRegBell } from 'react-icons/fa'

export const Route = createFileRoute('/_authenticated/notifications/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { notifications, markReadNotification } = useNotifications()
  return (
    <PageContainer>
      <h2 className="text-3xl font-bold">Notifications</h2>
      <ul className="overflow-auto h-570px">
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className="py-2 border-b border-border flex items-center gap-2"
            onClick={() => markReadNotification(notification._id)}
          >
            <FaRegBell className={cn('text-2xl text-primary')} />
            {notification.message}
            {!notification.read && (
              <div className="w-2 h-2 rounded-full bg-primary ml-auto" />
            )}
          </li>
        ))}
      </ul>
    </PageContainer>
  )
}
