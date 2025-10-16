// import KitPartForm from '@/components/ui/Kits/KitPartForm'
import KitPartRequirementForm from '@/components/ui/Kits/RequirementForm'
import LoadingFullPage from '@/components/ui/LoadingFullPage'
import PageContainer from '@/components/ui/PageContainer'

import kitPartRequirement from '@/services/v2/kitPartRequirement'
import { queryClient } from '@/utils/queryClient'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/$kitId/part/$partId',
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await queryClient.ensureQueryData(
      kitPartRequirement.getAllKitPartRequirementsQuery(
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
    kitPartRequirement.getAllKitPartRequirementsQuery(
      Number(partId),
      Number(kitId),
    ),
  )

  if (isLoading || !data) return <LoadingFullPage />
  return (
    <PageContainer>
      <KitPartRequirementForm kitId={Number(kitId)} />
      {/*<KitPartForm kitId={kitId} part={data} />*/}
    </PageContainer>
  )
}
