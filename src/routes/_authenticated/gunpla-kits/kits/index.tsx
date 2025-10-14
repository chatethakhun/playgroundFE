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

type KitSearch = {
  isFinished: boolean
}
export const Route = createFileRoute('/_authenticated/gunpla-kits/kits/')({
  validateSearch: (args: KitSearch) => {
    if (
      !!args.isFinished &&
      args.isFinished !== true &&
      args.isFinished !== false
    ) {
      throw new Error('Invalid isFinished search parameter')
    }

    return args
  },
  loaderDeps: ({ search: { isFinished } }: { search: KitSearch }) => ({
    isFinished,
  }),
  loader: async ({ deps: { isFinished } }) => {
    const kits = await queryClient.ensureQueryData(kitService.getAllKitQuery())
    return kits
  },
  head: () => ({
    meta: [{ title: 'Kits', description: 'Kits' }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { goTo } = useCustomRouter()
  const { isFinished } = Route.useSearch()
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
          <h1 className="text-2xl font-bold text-primary">{t('list.title')}</h1>
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
        tabs={[t('kit:tab-1'), t('kit:tab-2')]}
        onChange={(index) =>
          goTo(`/gunpla-kits/kits${index === 0 ? '' : '?isFinished=true'}`)
        }
        currentIndex={!!isFinished ? 1 : 0}
      />
      <ListKits isFinished={!!isFinished} />
    </PageContainer>
  )
}
