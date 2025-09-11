import {
  deleteWorkout,
  getListWorkout,
} from '@/services/workout/workout.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { memo, useCallback } from 'react'
import LoadingSpinner from '../LoadingSpinner'
import { Trash, Pencil } from 'lucide-react'
import { confirm } from '../ComfirmDialog'
import useCustomRouter from '@/hooks/useCustomRouter'

const WorkoutItem = memo(
  ({ workout, onRefetch }: { workout: Workout; onRefetch?: () => void }) => {
    const { goTo } = useCustomRouter()
    const { _id } = workout
    const deleteMutation = useMutation({
      mutationFn: (workoutId: number) => deleteWorkout(workoutId.toString()),
      onSuccess: () => {
        onRefetch?.()
      },
    })
    const onDeleteWorkout = useCallback(async () => {
      const isConfirmed = await confirm({
        message: 'Are you sure you want to delete this workout?',
      })

      if (!isConfirmed) return

      deleteMutation.mutate(_id)
    }, [_id])

    const goToEdit = useCallback(() => {
      goTo(`/fitnesstracker/workout/edit/${_id}`)
    }, [_id])

    return (
      <div className="flex items-center">
        <div className="flex flex-col gap-2 py-4">
          <div className="text-xl flex gap-3 items-center">
            {workout.name}
            <span className="text-gray-500 text-xs">
              {workout.workoutReps} Reps/ {workout.workoutSets} Sets
            </span>
          </div>
          {workout.description && (
            <div className="text-xs text-gray-300">{workout.description}</div>
          )}
        </div>
        <div className="ml-auto flex gap-2">
          <Trash className="w-4 h-4 text-red-400" onClick={onDeleteWorkout} />
          <Pencil className="w-4 h-4 text-primary" onClick={goToEdit} />
        </div>
      </div>
    )
  },
)

const ListWorkout = memo(() => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['workouts'],
    queryFn: () => getListWorkout(),
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
      {(data || []).map((workout) => (
        <WorkoutItem
          key={workout._id}
          workout={workout}
          onRefetch={() => refetch()}
        />
      ))}
    </div>
  )
})

export default ListWorkout
