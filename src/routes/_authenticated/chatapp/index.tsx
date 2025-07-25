import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/chatapp/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/chatapp/"!</div>
}
