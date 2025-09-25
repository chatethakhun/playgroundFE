import { memo } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../LanguageSwitcher'
import useCustomRouter from '@/hooks/useCustomRouter'
const items = [
  {
    title: 'dashboard.users.title',
    url: '/dashboard/users',
    icon: User,
  },
]
const DashboardSidebar = memo(() => {
  const { t } = useTranslation('dashboard')
  const {  currentPathName } = useCustomRouter()

  console.log({ currentPathName })
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('dashboard.app_title')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={currentPathName.includes(item.url)}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{t(item.title)}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="p-1">
        <LanguageSwitcher />
      </div>
    </Sidebar>
  )
})

export default DashboardSidebar
