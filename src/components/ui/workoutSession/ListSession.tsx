import { getListWorkoutSession } from '@/services/workoutSession/workoutSession.service'
import { useQuery } from '@tanstack/react-query'
import { memo, useCallback, useState } from 'react'
import MenuTab from '../MenuTab'
import { formatTimestamp } from '@/utils/date'
import useCustomRouter from '@/hooks/useCustomRouter'
import LoadingSpinner from '../LoadingSpinner'

const TABS = ['Working', 'Completed']

const SessionItem = memo(
  function SessionItem({
    session,
    onClick,
  }: {
    session: WorkoutSession
    onClick?: () => void
  }) {
    return (
      <li className="pb-3 sm:pb-4 cursor-pointer pt-4" onClick={onClick}>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-1 min-w-0">
            <p className="text-xl font-bold text-primary  truncate ">
              {session.title}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {session.focus}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-bold text-primary ">
            Started at {formatTimestamp(session.startedAt)}
          </div>
        </div>
      </li>
    )
  },
  (prev, next) => prev.session._id === next.session._id,
)

const ListSession = memo(function ListSession() {
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const { goTo } = useCustomRouter()
  const { data, isLoading } = useQuery({
    queryKey: ['WorkoutSession', isCompleted],
    queryFn: () => getListWorkoutSession({ isCompleted }),
  })

  const goToSession = useCallback((id: string) => {
    goTo(`/fitnesstracker/${id}`)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <MenuTab
        tabs={TABS}
        currentIndex={isCompleted ? 1 : 0}
        onChange={(index: number) => {
          console.log({ index })
          setIsCompleted(index === 1)
        }}
      />

      {isLoading && <LoadingSpinner />}

      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {data?.length === 0 && (
          <p className="text-center text-sm text-gray-500">No data</p>
        )}
        {data?.map((session: WorkoutSession) => (
          <SessionItem
            key={session._id}
            session={session}
            onClick={() => goToSession(session._id)}
          />
        ))}
      </ul>
    </div>
  )
})

export default ListSession
