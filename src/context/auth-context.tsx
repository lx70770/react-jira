import React, { ReactNode, useContext, useState } from 'react'
import * as auth from 'auth-provider'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { User } from 'types/user'
import { useAsync } from 'hooks/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'

interface AuthForm {
  username: string
  password: string
}

interface AuthContextProps {
  user: User | null
  login: (form: AuthForm) => Promise<void>
  register: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined)

// dev-tool中有用
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, data: user, error, isLoading, isError, isIdle, isSuccess, setData: setUser } = useAsync<User>()

  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return <AuthContext.Provider value={{ user, login, register, logout }} children={children} />
}

export const useAuth = () => {
  const contetx = useContext(AuthContext)
  if (!contetx) throw new Error('useAuth必须在AuthProvider中使用')
  return contetx
}
