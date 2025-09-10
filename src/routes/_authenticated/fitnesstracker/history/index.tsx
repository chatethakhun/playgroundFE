import PageContainer from '@/components/ui/PageContainer'
import ListSession from '@/components/ui/workoutSession/ListSession'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/fitnesstracker/history/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return (
    <PageContainer>
      <ListSession />
    </PageContainer>
  )
}
