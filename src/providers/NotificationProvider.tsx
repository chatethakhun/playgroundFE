import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useEffect } from 'react'
import { getNotifications } from '@/services/notification/notification.service'

import useSocket from '@/hooks/useSocket'

interface NotificationContext {
  notifications: Array<AppNotification>
}
const NotificationContext = createContext<NotificationContext | undefined>(
  undefined,
)

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  })

  const socket = useSocket()
  const queryClient = useQueryClient()

  const handleNewNotification = (notification: AppNotification) => {
    queryClient.setQueryData(
      ['notifications'],
      (oldData: Array<AppNotification>) => {
        return [...oldData, notification]
      },
    )
  }
  useEffect(() => {
    if (!socket) return

    console.log('socket', socket)
    socket.on('newNotification', (notification: AppNotification) => {
      console.log('notification', notification)
      handleNewNotification(notification)
    })
  }, [socket])

  return (
    <NotificationContext.Provider
      value={{ notifications: notifications || [] }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export { NotificationContext, NotificationProvider }
