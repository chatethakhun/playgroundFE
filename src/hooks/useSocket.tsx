import { useCallback, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import useAuth from '@/hooks/useAuth'

const useSocket = () => {
  const socketRef = useRef<Socket | undefined>(undefined)
  const { authUser } = useAuth()

  const userId = authUser?.id ?? ''
  const connectSocket = useCallback(() => {
    if (socketRef.current?.connected || !userId) return

    const newSocket = io(import.meta.env.VITE_API_URL, {
      query: {
        userId: userId,
      },
    })

    try {
      newSocket.connect()
    } catch (error) {
      console.error(error)
    }

    socketRef.current = newSocket
  }, [userId])

  useEffect(() => {
    connectSocket()
    return () => {
      if (!socketRef.current) return
      socketRef.current.disconnect()
    }
  }, [connectSocket])

  return socketRef.current
}

export default useSocket
export const useSocketEffect = (effect: () => void) => {
  const socket = useSocket()
  useEffect(() => {
    if (!socket) return
    effect()
  }, [socket])
}
