import useCustomRouter from '@/hooks/useCustomRouter'
import { getMe } from '@/services/auth/auth.service'
import { useQuery } from '@tanstack/react-query'
import { createContext, useCallback, useState, useEffect } from 'react'

interface AuthContextType {
  authUser: User | null
  login: (data: { user: User; token: string }) => void
  logout: () => void
}

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: Props) => {
  const [authUser, setAuthUser] = useState<User | null>(null)

  const { goTo } = useCustomRouter()
  const { data } = useQuery({
    queryFn: () => getMe(),
    queryKey: ['authUser'],
  })

  const login = useCallback((data: { user: User; token: string }) => {
    setAuthUser(data.user)
    localStorage.setItem('token', data.token)
    goTo('/chatapp')
  }, [])

  const logout = useCallback(() => {
    setAuthUser(null)
    localStorage.removeItem('token')
    goTo('/')
  }, [])

  useEffect(() => {
    if (data) {
      setAuthUser(data.user)
    }
  }, [data])

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
