import { memo } from 'react'

const FloatButton = memo(
  ({
    children,
    onClick,
  }: {
    children: React.ReactNode
    onClick?: () => void
  }) => {
    return (
      <div
        onClick={onClick}
        className="absolute right-10 bottom-10 z-10 flex items-center gap-2 p-4  rounded-full bg-primary text-white cursor-pointer active:scale-85"
      >
        {children}
      </div>
    )
  },
)

export default FloatButton
