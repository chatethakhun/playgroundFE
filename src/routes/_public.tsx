import { createFileRoute, redirect } from '@tanstack/react-router'
import isAuthenticate from '@/utils/isAuthenticate'

export const Route = createFileRoute('/_public')({
  beforeLoad: () => {
    if (isAuthenticate()) {
      throw redirect({
        to: '/apps',
      })
    }
  },
})
