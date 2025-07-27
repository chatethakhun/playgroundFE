import React, { useCallback, useEffect } from 'react'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import useAuth from '@/hooks/useAuth'

interface ChatContextType {
  socket: Socket | undefined
}

export const ChatContext = React.createContext<ChatContextType | undefined>(
  undefined,
)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = React.useState<Socket | undefined>(undefined)
  const { authUser } = useAuth()
  const value = React.useMemo(() => ({ socket }), [socket])

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

    newSocket.on('getOnlineUsers', (newUsers) => {
      console.log('getOnlineUsers', newUsers)
    })
  }, [authUser])

  useEffect(() => {
    connectSocket()
  }, [connectSocket])

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
