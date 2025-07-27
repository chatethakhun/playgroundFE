import React, { useCallback, useEffect, useRef } from 'react'
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
  const { authUser } = useAuth()
  const socketRef = useRef<Socket | undefined>(undefined)
  const [onlineUserIds, setOnlineUserIds] = React.useState<Array<string>>([])

  const { data: usersData } = useQuery({
    queryFn: getUsers,
    queryKey: ['users'],
  })

  const connectSocket = useCallback(() => {
    if (socketRef.current?.connected || !authUser?._id) return

    const newSocket = io(import.meta.env.VITE_API_URL, {
      query: {
        userId: authUser._id,
      },
    })

    newSocket.connect()

    socketRef.current = newSocket

    newSocket.on('getOnlineUsers', (newUsers: Array<string>) => {
      setOnlineUserIds(newUsers)
    })
  }, [authUser])

  useEffect(() => {
    connectSocket()
    return () => {
      if (!socketRef.current) return

      socketRef.current.disconnect()
    }
  }, [connectSocket])

  return (
    <ChatContext.Provider
      value={{
        socket: socketRef.current,
        onlineUserIds,
        users: usersData?.users || [],
        unseenMessage: usersData?.unseenMessages || {},
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
