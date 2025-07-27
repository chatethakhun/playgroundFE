import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/chatapp/$userId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()
  return <div>Hello "/_authenticated/chatapp/${userId}/"! </div>
}
