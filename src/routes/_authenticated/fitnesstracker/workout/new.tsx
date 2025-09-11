import PageContainer from '@/components/ui/PageContainer'
import WorkoutForm from '@/components/ui/workout/WorkoutForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/fitnesstracker/workout/new',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageContainer>
      <WorkoutForm></WorkoutForm>
    </PageContainer>
  )
}
