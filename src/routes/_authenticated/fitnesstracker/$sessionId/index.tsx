import { getWorkoutSession } from '@/services/workoutSession/workoutSession.service'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/fitnesstracker/$sessionId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { sessionId } = Route.useParams()
  const { data } = useQuery({
    queryKey: ['WorkoutSession'],
    queryFn: () => getWorkoutSession(sessionId),
  })

  return <div>Hello "/_authenticated/fitnesstracker/$sessionId/"!</div>
}
