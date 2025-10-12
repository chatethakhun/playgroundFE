import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import Modal from 'react-modal'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import LoadingFullPage from './components/ui/LoadingFullPage.tsx'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

if (process.env.NODE_ENV === 'development') {
  import('react-scan').then((mod) => {
    mod.scan()
  })
}

// Render the app
const rootElement = document.getElementById('app')

Modal.setAppElement('#app')

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<LoadingFullPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </I18nextProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
