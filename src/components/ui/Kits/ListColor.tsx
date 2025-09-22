import { getColorsQuery } from '@/services/gunplaKits/color.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { memo } from 'react'
import ListItemContainer from '../ListItemContainer'
import MultipleColorBox from './MultipleColorBox'
import RunnerColor from './RunnderColor'

const Color = memo(
  ({ color }: { color: Color }) => {
    return (
      <ListItemContainer>
        <div className="flex gap-2 items-center">
          {!color.multiple && <RunnerColor color={color.hex} />}
          {color.multiple && <MultipleColorBox />}
          {color.name}
        </div>
      </ListItemContainer>
    )
  },
  (prev, next) => prev.color._id === next.color._id,
)
const ListColors = memo(() => {
  const { data } = useSuspenseQuery(getColorsQuery())
  return (
    <div>
      {data?.map((color) => (
        <Color key={color._id} color={color} />
      ))}
    </div>
  )
})

export default ListColors
