import { useNavigate } from '@tanstack/react-router'

const useCustomRouter = () => {
  const navigate = useNavigate()

  const goTo = (path: string) => {
    navigate({ to: path })
  }

  return {
    goTo,
  }
}

export default useCustomRouter
