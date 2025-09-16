import {
  getKitParts,
  updateCutInRequires,
  updateKitPart,
} from '@/services/gunplaKits/kit.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import ListItemContainer from '../ListItemContainer'
import useCollapse from '@/hooks/useCollapse'
import { ChevronDown, ChevronUp, Plus, Pen } from 'lucide-react'
import { cn } from '@/utils/cn'
import LoadingSpinner from '../LoadingSpinner'
import FloatButton from '../FloatButton'

import useCustomRouter from '@/hooks/useCustomRouter'
import { Checkbox } from '../checkbox'

const RequireItem = memo(
  ({
    req,
    onChecked,
  }: {
    req: KitRequirement
    onChecked?: (checked: boolean) => void
  }) => {
    return (
      <div
        className={cn('flex gap-2 items-center', { 'opacity-30': req.isCut })}
      >
        <Checkbox
          name={req.gate}
          checked={req.isCut}
          onCheckedChange={(e) => {
            const isChecked = Boolean(e)
            onChecked?.(isChecked)
            req.isCut = isChecked
          }}
        />
        <div
          style={{
            backgroundColor:
              (typeof req.runner?.color !== 'string'
                ? (req.runner?.color.hex as string)
                : '#fff') || '',
          }}
          className="w-4 h-4 rounded-sm border"
        ></div>
        <p>
          {typeof req.runner?.color !== 'string'
            ? (req.runner?.color.name as string)
            : ''}
        </p>{' '}
        |
        <p className="font-bold">
          <span className="text-xs font-light">Runner:</span>{' '}
          {req.runner?.code ?? ''} |{' '}
          <span className="text-xs font-light">Number: </span> {req.gate}
        </p>
      </div>
    )
  },
  (prev, next) =>
    prev.req.isCut === next.req.isCut && prev.onChecked === next.onChecked,
)

const KitPartItem = memo(
  ({ part }: { part: KitPart }) => {
    const { isCollapsed, toggleCollapse } = useCollapse(false)
    const { goTo } = useCustomRouter()

    const { mutate: checkedPart } = useMutation({
      mutationFn: (isCut: boolean) =>
        updateKitPart(
          {
            ...part,
            subassembly: part.subassembly._id,
            requires: part.requires.map((req) => {
              return {
                ...req,
                runner: req.runner._id,
              }
            }),
            isCut,
          },
          part._id,
        ),
    })

    const { mutate: cutRequire } = useMutation({
      onSuccess: () => {},
      mutationFn: ({
        isCut,
        requireIndex,
      }: {
        isCut: boolean
        requireIndex: number
      }) => updateCutInRequires(part._id, requireIndex, isCut),
    })
    return (
      <ListItemContainer>
        <div className="flex flex-col justify-center flex-grow">
          <div
            className={cn('flex justify-between items-center ', {
              'opacity-30': part.isCut,
            })}
          >
            <div className="flex gap-2 items-center">
              <Checkbox
                name={part._id}
                checked={part.isCut}
                onCheckedChange={(e) => {
                  const isChecked = Boolean(e)
                  checkedPart(isChecked)
                  part.isCut = isChecked
                }}
              />
              <h4 className="text-primary font-bold text-2xl">
                {part.subassembly.name}
              </h4>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-ghost btn-xs"
                onClick={() =>
                  goTo(`/gunpla-kits/kits/${part.kit}/part/${part._id}`)
                }
              >
                <Pen className="w-5 h-5 text-blue-500" />
              </button>
              {isCollapsed && part.requires.length > 0 && (
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => toggleCollapse()}
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              )}
              {!isCollapsed && part.requires.length > 0 && (
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => toggleCollapse()}
                >
                  <ChevronDown className="w-5 h-5" />
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
              return (
                <RequireItem
                  key={index}
                  req={req}
                  onChecked={(isChecked) =>
                    cutRequire({ isCut: isChecked, requireIndex: index })
                  }
                />
              )
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
