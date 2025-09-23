import { memo } from 'react'

const MultipleColorBox = memo(() => {
  return (
    <div className="w-2 h-8 rounded-sm border border-gray-100">
      <div className="w-full h-1/3 rounded-t-sm  bg-red-500" />
      <div className="  w-full h-1/3   bg-blue-500" />
      <div className=" w-full  h-1/3 rounded-b-sm   bg-green-500" />
    </div>
  )
})

export default MultipleColorBox
