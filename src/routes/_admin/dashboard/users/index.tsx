import { getUsersQuery } from '@/services/users/users.service'
import { queryClient } from '@/utils/queryClient'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DashboardContainer from '@/components/ui/dashbaord/DashboardContainer'
import { useTranslation } from 'react-i18next'
import Avatar from '@/components/ui/Avatar'
import UserRole from '@/components/ui/dashbaord/UserRole'
import { Eye } from 'lucide-react'
import useCustomRouter from '@/hooks/useCustomRouter'
export const Route = createFileRoute('/_admin/dashboard/users/')({
  component: RouteComponent,
  loader: async () => {
    const users = await queryClient.ensureQueryData(getUsersQuery())
    return users
  },
})

function RouteComponent() {
  const { t } = useTranslation('dashboard')
  const { data } = useSuspenseQuery(getUsersQuery())
  const { goTo } = useCustomRouter()
  return (
    <DashboardContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">
              {t('dashboard.users.table.avatar')}
            </TableHead>
            <TableHead>{t('dashboard.users.table.id')}</TableHead>
            <TableHead>{t('dashboard.users.table.email')}</TableHead>
            <TableHead>{t('dashboard.users.table.fullName')}</TableHead>
            <TableHead>{t('dashboard.users.table.role')}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data || []).map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Avatar src={user.avatar} alt={user.fullName} size={16} />
              </TableCell>
              <TableCell className="font-medium">{user._id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>
                <UserRole role={user.role} />
              </TableCell>
              <TableCell>
                <Eye
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => {
                    goTo('/dashboard/users/' + user._id)
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardContainer>
  )
}
