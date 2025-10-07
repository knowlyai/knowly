import { User } from '@/shared/domain/user'
import { useUserQuery } from '@/shared/hooks/use-user'
import { createContext, useState, useEffect, ReactNode } from 'react'

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  logout: () => void
  isPending?: boolean
  error?: unknown
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const { data: userData, isPending, error } = useUserQuery()

  const isAuthenticated = user !== null

  const logout = () => {
    setUser(null)
  }

  useEffect(() => {
    // Set user from query data
    if (userData) {
      setUser(userData)
    }
  }, [userData])

  const value: UserContextType = {
    user,
    setUser,
    isAuthenticated,
    logout,
    isPending,
    error
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
