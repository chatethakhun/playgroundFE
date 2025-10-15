import RunnerForm from '@/components/ui/Kits/RunnerForm'
import LoadingFullPage from '@/components/ui/LoadingFullPage'
import PageContainer from '@/components/ui/PageContainer'

import runnerService from '@/services/v2/runner.service'
import { queryClient } from '@/utils/queryClient'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/$kitId/runners/$runner',
)({
  component: RouteComponent,
  loader: async ({ params: { runner, kitId } }) => {
    const kits = await queryClient.ensureQueryData(
      runnerService.getRunnerByIdQuery(Number(kitId), Number(runner)),
    )
    return kits
  },
})

function RouteComponent() {
  const { kitId, runner: runnerId } = Route.useParams()

  const { data, isLoading } = useSuspenseQuery(
    runnerService.getRunnerByIdQuery(Number(kitId), Number(runnerId)),
  )

  if (isLoading || !data) return <LoadingFullPage />
  return (
    <PageContainer>
      <RunnerForm kitId={kitId} runner={data} />
    </PageContainer>
  )
}
