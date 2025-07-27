import { createFileRoute } from '@tanstack/react-router'
import { IoSearch } from 'react-icons/io5'

import useChat from '@/hooks/useChat'
import PageContainer from '@/components/ui/PageContainer'
import useAuth from '@/hooks/useAuth'
import Avatar from '@/components/ui/Avatar'
import Container from '@/components/ui/Container'
import ChatItem from '@/components/ui/ChatItem'

export const Route = createFileRoute('/_authenticated/chatapp/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { users, unseenMessage } = useChat()
  const { authUser } = useAuth()
  return (
    <PageContainer>
      <div className="flex justify-between items-center">
        <IoSearch className="text-2xl" />
        <h1 className="font-bold text-xl">Messages</h1>
        <Avatar src={authUser?.avatar} alt={authUser?.fullName} size={40} />
      </div>

      <Container>
        {users.length === 0 && (
          <p className="text-center text-xl">No messages</p>
        )}
        {users.map((user) => (
          <ChatItem chat={user} unseenMessages={unseenMessage[user._id] || 0} />
        ))}
      </Container>
    </PageContainer>
  )
}
