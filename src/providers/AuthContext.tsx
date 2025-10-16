import { useQuery } from '@tanstack/react-query'
import { createContext, useCallback, useEffect, useState } from 'react'
import useCustomRouter from '@/hooks/useCustomRouter'
import authService from '@/services/v2/auth.service'

interface AuthContextType {
  authUser: UserV2 | null
  login: () => void
  logout: () => void
  isLoggedIn: boolean
}

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: Props) => {
  const [authUser, setAuthUser] = useState<UserV2 | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { goTo } = useCustomRouter()
  const { data } = useQuery({
    queryFn: authService.me,
    queryKey: ['me'],
  })

  const login = useCallback(() => {
    setIsLoggedIn(true)
    goTo('/apps')
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    localStorage.removeItem('v2Token')
    setAuthUser(null)
    window.location.href = '/login'
  }, [])

  useEffect(() => {
    if (data) {
      setAuthUser(data)
    }
  }, [data])

  return (
    <AuthContext.Provider value={{ authUser, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
