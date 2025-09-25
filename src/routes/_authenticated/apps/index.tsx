import Button from '@/components/ui/Button'
import PageContainer from '@/components/ui/PageContainer'
import useCustomRouter from '@/hooks/useCustomRouter'
import { createFileRoute } from '@tanstack/react-router'
import { Dumbbell } from 'lucide-react'
import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_authenticated/apps/')({
  component: RouteComponent,
})

const apps = [
  {
    name: 'gunpla.title',
    path: '/gunpla-kits/kits',
    icon: Dumbbell,
    image: '/images/gundam.jpg',
    desc: 'gunpla.description',
  },
]

const AppCard = memo(
  ({
    name,
    pathName,
    imageSrc,
    desc,
  }: {
    name: string
    pathName: string
    icon?: React.ReactNode
    imageSrc: string
    desc?: string
  }) => {
    const { goTo } = useCustomRouter()
    const { t } = useTranslation('apps')
    const onClick = useCallback(() => {
      goTo(pathName)
    }, [pathName])
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mx-auto">
        {imageSrc && (
          <img
            loading="lazy"
            className="rounded-t-lg h-[20%] object-cover w-full object-top"
            src={imageSrc}
            alt={name}
          />
        )}
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t(name)}
            </h5>
          </a>
          {desc && (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {t(desc)}
            </p>
          )}
          <Button secondary onClick={onClick}>
            <div className="flex items-center">
              {t('go_to_apps')}
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </div>
          </Button>
        </div>
      </div>
    )
  },
  (prev, next) =>
    prev.name === next.name &&
    prev.pathName === next.pathName &&
    prev.imageSrc === next.imageSrc &&
    prev.desc === next.desc,
)

function RouteComponent() {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1  overflow-auto text-center justify-center items-center">
        {apps.map((app) => (
          <AppCard
            key={app.name}
            name={app.name}
            pathName={app.path}
            imageSrc={app.image}
            desc={app.desc}
          />
        ))}
      </div>
    </PageContainer>
  )
}
