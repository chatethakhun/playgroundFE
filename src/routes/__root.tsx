import { QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Navbar from '@/components/ui/Navbar'
import { AuthProvider } from '@/providers/AuthContext'

import { LocaleProvider } from '@/providers/LocaleProvider'
import { ToastContainer } from 'react-toastify'
import { queryClient } from '@/utils/queryClient'
// Create a client
import { HeadContent } from '@tanstack/react-router'

import { lazy, Suspense } from 'react'
import LoadingFullPage from '@/components/ui/LoadingFullPage'

const GlobalError = lazy(() => import('@/components/ui/GlobalError'))
const NotFoundError = lazy(() => import('@/components/ui/NotFoundError'))

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LocaleProvider>
            <HeadContent />
            <Outlet />
            <Navbar />
            <ToastContainer />
          </LocaleProvider>
        </AuthProvider>
      </QueryClientProvider>

      <TanStackRouterDevtools />
    </>
  ),
  errorComponent: (error) => {
    const isDev = import.meta.env.DEV
    if (isDev) {
      return <div>{JSON.stringify(error)}</div>
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
