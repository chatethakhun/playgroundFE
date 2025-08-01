import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import useChat from '@/hooks/useChat'
import {
  getMessageByUserId,
  sendMessage,
} from '@/services/messages/message.service'
import PageContainer from '@/components/ui/PageContainer'
import Avatar from '@/components/ui/Avatar'
import useAuth from '@/hooks/useAuth'
import { getUsers } from '@/services/users/users.service'
import MessageItem from '@/components/ui/MessageItem'
import LoadingFullPage from '@/components/ui/LoadingFullPage'

export const Route = createFileRoute('/_authenticated/chatapp/$userId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()
  const { socket } = useChat()
  const [input, setInput] = useState<string>('')
  const { authUser } = useAuth()
  const scrollRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()
  const { data: userData } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const { data: messagesData, isLoading } = useQuery({
    queryKey: ['messages', userId],
    queryFn: () => getMessageByUserId(userId),
    enabled: !!userId,
  })

  const sendMessageMutation = useMutation({
    mutationFn: (message: Message) => sendMessage(message, userId),
    onSuccess: (data: { message: Message }) => {
      handleNewMessage(data.message)
    },
  })

  const handleNewMessage = (newMessage: Message) => {
    queryClient.setQueryData(
      ['messages', userId],
      (oldData: Array<Message>) => {
        return [...oldData, newMessage]
      },
    )
  }

  const onSendMessage = useCallback(() => {
    if (!authUser || sendMessageMutation.isPending) return
    try {
      const message = {
        text: input,
      }
      sendMessageMutation.mutate(message)
      setInput('')
    } catch (error) {
      console.error(error)
    }
  }, [input, authUser])

  const onKeydownToSend = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (input.length === 0) return

      if (e.key === 'Enter') {
        onSendMessage()
      }
    },
    [input],
  )

  useEffect(() => {
    if (!socket) return

    socket.on('newMessage', (message: Message) => {
      handleNewMessage(message)
    })
  }, [socket])

  const reciever = userData?.users.find((user) => user._id === userId)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messagesData])

  const uniqeMessage = useMemo(() => {
    if (!messagesData) return []

    return messagesData.reduce((acc, message) => {
      if (!acc.find((m) => m._id === message._id)) {
        acc.push(message)
      }
      return acc
    }, [] as Array<Message>)
  }, [messagesData])

  if (isLoading) return <LoadingFullPage />
  return (
    <PageContainer>
      <div id="chatHeader" className="flex items-center-safe gap-2">
        <Avatar src={reciever?.avatar} />
        <h1 className="font-bold text-xl">{reciever?.fullName || 'User'}</h1>
      </div>
      <div
        id="chatMessages"
        className=" border border-border rounded-md h-[570px] overflow-y-auto  gap-4 px-2 py-4"
        ref={scrollRef}
      >
        {uniqeMessage.map((message) => (
          <MessageItem
            key={message._id}
            message={message}
            sender={authUser!}
            reciever={reciever}
          />
        ))}
      </div>
      <div id="chatInput" className="flex items-center-safe gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full focus:outline-none border py-2 px-4 rounded-md border-border"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeydownToSend}
        />
        <button
          className="bg-primary text-white px-4 py-2 rounded-full"
          onClick={onSendMessage}
        >
          Send
        </button>
      </div>
    </PageContainer>
  )
}
