import { getKitParts } from '@/services/gunplaKits/kit.service'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import ListItemContainer from '../ListItemContainer'
import useCollapse from '@/hooks/useCollapse'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { cn } from '@/utils/cn'
import LoadingSpinner from '../LoadingSpinner'
import FloatButton from '../FloatButton'

import useCustomRouter from '@/hooks/useCustomRouter'

const RequireItem = memo(({ req }: { req: KitRequirement }) => (
  <div>
    <p className="font-bold">
      <span className="text-xs font-light">Runner:</span>{' '}
      {req.runner?.code ?? ''}{' '}
      <span className="text-xs font-light">Number: </span>
      {req.gate}
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
            <h4 className="text-primary font-bold text-2xl">
              {part.subassembly.name}
            </h4>
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

const KitPart = memo(({ kitId }: { kitId: string; subAssemblyId?: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['kit', kitId, 'parts'],
    queryFn: () => getKitParts(kitId),
    enabled: !!kitId,
  })

  const { goTo } = useCustomRouter()
  if (isLoading) return <LoadingSpinner />
  return (
    <>
      {data?.map((part, index) => (
        <KitPartItem key={index} part={part} />
      ))}

      <FloatButton onClick={() => goTo(`/gunpla-kits/kits/${kitId}/part/new`)}>
        <Plus className="w-5 h-5" />
      </FloatButton>
    </>
  )
})

export default KitPart
