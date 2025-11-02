import Button from '@/components/ui/Button'
import ListKits from '@/components/ui/Kits/ListKits'

import PageContainer from '@/components/ui/PageContainer'
import useCustomRouter from '@/hooks/useCustomRouter'
import { createFileRoute } from '@tanstack/react-router'
import { ToyBrick } from 'lucide-react'

import GunplaSVG from '@/assets/images/gunpla.webp'
import { useTranslation } from 'react-i18next'
import { queryClient } from '@/utils/queryClient'

import MenuTab from '@/components/ui/MenuTab'
import kitService from '@/services/v2/kit.service'

const MAP_INDEX_STATUS = {
  ['in_progress']: 0,
  ['pending']: 1,
  ['done']: 2,
}

type KitSearch = {
  status: KitStatus
}
export const Route = createFileRoute('/_authenticated/gunpla-kits/kits/')({
  validateSearch: (args: KitSearch) => {
    const validStatus = ['in_progress', 'pending', 'done']
    if (!!args.status && !validStatus.includes(args.status as KitStatus)) {
      throw new Error('Invalid isFinished search parameter')
    }

    return args
  },
  loaderDeps: ({ search: { status } }) => ({
    status,
  }),
  loader: async ({ deps: { status } }) => {
    const kits = await queryClient.ensureQueryData(
      kitService.getAllKitQuery(status ?? 'in_progress'),
    )
    return kits
  },
  head: () => ({
    meta: [{ title: 'Kits', description: 'Kits' }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { goTo } = useCustomRouter()
  const { status } = Route.useSearch()
  const { t } = useTranslation('kit')

  return (
    <PageContainer>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src={GunplaSVG}
            alt="gunpla"
            className="w-8 h-8"
            loading="lazy"
          />
          <h1 className="text-lg font-bold text-primary">{t('list.title')}</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => goTo('/gunpla-kits/kits/colors')}>
            <div className="flex items-center gap-2">{t('list.add-color')}</div>
          </Button>
          <Button onClick={() => goTo('/gunpla-kits/kits/new')}>
            <div className="flex items-center gap-2">
              + <ToyBrick className="text-xs w-4 h-4" />
            </div>
          </Button>
        </div>
      </div>

      <MenuTab
        tabs={[t('kit:tab-1'), t('kit:tab-2'), t('kit:tab-3')]}
        onChange={(index) => {
          switch (index) {
            case 0:
              goTo('/gunpla-kits/kits?status=in_progress')
              break
            case 1:
              goTo('/gunpla-kits/kits?status=pending')
              break
            case 2:
              goTo('/gunpla-kits/kits?status=done')
              break
          }
        }}
        currentIndex={MAP_INDEX_STATUS[status] ?? 0}
      />
      <ListKits status={status} />
    </PageContainer>
  )
}
