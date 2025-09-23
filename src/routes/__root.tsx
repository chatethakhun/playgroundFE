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
import { useTranslation } from 'react-i18next'

function GlobalError({ error }: { error: unknown }) {
  const { t } = useTranslation('common')

  const isDev = import.meta.env.DEV
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        500 - {t('500-title')}
      </h1>
      <p className="text-gray-700">{t('500-message')}</p>
      {isDev && (
        <pre className="mt-4 p-2 bg-gray-200 rounded text-sm text-gray-800">
          {String(error)}
        </pre>
      )}
    </div>
  )
}

function NotFound() {
  const { t } = useTranslation('common')
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - {t('404-title')}
      </h1>
      <p className="text-gray-700">{t('404-message')}</p>
    </div>
  )
}

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
  errorComponent: GlobalError,
  notFoundComponent: NotFound,
})
