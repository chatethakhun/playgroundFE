import { getColorsQuery } from '@/services/gunplaKits/color.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { memo } from 'react'
import ListItemContainer from '../ListItemContainer'
import MultipleColorBox from './MultipleColorBox'

const ColorItem = memo(
  ({ color }: { color: Color }) => {
    return (
      <ListItemContainer>
        <div className="flex gap-2 items-center">
          {!color.multiple && <ColorItem color={color} />}
          {color.multiple && <MultipleColorBox size={12} />}
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
    <>
      {data?.map((color) => (
        <ColorItem key={color._id} color={color} />
      ))}
    </>
  )
})

export default ListColors
