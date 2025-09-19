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
        className="sticky ml-auto w-12 h-12 mt-auto z-10 flex items-center gap-2 justify-center  rounded-full bg-primary text-white cursor-pointer active:scale-85"
      >
        {children}
      </div>
    )
  },
)

export default FloatButton
