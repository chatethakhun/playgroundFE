import {
  deleteColor,
  getColorsQuery,
} from '@/services/gunplaKits/color.service'
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

const Color = memo(
  ({ color, onRemove }: { color: Color; onRemove: () => void }) => {
    const { goTo } = useCustomRouter()
    const { t } = useTranslation('color')
    return (
      <ListItemContainer>
        <div className="flex gap-2 items-center">
          {!color.multiple && <RunnerColor color={color.hex} />}
          {color.multiple && <MultipleColorBox />}
          {color.name}{' '}
          {color.clearColor ? `(${t('color:color.clear-color')})` : ''}
        </div>
        <div className="flex ml-auto gap-2">
          <Pencil
            className="text-gray-400 ml-auto"
            onClick={() => goTo(`/gunpla-kits/kits/colors/${color._id}`)}
          />
          <Trash className="text-red-400 ml-auto" onClick={onRemove} />
        </div>
      </ListItemContainer>
    )
  },
  (prev, next) => prev.color._id === next.color._id,
)
const ListColors = memo(() => {
  const { data } = useSuspenseQuery(getColorsQuery())
  const { t } = useTranslation('common')

  const queryClient = useQueryClient()

  const { mutate: removeColor } = useMutation({
    mutationFn: (id: string) => deleteColor(id),
    onSuccess: (id: string) => {
      queryClient.setQueryData<Array<Color>>(['colors'], (oldData) => {
        return oldData?.filter((c) => c._id !== id)
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
  return (
    <div>
      {data?.map((color) => (
        <Color
          key={color._id}
          color={color}
          onRemove={() => onRemoveColor(color._id)}
        />
      ))}
    </div>
  )
})

export default ListColors
