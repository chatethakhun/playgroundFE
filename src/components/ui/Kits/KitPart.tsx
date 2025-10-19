import { useMutation, useQuery } from '@tanstack/react-query'
import { memo } from 'react'

import {
  PlusIcon as Plus,
  PenIcon as Pen,
  EyeIcon,
  TrashIcon,
  CheckIcon,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import {
  Item,
  ItemActions,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'

import FloatButton from '../FloatButton'

import useCustomRouter from '@/hooks/useCustomRouter'

import NoData from '../NoData'

import kitPartService from '@/services/v2/kitPart.service'
import useModal from '@/hooks/useModal'
import CustomModal from '../Modal'
import KitPartRequirementForm from './KitPartForm'
import { confirm } from '../ComfirmDialog'
import { useTranslation } from 'react-i18next'
import { queryClient } from '@/utils/queryClient'
import { toast } from 'react-toastify'

const KitPartItem = memo(
  ({ part }: { part: KitPartV2 }) => {
    // const { isCollapsed, toggleCollapse } = useCollapse(false)
    const { goTo } = useCustomRouter()
    const { t } = useTranslation('common')

    const { mutate: checkedPart } = useMutation({
      mutationFn: (isCut: boolean) =>
        kitPartService.updateIsCut(Number(part.id), isCut),
      onSuccess: (newData) => {
        if (!newData) return

        toast.success(t('common:success'))
        queryClient.setQueryData<Array<KitPartV2>>(
          ['kits', Number(part.kit_id), 'kit_parts'],
          (oldParts) => {
            if (!oldParts) return

            return oldParts.map((oldPart) => {
              if (oldPart.id === newData.id) {
                return {
                  ...oldPart,
                  is_cut: newData.is_cut,
                }
              }
              return oldPart
            })
          },
        )
      },
    })

    const { mutate: deletePart } = useMutation({
      mutationFn: (id: number) => kitPartService.deleteKitPart(id),
      onSuccess: () => {
        toast.success(t('common:success'))
        queryClient.setQueryData<Array<KitPartV2>>(
          ['kits', Number(part.kit_id), 'kit_parts'],
          (oldParts) => {
            if (!oldParts) return

            return oldParts.filter((oldData) => oldData.id !== part.id)
          },
        )
      },
    })

    return (
      <>
        <Item
          className={cn('border rounded-2xl shadow-md')}
          isChecked={part.is_cut}
        >
          <ItemHeader>
            <div className="flex space-x-4">
              <ItemTitle className="text-2xl font-bold">
                {part.sub_assembly?.name}
              </ItemTitle>
            </div>
          </ItemHeader>
          <ItemMedia />

          <ItemActions className="ml-auto space-x-4">
            <Pen
              className=" text-gray-500"
              onClick={() =>
                goTo(`/gunpla-kits/kits/${part.kit_id}/part/${part.id}`)
              }
            />

            <EyeIcon
              className=" text-gray-500"
              onClick={() =>
                goTo(
                  `/gunpla-kits/kits/${part.kit_id}/part/${part.id}/requirements`,
                )
              }
            />
            <CheckIcon
              onClick={() => checkedPart(!part.is_cut)}
              className={`${!part.is_cut ? 'text-gray-300' : 'text-green-500'} h-6 w-6`}
            />
            <TrashIcon
              onClick={async () => {
                const isConfirmed = await confirm({
                  message: t('common:remove-confirm'),
                })

                if (isConfirmed) {
                  deletePart(part.id)
                }
              }}
              className="text-red-500 h-6 w-6"
            />
          </ItemActions>
        </Item>
        {/*<ListItemContainer>
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
        </ListItemContainer>*/}
      </>
    )
  },
  (prev, next) =>
    prev.part.id === next.part.id && prev.part.is_cut === next.part.is_cut,
)

const KitPart = memo(({ kitId }: { kitId: string; subAssemblyId?: string }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { data, isLoading } = useQuery({
    queryKey: ['kits', Number(kitId), 'kit_parts'],
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
