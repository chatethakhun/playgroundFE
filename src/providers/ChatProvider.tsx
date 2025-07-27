import React, { useCallback, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

import useAuth from '@/hooks/useAuth'
import { getUsers } from '@/services/users/users.service'

interface ChatContextType {
  socket: Socket | undefined
  onlineUserIds: Array<string>
  users: Array<User>
  unseenMessage: Record<string, number>
}

export const ChatContext = React.createContext<ChatContextType | undefined>(
  undefined,
)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = React.useState<Socket | undefined>(undefined)
  const { authUser } = useAuth()

  const [onlineUserIds, setOnlineUserIds] = React.useState<Array<string>>([])

  const { data: usersData } = useQuery({
    queryFn: getUsers,
    queryKey: ['users'],
  })

  const connectSocket = useCallback(() => {
    if (socket?.connected || !authUser?._id) return

    const newSocket = io(import.meta.env.VITE_API_URL, {
      query: {
        userId: authUser._id,
      },
    })

    newSocket.connect()
    console.log('socket', newSocket)
    setSocket(newSocket)

    newSocket.on('getOnlineUsers', (newUsers: Array<string>) => {
      setOnlineUserIds(newUsers)
    })
  }, [authUser])

  useEffect(() => {
    connectSocket()
  }, [connectSocket])

  return (
    <ChatContext.Provider
      value={{
        socket,
        onlineUserIds,
        users: usersData?.users || [],
        unseenMessage: usersData?.unseenMessages || {},
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
