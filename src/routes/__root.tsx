import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorComponent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Navbar from '@/components/ui/Navbar'
import { AuthProvider } from '@/providers/AuthContext'

import { LocaleProvider } from '@/providers/LocaleProvider'
import { ToastContainer } from 'react-toastify'
import { queryClient } from '@/utils/queryClient'
// Create a client
import { HeadContent } from '@tanstack/react-router'
import { CustomProvider } from 'rsuite'
import { lazy, Suspense } from 'react'
import LoadingFullPage from '@/components/ui/LoadingFullPage'

const GlobalError = lazy(() => import('@/components/ui/GlobalError'))
const NotFoundError = lazy(() => import('@/components/ui/NotFoundError'))
import 'rsuite/dist/rsuite.min.css'

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LocaleProvider>
            <CustomProvider theme="light">
              <HeadContent />
              <Outlet />
              <Navbar />
              <ToastContainer />
            </CustomProvider>
          </LocaleProvider>
        </AuthProvider>
      </QueryClientProvider>

      <TanStackRouterDevtools />
    </>
  ),
  errorComponent: (error) => {
    const isDev = import.meta.env.DEV
    if (isDev) {
      return ErrorComponent
    }
    return (
      <Suspense fallback={<LoadingFullPage />}>
        <GlobalError error={error} />
      </Suspense>
    )
  },
  notFoundComponent: () => (
    <Suspense fallback={<LoadingFullPage />}>
      <NotFoundError />
    </Suspense>
  ),
})
