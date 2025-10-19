import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { memo } from 'react'
import LoadingFullPage from '../LoadingFullPage'
import ListItemContainer from '../ListItemContainer'
import useCustomRouter from '@/hooks/useCustomRouter'
import Button from '../Button'
import { useTranslation } from 'react-i18next'

import NoData from '../NoData'
import kitService from '@/services/v2/kit.service'
import { TrashIcon } from 'lucide-react'
import { queryClient } from '@/utils/queryClient'
import { toast } from 'react-toastify'
import { confirm } from '../ComfirmDialog'

const KitItem = memo(
  ({
    kitName,
    grade,
    kitId,
    status,
  }: {
    kitName: string
    grade: string
    kitId: number
    isCompleted?: boolean
    status: KitStatus
  }) => {
    const { goTo } = useCustomRouter()
    const { t } = useTranslation(['kit', 'common'])

    const { mutate: deleteKit } = useMutation({
      mutationFn: kitService.deleteKit,
      onSuccess: () => {
        toast.success(t('common:success'))
        queryClient.setQueryData<Array<KitV2>>(['kits', status], (oldData) => {
          if (!oldData) return oldData
          return oldData.filter((kit) => kit.id !== kitId)
        })
      },
    })

    return (
      <ListItemContainer>
        <div>
          <h6 className="text-primary font-bold">{kitName}</h6>
          <span className="text-gray-500 text-sm">
            {t('list.size-kit')}: {grade.toUpperCase()}
          </span>
        </div>
        <div className="ml-auto flex gap-5 items-center">
          <TrashIcon
            onClick={async () => {
              const isConfirmed = await confirm({
                message: t('common:remove-confirm'),
              })

              if (isConfirmed) {
                deleteKit(kitId)
              }
            }}
            className="text-red-500"
          />
          <Button onClick={() => goTo('/gunpla-kits/kits/' + kitId)}>
            {t('list.view-kit')}
          </Button>
        </div>
      </ListItemContainer>
    )
  },
  (prev, next) =>
    prev.kitName === next.kitName &&
    prev.grade === next.grade &&
    prev.isCompleted === next.isCompleted,
)

const ListKits = memo(({ status }: { status: KitStatus }) => {
  const { data, isLoading } = useSuspenseQuery(
    kitService.getAllKitQuery(status ?? 'in_progress'),
  )

  if (isLoading) return <LoadingFullPage />

  return (
    <div className="flex flex-col gap-4 divide-gray-500">
      {(data ?? []).length === 0 && <NoData />}
      {data?.map((kit) => (
        <KitItem
          key={kit.id}
          kitId={kit.id}
          kitName={kit.name}
          grade={kit.grade}
          isCompleted={kit.is_finished}
          status={kit.status}
        />
      ))}
    </div>
  )
})

export default ListKits
