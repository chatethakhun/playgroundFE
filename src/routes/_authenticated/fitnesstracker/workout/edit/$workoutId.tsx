import LoadingFullPage from '@/components/ui/LoadingFullPage'
import PageContainer from '@/components/ui/PageContainer'
import WorkoutForm from '@/components/ui/workout/WorkoutForm'
import { getSingleWorkout } from '@/services/workout/workout.service'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/fitnesstracker/workout/edit/$workoutId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { workoutId } = Route.useParams()
  const { data: workout, isLoading } = useQuery({
    queryKey: ['workouts', workoutId],
    queryFn: () => getSingleWorkout(workoutId),
  })

  if (isLoading) return <LoadingFullPage />
  return (
    <PageContainer>
      <WorkoutForm workout={workout} />
    </PageContainer>
  )
}
