import { Outlet, createFileRoute } from '@tanstack/react-router'
import { ChatProvider } from '@/providers/ChatProvider'

export const Route = createFileRoute('/_authenticated/chatapp')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ChatProvider>
      <Outlet />
    </ChatProvider>
  )
}
