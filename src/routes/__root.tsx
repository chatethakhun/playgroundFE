import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Navbar from '@/components/ui/Navbar'
import { AuthProvider } from '@/providers/AuthContext'
import { NotificationProvider } from '@/providers/NotificationProvider'
// Create a client
const queryClient = new QueryClient()
export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProvider>
            <Outlet />
            <Navbar />
          </NotificationProvider>
        </AuthProvider>
      </QueryClientProvider>

      <TanStackRouterDevtools />
    </>
  ),
})
