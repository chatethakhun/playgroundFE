import { cn } from '@/utils/cn'

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean
  children: React.ReactNode
}
const PageContainer = ({ children, noPadding }: PageContainerProps) => {
  return (
    <>
      <div
        className={cn('flex flex-col w-full h-[740px] overflow-auto ', {
          'p-3': !noPadding,
        })}
      >
        <div className="flex-1 flex flex-col gap-4">{children}</div>
      </div>
    </>
  )
}

export default PageContainer
