import KitPartForm from '@/components/ui/Kits/KitPartForm'
import PageContainer from '@/components/ui/PageContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/$kitId/part/new',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { kitId } = Route.useParams()
  return (
    <PageContainer>
      <KitPartForm kitId={Number(kitId)} />
    </PageContainer>
  )
}
