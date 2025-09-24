import useCustomRouter from '@/hooks/useCustomRouter'
import { cn } from '@/utils/cn'
import { lazy, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { LogOut } from 'lucide-react'
import useAuth from '@/hooks/useAuth'
const LanguageSwitcher = lazy(() => import('@/components/ui/LanguageSwitcher'))

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean
  children: React.ReactNode
}
const PageContainer = memo(({ children, noPadding }: PageContainerProps) => {
  const { currentPathName, goTo } = useCustomRouter()
  const { t } = useTranslation('common')
  const isIncludeKitsPath = currentPathName.includes('kits')

  const shouldShowHome = isIncludeKitsPath

  const { logout } = useAuth()

  const onClickToHome = useCallback(() => {
    if (isIncludeKitsPath) {
      goTo('/gunpla-kits/kits')
    }
  }, [isIncludeKitsPath])
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
          <div className="flex justify-between">
            {shouldShowHome && (
              <div
                className="cursor-pointer"
                onClick={() => {
                  onClickToHome()
                }}
              >
                <h1 className="font-extrabold text-3xl">{t('common:home')}</h1>
              </div>
            )}
            <div className="flex gap-4 items-center">
              <LanguageSwitcher />
              <LogOut className="cursor-pointer" onClick={() => logout()} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  )
})

export default PageContainer
