import { updateIsFinished } from '@/services/gunplaKits/kit.service'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { memo } from 'react'
import LoadingFullPage from '../LoadingFullPage'
import ListItemContainer from '../ListItemContainer'
import useCustomRouter from '@/hooks/useCustomRouter'
import Button from '../Button'
import { useTranslation } from 'react-i18next'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import NoData from '../NoData'
import kitService from '@/services/v2/kit.service'

const KitItem = memo(
  ({
    kitName,
    grade,
    kitId,
    isCompleted = false,
  }: {
    kitName: string
    grade: string
    kitId: string
    isCompleted?: boolean
  }) => {
    const { goTo } = useCustomRouter()
    const { t } = useTranslation('kit')
    const queryClient = useQueryClient()

    const { mutate: toggleIsFinished } = useMutation({
      mutationFn: () => updateIsFinished(kitId, !isCompleted),
      onSuccess: (updatedKit) => {
        queryClient.setQueryData<Array<Kit>>(
          ['kits', isCompleted],
          (oldData) => {
            if (!oldData) return oldData

            const newData = oldData.filter((kit) => kit._id !== updatedKit._id)
            return newData
          },
        )

        queryClient.setQueryData<Array<Kit>>(
          ['kits', !isCompleted],
          (oldData) => {
            if (!oldData) return oldData

            const newData = [...oldData, updatedKit]
            return newData
          },
        )
      },
    })
    return (
      <ListItemContainer>
        <div>
          <h6 className="text-primary font-bold">{kitName}</h6>
          <span className="text-gray-500 text-sm">
            {t('list.size-kit')}: {grade}
          </span>
        </div>
        <div className="ml-auto flex gap-5 items-center">
          {!isCompleted ? (
            <Check
              className={cn({
                'text-green-500 w-6 h-6 cursor-pointer': true,
              })}
              onClick={() => toggleIsFinished()}
            />
          ) : (
            <X
              className={cn({
                'text-red-500 w-6 h-6 cursor-pointer': true,
              })}
              onClick={() => toggleIsFinished()}
            />
          )}

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
    kitService.getAllKitQuery(status),
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
        />
      ))}
    </div>
  )
})

export default ListKits
