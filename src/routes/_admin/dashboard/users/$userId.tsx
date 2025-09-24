import Box from '@/components/ui/dashbaord/Box'
import DashboardContainer from '@/components/ui/dashbaord/DashboardContainer'
import DetailItem from '@/components/ui/dashbaord/DetailItem'
import ChangePasswordForm from '@/components/ui/dashbaord/user/ChangePasswordForm'
import { getUserQuery, getUsersQuery } from '@/services/users/users.service'
import { queryClient } from '@/utils/queryClient'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_admin/dashboard/users/$userId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const user = queryClient.ensureQueryData(getUserQuery(params.userId))
    return { user }
  },
})

function RouteComponent() {
  const { userId } = Route.useParams()
  const { data: users } = useSuspenseQuery(getUsersQuery())
  const { data: user } = useSuspenseQuery({
    ...getUserQuery(userId),
    initialData: users?.find((user) => user._id === userId),
  })

  const { t } = useTranslation('dashboard')

  return (
    <DashboardContainer>
      <Box>
        <DetailItem label={t('dashboard.users.table.id')} value={userId} />
        <DetailItem
          label={t('dashboard.users.table.fullName')}
          value={user?.fullName || ''}
        />
        <DetailItem
          label={t('dashboard.users.table.email')}
          value={user?.email || ''}
        />
      </Box>

      <Box>
        <h1 className="text-2xl font-bold">
          {t('dashboard.user.change_password_title')}
        </h1>

        <ChangePasswordForm userId={user?._id ?? ''} />
      </Box>
    </DashboardContainer>
  )
}
