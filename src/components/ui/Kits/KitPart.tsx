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
import NoData from '../NoData'

const RequireItem = memo(
  ({
    req,
    onChecked,
  }: {
    req: KitRequirement
    onChecked?: (checked: boolean) => void
  }) => {
    const runnerColor =
      typeof req.runner?.color !== 'string'
        ? (req.runner?.color.hex as string)
        : ''

    const runnerName = req.runner?.code ?? ''

    const runnerQty = typeof req.runner !== 'number' ? req.runner?.qty : 1

    const isCut = req.isCut
    return (
      <div
        className={cn(
          'flex gap-2 items-center border-b-gray-500 border-b p-2 w-full',
          {
            'opacity-30': isCut,
          },
        )}
      >
        <div className="flex flex-col w-full">
          <div className="flex gap-2 items-center border-b border-gray-200 py-2">
            <div
              style={{
                backgroundColor: runnerColor,
              }}
              className="w-2 h-8 rounded-sm border border-gray-100"
            ></div>
            <p>
              <span className="font-bold text-primary">{runnerName}</span> x{' '}
              {runnerQty}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p>{req.gate}</p>
          </div>
        </div>
        <Checkbox
          name={req.gate}
          checked={isCut}
          onCheckedChange={(e) => {
            const isChecked = Boolean(e)
            onChecked?.(isChecked)
            req.isCut = isChecked
          }}
        />
        {/*<p className="font-bold flex flex-col">
          <span className="text-xs font-light">Runner:</span>{' '}
          {req.runner?.code ?? ''} {` x ${req.runner?.qty ?? ''} `}
          <span className="text-xs font-light">| Number: </span> {req.gate}
        </p>*/}
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
                <Pen className="w-3 h-3 text-gray-500" />
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
      {data?.length === 0 && <NoData />}
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
