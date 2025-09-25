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
import { User, SkipBack } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../LanguageSwitcher'
import useCustomRouter from '@/hooks/useCustomRouter'

const items = [
  {
    title: 'dashboard.users.title',
    url: '/dashboard/users',
    icon: User,
  },
  {
    title: 'common:back',
    url: '/apps',
    icon: SkipBack
  }
]
const DashboardSidebar = memo(() => {
  const { t } = useTranslation('dashboard')
  const {  currentPathName , goTo} = useCustomRouter()

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
                    <a onClick={() => goTo(item.url)}>
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
      <div className="p-2">
        <LanguageSwitcher />
      </div>
    </Sidebar>
  )
})

export default DashboardSidebar
