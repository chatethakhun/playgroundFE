import LoadingFullPage from '@/components/ui/LoadingFullPage'
import PageContainer from '@/components/ui/PageContainer'
import kitPartRequirementService from '@/services/v2/kitPartRequirement.service'
import { queryClient } from '@/utils/queryClient'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/$kitId/part/$partId/requirements',
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await queryClient.ensureQueryData(
      kitPartRequirementService.getAllKitPartRequirementsQuery(
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
    kitPartRequirementService.getAllKitPartRequirementsQuery(
      Number(partId),
      Number(kitId),
    ),
  )

  if (isLoading || !data) return <LoadingFullPage />
  return <PageContainer>{JSON.stringify(data)}</PageContainer>
}
