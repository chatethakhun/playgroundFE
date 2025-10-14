import { useQuery } from '@tanstack/react-query'
import { createContext, useCallback, useEffect, useState } from 'react'
import useCustomRouter from '@/hooks/useCustomRouter'
import { getMe } from '@/services/auth/auth.service'

interface AuthContextType {
  authUser: User | null
  login: () => void
  logout: () => void
  isLoggedIn: boolean
}

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: Props) => {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { goTo } = useCustomRouter()
  const { data } = useQuery({
    queryFn: () => getMe(),
    queryKey: ['me'],
  })

  const login = useCallback(() => {
    setIsLoggedIn(true)
    goTo('/apps')
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    localStorage.removeItem('v2Token')
    goTo('/')
  }, [])

  useEffect(() => {
    if (data) {
      setAuthUser(data.user)
    }
  }, [data])

  return (
    <AuthContext.Provider value={{ authUser, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
