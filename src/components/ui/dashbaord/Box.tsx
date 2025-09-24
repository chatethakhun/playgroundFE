import { memo } from 'react'

const Box = memo(({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-2 p-4 shadow-md">{children}</div>
})

export default Box
