import { getKitParts } from '@/services/gunplaKits/kit.service'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import ListItemContainer from '../ListItemContainer'
import useCollapse from '@/hooks/useCollapse'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/utils/cn'
import LoadingSpinner from '../LoadingSpinner'

const RequireItem = memo(({ req }: { req: KitRequirement }) => (
  <div>
    <p className="font-bold">
      <span className="text-xs font-light">Runner:</span>{' '}
      {req.runner?.code ?? ''} <span className="text-xs font-light">Qty: </span>
      {req.qty}
    </p>
  </div>
))

const KitPartItem = memo(
  ({ part }: { part: KitPart }) => {
    const { isCollapsed, toggleCollapse } = useCollapse(false)
    return (
      <ListItemContainer>
        <div className="flex flex-col justify-center flex-grow">
          <div className="flex justify-between items-center ">
            <h4>{part.name}</h4>
            <div className="flex gap-2">
              {isCollapsed && part.requires.length > 0 && (
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => toggleCollapse()}
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
              )}
              {!isCollapsed && part.requires.length > 0 && (
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => toggleCollapse()}
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <div
            className={cn('flex flex-col gap-2 mt-2', {
              hidden: !isCollapsed && part.requires.length > 0,
            })}
          >
            {part.requires.map((req, index) => {
              return <RequireItem key={index} req={req} />
            })}
          </div>
        </div>
      </ListItemContainer>
    )
  },
  (prev, next) => prev.part._id === next.part._id,
)

const KitPart = memo(({ kitId }: { kitId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['kit', kitId, 'parts'],
    queryFn: () => getKitParts(kitId),
    enabled: !!kitId,
  })
  if (isLoading) return <LoadingSpinner />
  return (
    <>
      {data?.map((part, index) => (
        <KitPartItem key={index} part={part} />
      ))}
    </>
  )
})

export default KitPart
