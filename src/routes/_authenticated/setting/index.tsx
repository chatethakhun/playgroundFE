import PageContainer from '@/components/ui/PageContainer'
import useAuth from '@/hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'
import { IoMdLogOut } from 'react-icons/io'
import { MdOutlineNotificationsActive } from 'react-icons/md'
export const Route = createFileRoute('/_authenticated/setting/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { logout } = useAuth()

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold">Setting</h1>

      <div>
        <ul>
          <li className="px-2 py-3 flex gap-2 items-center cursor-pointer">
            <MdOutlineNotificationsActive />
            Notifications
          </li>
          <li
            className="flex gap-2 items-center border-t cursor-pointer px-2 py-3 border-border"
            onClick={() => {
              console.log('logout', logout)
              logout()
            }}
          >
            <IoMdLogOut />
            Logout
          </li>
        </ul>
      </div>
    </PageContainer>
  )
}
