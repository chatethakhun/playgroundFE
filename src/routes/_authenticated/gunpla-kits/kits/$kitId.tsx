import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/gunpla-kits/kits/$kitId')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/_authenticated/gunpla-kits/kits/$kitId"!</div>
}
