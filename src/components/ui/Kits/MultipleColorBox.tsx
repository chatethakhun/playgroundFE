import { memo } from 'react'

const MultipleColorBox = memo(({ size }: { size: number }) => {
  const widthEachColor = size / 3
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full relative flex"
    >
      <div className="h-full  bg-red-500" style={{ width: widthEachColor }} />
      <div
        className="  h-full  bg-blue-500"
        style={{ width: widthEachColor }}
      />
      <div
        className="  h-full  bg-green-500"
        style={{ width: widthEachColor }}
      />
    </div>
  )
})

export default MultipleColorBox
