import useCustomRouter from '@/hooks/useCustomRouter'
import { cn } from '@/utils/cn'
import useAuth from '@/hooks/useAuth'

import { MessageSquareText, User, Settings } from 'lucide-react'
import { memo, useMemo } from 'react'

import { CirclePlus, FileClock, Dumbbell } from 'lucide-react'

const chatAppsNavs = [
  {
    name: 'Message',
    path: '/chatapp',
    id: 'message',
    icon: MessageSquareText,
  },
  {
    name: 'Profile',
    path: '/profile',
    id: 'profile',
    icon: User,
  },
  {
    name: 'Setting',
    path: '/setting',
    id: 'setting',
    icon: Settings,
  },
]

const fitnessAppsNavs = [
  {
    name: 'Start session',
    path: '/fitnesstracker',
    id: 'start_session',
    icon: CirclePlus,
  },
  {
    name: 'History',
    path: '/fitnesstracker/history',
    id: 'history',
    icon: FileClock,
  },
  {
    name: 'Workout',
    path: '/fitnesstracker/workout',
    id: 'workout',
    icon: Dumbbell,
  },
]
const Navbar = memo(() => {
  const { currentPathName, goTo } = useCustomRouter()
  const { authUser } = useAuth()

  const nav = useMemo(() => {
    if (currentPathName.includes('/chatapp')) {
      return chatAppsNavs
    }

    if (currentPathName.includes('/fitnesstracker')) {
      return fitnessAppsNavs
    }

    return []
  }, [currentPathName])

  if (!authUser || nav.length === 0) return null
  return (
    <div className="flex items-center justify-around w-full h-16 px-4 py-2 bg-white shadow-md absolute right-0 left-0 bottom-0 gap-2 border-t border-border">
      <div className="flex items-center justify-around gap-8">
        {nav.map((nv) => (
          <div
            className="flex flex-col items-center cursor-pointer"
            key={nv.id}
            onClick={() => {
              goTo(nv.path)
            }}
          >
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white ">
              <nv.icon
                className={cn('text-lg text-gray-500', {
                  'text-primary': currentPathName === nv.path,
                })}
              />
            </button>
            <p
              className={cn('text-dark', {
                'text-primary font-bold': currentPathName === nv.path,
              })}
            >
              {nv.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default Navbar
