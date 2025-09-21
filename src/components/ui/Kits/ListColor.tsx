import { getColorsQuery } from '@/services/gunplaKits/color.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { memo } from 'react'
import ListItemContainer from '../ListItemContainer'

const ColorItem = memo(
  ({ color }: { color: Color }) => {
    return (
      <ListItemContainer>
        <div className="flex gap-2 items-center">
          <span
            className="text-gray-500 text-sm w-4 h-4 border rounded-sm"
            style={{ backgroundColor: color.hex }}
          ></span>
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
