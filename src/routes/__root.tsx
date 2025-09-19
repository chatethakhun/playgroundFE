import { QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Navbar from '@/components/ui/Navbar'
import { AuthProvider } from '@/providers/AuthContext'
import { NotificationProvider } from '@/providers/NotificationProvider'
import '../i18n'
import { LocaleProvider } from '@/providers/LocaleProvider'
import { ToastContainer } from 'react-toastify'
import { queryClient } from '@/utils/queryClient'
// Create a client
import { HeadContent } from '@tanstack/react-router'
export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LocaleProvider>
            <NotificationProvider>
              <HeadContent />
              <Outlet />
              <Navbar />
              <ToastContainer />
            </NotificationProvider>
          </LocaleProvider>
        </AuthProvider>
      </QueryClientProvider>

      <TanStackRouterDevtools />
    </>
  ),
})
