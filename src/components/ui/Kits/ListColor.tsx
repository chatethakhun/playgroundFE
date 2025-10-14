import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { memo, useCallback } from 'react'
import ListItemContainer from '../ListItemContainer'
import MultipleColorBox from './MultipleColorBox'
import RunnerColor from './RunnderColor'
import { Trash, Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { confirm } from '../ComfirmDialog'
import useCustomRouter from '@/hooks/useCustomRouter'
import NoData from '../NoData'
import colorSevice from '@/services/v2/color.service'
import LoadingFullPage from '../LoadingFullPage'

const Color = memo(
  ({ color, onRemove }: { color: ColorV2; onRemove: () => void }) => {
    const { goTo } = useCustomRouter()
    const { t } = useTranslation('color')
    return (
      <ListItemContainer>
        <div className="flex gap-2 items-center">
          {!color.is_multiple && <RunnerColor color={color.hex} />}
          {color.is_multiple && <MultipleColorBox />}
          {color.name}{' '}
          {color.is_clear ? `(${t('color:color.clear-color')})` : ''}
        </div>
        <div className="flex ml-auto gap-2">
          <Pencil
            className="text-gray-400 ml-auto"
            onClick={() => goTo(`/gunpla-kits/kits/colors/${color.id}`)}
          />
          <Trash className="text-red-400 ml-auto" onClick={onRemove} />
        </div>
      </ListItemContainer>
    )
  },
  (prev, next) => prev.color.id === next.color.id,
)
const ListColors = memo(() => {
  const { data, isLoading } = useSuspenseQuery(colorSevice.getAllColorQuery())
  const { t } = useTranslation('common')

  const queryClient = useQueryClient()

  const { mutate: removeColor } = useMutation({
    mutationFn: (id: string) => colorSevice.deleteColor(id),
    onSuccess: (id: string | null) => {
      if (!id) return
      queryClient.setQueryData<Array<ColorV2>>(['colors'], (oldData) => {
        return oldData?.filter((c) => c.id !== id)
      })
    },
  })
  const onRemoveColor = useCallback(async (id: string) => {
    const isConfirmed = await confirm({
      message: t('common:remove-confirm'),
    })

    if (!isConfirmed) return

    removeColor(id)
  }, [])

  if (isLoading) return <LoadingFullPage />
  return (
    <div>
      {(data ?? []).length === 0 && <NoData />}
      {data?.map((color) => (
        <Color
          key={color.id}
          color={color}
          onRemove={() => onRemoveColor(color.id)}
        />
      ))}
    </div>
  )
})

export default ListColors
