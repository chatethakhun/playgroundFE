import { useMutation, useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import ListItemContainer from '../ListItemContainer'

import { Plus, Pen, EyeIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

import FloatButton from '../FloatButton'

import useCustomRouter from '@/hooks/useCustomRouter'

import NoData from '../NoData'

import { Switch } from '../switch'

import kitPartService from '@/services/v2/kitPart.service'
import useModal from '@/hooks/useModal'
import CustomModal from '../Modal'
import KitPartRequirementForm from './KitPartForm'

const KitPartItem = memo(
  ({ part }: { part: KitPartV2 }) => {
    // const { isCollapsed, toggleCollapse } = useCollapse(false)
    const { goTo } = useCustomRouter()

    const { mutate: checkedPart } = useMutation({
      mutationFn: (isCut: boolean) =>
        kitPartService.updateIsCut(Number(part.id), isCut),
      onSuccess: (newData) => {
        if (!newData) return
      },
    })

    return (
      <ListItemContainer>
        <div className="flex flex-col justify-center flex-grow">
          <div className={cn('flex justify-between items-center ', {})}>
            <div className="flex gap-2 items-center">
              <Switch
                name={String(part.id)}
                checked={part.is_cut}
                onCheckedChange={(e) => {
                  const isChecked = Boolean(e)
                  checkedPart(isChecked)
                  part.is_cut = isChecked
                }}
              />

              <p
                className={cn('text-primary font text-md line-clamp-1', {
                  'line-through text-gray-300': part.is_cut,
                })}
              >
                {part.sub_assembly?.name}
              </p>
            </div>
            <div className="space-x-4">
              <button
                className="btn btn-ghost btn-xs"
                onClick={() =>
                  goTo(`/gunpla-kits/kits/${part.kit_id}/part/${part.id}`)
                }
              >
                <Pen className="w-5 h-5 text-gray-500" />
              </button>

              <button
                className="btn btn-ghost btn-xs"
                onClick={() =>
                  goTo(
                    `/gunpla-kits/kits/${part.kit_id}/part/${part.id}/requirements`,
                  )
                }
              >
                <EyeIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </ListItemContainer>
    )
  },
  (prev, next) => prev.part.id === next.part.id,
)

const KitPart = memo(({ kitId }: { kitId: string; subAssemblyId?: string }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { data, isLoading } = useQuery({
    queryKey: ['kit', kitId, 'parts'],
    queryFn: () => kitPartService.getAllKitParts(kitId),
    enabled: !!kitId,
  })

  // const { goTo } = useCustomRouter()
  if (isLoading) return null

  return (
    <>
      {data?.length === 0 && <NoData />}
      {data?.map((part, index) => (
        <KitPartItem key={index} part={part} />
      ))}
      <br />
      <br />
      <FloatButton onClick={() => openModal()}>
        <Plus className="w-5 h-5" />
      </FloatButton>
      <CustomModal modalIsOpen={isOpen} onClose={closeModal}>
        <KitPartRequirementForm kitId={Number(kitId)} />
      </CustomModal>
    </>
  )
})

export default KitPart
