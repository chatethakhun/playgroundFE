import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import PageContainer from '@/components/ui/PageContainer'
import useCustomRouter from '@/hooks/useCustomRouter'
import { useElapsedDuration } from '@/hooks/useElapsedDuration'
import {
  getWorkoutSession,
  endSession,
} from '@/services/workoutSession/workoutSession.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { memo, useCallback } from 'react'

export const Route = createFileRoute(
  '/_authenticated/fitnesstracker/$sessionId/',
)({
  component: RouteComponent,
})

const Timer = memo(
  ({ startedAt }: { startedAt: string }) => {
    const timer = useElapsedDuration(startedAt)
    return (
      <h1 className="text-7xl font-bold text-pretty text-primary">{timer}</h1>
    )
  },
  (prev, next) => prev.startedAt === next.startedAt,
)

function RouteComponent() {
  const { sessionId } = Route.useParams()
  const { goTo } = useCustomRouter()
  const { data, isLoading } = useQuery({
    queryKey: ['WorkoutSession'],
    queryFn: () => getWorkoutSession(sessionId),
  })

  const endSessionMutation = useMutation({
    mutationFn: () => endSession(sessionId),
    onSuccess: () => {
      goTo('/fitnesstracker/history')
    },
  })

  const handleEnd = useCallback(() => {
    endSessionMutation.mutate()
  }, [])

  const isEnded = !!data?.endedAt

  if (isLoading) return <LoadingSpinner />

  return (
    <PageContainer>
      <div className="text-center flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold text-pretty text-primary">
            Workout: {data?.title}
          </h1>
          <p>{data?.focus}</p>
        </div>

        {!isEnded ? (
          <div>
            <p className="font-bold">Duration</p>
            <Timer startedAt={data?.startedAt || ''} />
          </div>
        ) : (
          <p className="text-primary font-bold">Session ended</p>
        )}
      </div>

      {!isEnded && (
        <div className="mt-auto text-center">
          <Button isBlock onClick={handleEnd}>
            End
          </Button>
        </div>
      )}
    </PageContainer>
  )
}
