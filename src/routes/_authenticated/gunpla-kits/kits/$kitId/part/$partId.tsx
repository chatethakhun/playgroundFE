// import KitPartForm from '@/components/ui/Kits/KitPartForm'
import LoadingFullPage from '@/components/ui/LoadingFullPage'
import PageContainer from '@/components/ui/PageContainer'

import kitPartService from '@/services/v2/kitPart.service'
import { queryClient } from '@/utils/queryClient'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/$kitId/part/$partId',
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await queryClient.ensureQueryData(
      kitPartService.getKitPartByIdQuery(
        Number(params.partId),
        Number(params.kitId),
      ),
    )
    return data
  },
})

function RouteComponent() {
  const { kitId, partId } = Route.useParams()

  const { data, isLoading } = useSuspenseQuery(
    kitPartService.getKitPartByIdQuery(Number(partId), Number(kitId)),
  )

  if (isLoading || !data) return <LoadingFullPage />
  return (
    <PageContainer>
      <div></div>
      {/*<KitPartForm kitId={kitId} part={data} />*/}
    </PageContainer>
  )
}
