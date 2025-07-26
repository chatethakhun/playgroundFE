import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Navbar from '@/components/ui/Navbar'
import isAuthenticate from '@/utils/isAuthenticate'
// Create a client
const queryClient = new QueryClient()
export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        {isAuthenticate() && <Navbar />}
      </QueryClientProvider>

      <TanStackRouterDevtools />
    </>
  ),
})
