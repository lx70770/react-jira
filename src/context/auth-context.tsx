import React, { ReactNode, useContext, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'

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

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined)

// dev-tool中有用
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)

	// point free
	const login = (form: AuthForm) => auth.login(form).then(setUser)
	const register = (form: AuthForm) => auth.register(form).then(setUser)
	const logout = () => auth.logout().then(() => setUser(null))

	return <AuthContext.Provider value={{ user, login, register, logout }} children={children} />
}

export const useAuth = () => {
	const contetx = useContext(AuthContext)
	if (!contetx) throw new Error('useAuth必须在AuthProvider中使用')
	return contetx
}
