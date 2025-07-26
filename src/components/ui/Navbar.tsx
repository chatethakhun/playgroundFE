import { BiMessageRoundedDetail } from 'react-icons/bi'

import useCustomRouter from '@/hooks/useCustomRouter'
import { cn } from '@/utils/cn'

const Navbar = () => {
  const { currentPathName, goTo } = useCustomRouter()

  return (
    <div className="flex items-center justify-around w-full h-16 px-4 py-2 bg-white shadow-md absolute right-0 left-0 bottom-0">
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center ">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white cursor-pointer"
            onClick={() => {
              goTo('/chatapp')
            }}
          >
            <BiMessageRoundedDetail
              className={cn('text-2xl text-gray-500', {
                'text-primary': currentPathName === '/chatapp',
              })}
            />
          </button>
          <p
            className={cn({
              'text-primary': currentPathName === '/chatapp',
            })}
          >
            Message
          </p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
