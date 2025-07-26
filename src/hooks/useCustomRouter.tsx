import { useNavigate, useRouterState } from '@tanstack/react-router'

const useCustomRouter = () => {
  const navigate = useNavigate()
  const routerState = useRouterState()
  const goTo = (path: string) => {
    navigate({ to: path })
  }

  return {
    goTo,
    currentPathName: routerState.location.pathname,
  }
}

export default useCustomRouter
