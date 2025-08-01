import { createFileRoute, redirect } from '@tanstack/react-router'
import isAuthenticate from '@/utils/isAuthenticate'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    if (!isAuthenticate()) {
      throw redirect({
        to: '/login',
      })
    }
  },
})
