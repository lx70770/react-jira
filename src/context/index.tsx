import { ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from 'context/auth-context'
import { QueryClientProvider, QueryClient } from 'react-query'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}
