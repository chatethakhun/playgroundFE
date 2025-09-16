import { cn } from '@/utils/cn'
import { lazy, memo } from 'react'

const LanguageSwitcher = lazy(() => import('@/components/ui/LanguageSwitcher'))

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean
  children: React.ReactNode
}
const PageContainer = memo(({ children, noPadding }: PageContainerProps) => {
  return (
    <>
      <div
        className={cn(
          'flex flex-col w-full h-[100dvh] overflow-auto relative',
          {
            'p-3': !noPadding,
          },
        )}
      >
        <div className="flex-1 flex flex-col gap-4">
          <LanguageSwitcher />
          {children}
        </div>
      </div>
    </>
  )
})

export default PageContainer
