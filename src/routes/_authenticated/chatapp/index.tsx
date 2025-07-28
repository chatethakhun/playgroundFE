import { createFileRoute } from '@tanstack/react-router'
import { IoSearch } from 'react-icons/io5'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import useChat from '@/hooks/useChat'
import PageContainer from '@/components/ui/PageContainer'
import useAuth from '@/hooks/useAuth'
import Avatar from '@/components/ui/Avatar'
import Container from '@/components/ui/Container'
import ChatItem from '@/components/ui/ChatItem'

import NotificationBell from '@/components/ui/NotificationBell'

export const Route = createFileRoute('/_authenticated/chatapp/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { users, unseenMessage, socket } = useChat()
  const { authUser } = useAuth()
  const queryClient = useQueryClient()

  const handleNewMessageForUpdateChatList = (newData: {
    users: Array<User>
    unseenMessages: any
  }) => {
    queryClient.setQueryData(['users'], () => {
      return newData
    })
  }

  useEffect(() => {
    if (!socket) return
    socket.on(
      'chatListUpdate',
      (newData: { users: Array<User>; unseenMessages: any }) => {
        handleNewMessageForUpdateChatList(newData)
      },
    )
  }, [socket])

  return (
    <PageContainer>
      <div className="flex justify-between items-center">
        <IoSearch className="text-2xl" />
        <h1 className="font-bold text-xl">Messages</h1>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <Avatar src={authUser?.avatar} alt={authUser?.fullName} size={40} />
        </div>
      </div>

      <Container>
        {users.length === 0 && (
          <p className="text-center text-xl">No messages</p>
        )}
        {users.map((user) => (
          <ChatItem
            key={user._id}
            chat={user}
            unseenMessages={
              unseenMessage ? unseenMessage[user._id]?.unreadMessages || 0 : 0
            }
            lastMessage={
              unseenMessage ? unseenMessage[user._id]?.lastMessage : undefined
            }
          />
        ))}
      </Container>
    </PageContainer>
  )
}
