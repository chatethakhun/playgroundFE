import { memo } from 'react'
import LoadingFullPage from '../LoadingFullPage'
import { getKitRunners } from '@/services/gunplaKits/kit.service'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import FloatButton from '../FloatButton'

const RunnerItem = memo(
  ({ runner }: { runner: Runner }) => {
    return (
      <div className="flex gap-2 items-center">
        <span
          className="text-gray-500 text-sm w-4 h-4 border rounded-sm"
          style={{
            backgroundColor: runner.color.hex,
          }}
        ></span>
        {runner.code}
        <span className="text-gray-500 text-sm">
          QTY: <span className="font-bold text-primary">{runner.qty}</span>
        </span>
      </div>
    )
  },
  (prev, next) => prev.runner._id === next.runner._id,
)

const Runners = memo(({ kitId }: { kitId: string }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getKitRunners(kitId),
    queryKey: ['kits', kitId, 'runners'],
    enabled: !!kitId,
  })

  if (isLoading) return <LoadingFullPage />
  return (
    <>
      {data?.map((runner) => (
        <RunnerItem key={runner._id} runner={runner} />
      ))}
      <FloatButton>
        <Plus className="w-6 h-6" strokeWidth={2} />
      </FloatButton>
    </>
  )
})

export default Runners
