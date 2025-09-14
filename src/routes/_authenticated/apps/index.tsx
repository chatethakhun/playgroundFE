import Button from '@/components/ui/Button'
import PageContainer from '@/components/ui/PageContainer'
import useCustomRouter from '@/hooks/useCustomRouter'
import { createFileRoute } from '@tanstack/react-router'
import { MessageCircle, Dumbbell } from 'lucide-react'
import React, { memo, useCallback } from 'react'
export const Route = createFileRoute('/_authenticated/apps/')({
  component: RouteComponent,
})

const apps = [
  {
    name: 'ChatApp',
    path: '/chatapp',
    icon: MessageCircle,
    image: '/images/chatapps.jpg',
    desc: 'Chat apps are a great way to connect with your customers. They are easy to use, and they can be used on multiple devices.',
  },
  {
    name: 'Gunpla Kits',
    path: '/gunpla-kits/kits',
    icon: Dumbbell,
    image: '/images/fitness.jpg',
    desc: 'Gunpla Kits are a great way to stay fit and healthy. They are easy to use, and they can be used on multiple devices.',
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
    const onClick = useCallback(() => {
      goTo(pathName)
    }, [pathName])
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mx-auto">
        {imageSrc && (
          <img
            className="rounded-t-lg h-[20%] object-cover w-full object-top"
            src={imageSrc}
            alt={name}
          />
        )}
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>
          {desc && (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {desc}
            </p>
          )}
          <Button secondary onClick={onClick}>
            <div className="flex items-center">
              Go to app
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
