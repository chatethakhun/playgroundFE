import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useEffect } from 'react'
import {
  getNotifications,
  markReadNotification as markRead,
} from '@/services/notification/notification.service'

import useSocket from '@/hooks/useSocket'
import useCustomRouter from '@/hooks/useCustomRouter'

interface NotificationContext {
  notifications: Array<AppNotification>
  markReadNotification: (notificationId: string) => void
}
const NotificationContext = createContext<NotificationContext | undefined>(
  undefined,
)

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  })

  const markReadMutation = useMutation({
    mutationFn: markRead,
  })

  const socket = useSocket()
  const queryClient = useQueryClient()
  const { goTo } = useCustomRouter()

  const handleNewNotification = (notification: AppNotification) => {
    queryClient.setQueryData(
      ['notifications'],
      (oldData: Array<AppNotification>) => {
        return [...oldData, notification]
      },
    )
  }

  const markReadNotification = async (notificationId: string) => {
    markReadMutation.mutate(notificationId)
    queryClient.setQueryData(
      ['notifications'],
      (oldData: Array<AppNotification>) => {
        return oldData.map((notification) => {
          if (notification._id === notificationId) {
            return {
              ...notification,
              read: true,
            }
          }
          return notification
        })
      },
    )
    const notiication = notifications?.find(
      (notification) => notification._id === notificationId,
    )
    if (!notiication) return
    goTo(`/chatapp/${notiication.userId}`)
  }
  useEffect(() => {
    if (!socket) return


    socket.on('newNotification', (notification: AppNotification) => {
      handleNewNotification(notification)
    })
  }, [socket])

  return (
    <NotificationContext.Provider
      value={{ notifications: notifications || [], markReadNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export { NotificationContext, NotificationProvider }
