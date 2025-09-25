import { createFileRoute, redirect } from '@tanstack/react-router'
import isAuthenticate from '@/utils/isAuthenticate'
import { getMe } from '@/services/auth/auth.service'

export const Route = createFileRoute('/_admin')({
  beforeLoad: async () => {
    const { user } = await getMe()

    if (!isAuthenticate()) {
      throw redirect({
        to: '/login',
      })
    }

    if (user.role !== 'admin') {
      throw redirect({
        to: '/apps',
      })
    }
  },
})
