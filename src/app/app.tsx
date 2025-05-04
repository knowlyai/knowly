import { AppProviders } from '@/providers/app-providers'
import { AppRoutes } from '@/routes/app-routes'

export function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}
