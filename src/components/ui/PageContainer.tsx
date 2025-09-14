import { cn } from '@/utils/cn'
import { memo } from 'react'

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean
  children: React.ReactNode
}
const PageContainer = memo(({ children, noPadding }: PageContainerProps) => {
  return (
    <>
      <div
        className={cn('flex flex-col w-full h-[100dvh] overflow-auto ', {
          'p-3': !noPadding,
        })}
      >
        <div className="flex-1 flex flex-col gap-4">{children}</div>
      </div>
    </>
  )
})

export default PageContainer
