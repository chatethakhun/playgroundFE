import RunnerForm from '@/components/ui/Kits/RunnerForm'
import LoadingFullPage from '@/components/ui/LoadingFullPage'
import PageContainer from '@/components/ui/PageContainer'
import { getKitRunner } from '@/services/gunplaKits/kit.service'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/$kitId/runners/$runner',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { kitId, runner: runnerId } = Route.useParams()

  const { data, isLoading } = useQuery({
    queryFn: () => getKitRunner(kitId, runnerId),
    queryKey: ['kits', kitId, 'runners', runnerId],
  })

  if (isLoading) return <LoadingFullPage />
  return (
    <PageContainer>
      <RunnerForm kitId={kitId} runner={data} />
    </PageContainer>
  )
}
