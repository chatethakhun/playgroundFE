import { createFileRoute } from '@tanstack/react-router'
import loginBg from '../assets/images/loginBG.png'
import Button from '@/components/ui/Button'
import useCustomRouter from '@/hooks/useCustomRouter'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { goTo } = useCustomRouter()
  return (
    <div
      className="h-full p-3 pb-30"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="flex flex-col items-center justify-end h-full gap-2 ">
        <Button isBlock onClick={() => goTo('/login')}>
          Login
        </Button>
        <Button isBlock secondary>
          Register
        </Button>
      </div>
    </div>
  )
}
