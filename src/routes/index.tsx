import { createFileRoute, redirect } from '@tanstack/react-router'
import loginBg from '../assets/images/loginBG.png'
import Button from '@/components/ui/Button'
import useCustomRouter from '@/hooks/useCustomRouter'
import { useTranslation } from 'react-i18next'
import isAuthenticate from '@/utils/isAuthenticate'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    if (isAuthenticate()) {
      throw redirect({
        to: '/apps',
      })
      // Perform any necessary async operations before loading the route
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { goTo } = useCustomRouter()
  const { t } = useTranslation(['register', 'login'])
  return (
    <div
      className="h-[100dvh] p-3 pb-30"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="flex flex-col items-center justify-end h-full gap-2 ">
        <Button isBlock onClick={() => goTo('/login')}>
          {t('login:title')}
        </Button>
        <Button isBlock secondary onClick={() => goTo('/signup')}>
          {t('register:title')}
        </Button>
      </div>
    </div>
  )
}
