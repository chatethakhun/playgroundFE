import KitPartForm from '@/components/ui/Kits/KitPartForm'
import LoadingFullPage from '@/components/ui/LoadingFullPage'
import PageContainer from '@/components/ui/PageContainer'
import { getKitPart } from '@/services/gunplaKits/kit.service'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/$kitId/part/$partId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { kitId, partId } = Route.useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['kit', kitId, 'parts', partId],
    queryFn: () => getKitPart(partId),
    enabled: !!partId,
  })

  if (isLoading) return <LoadingFullPage />
  return (
    <PageContainer>
      <KitPartForm kitId={kitId} part={data} />
    </PageContainer>
  )
}
