import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/dashboard/users/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/users/$userIs"!</div>
}
