import Avatar from '@/components/ui/Avatar'
import { cn } from '@/utils/cn'

interface ChatItemProps {
  chat: User
  unseenMessages: number
}
const ChatItem = ({ chat, unseenMessages = 0 }: ChatItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center relative gap-4">
        <Avatar size={50} src={chat.avatar} alt={chat.fullName} />
        <div className="flex flex-col ">
          <p className="text-sm font-bold text-l gap-2 text-white ">
            {chat.fullName}
          </p>
          <p className="text-xs text-white">Content</p>
        </div>
      </div>
      <div className="ml-3">
        {unseenMessages > 0 && (
          <p
            className={cn({
              'bg-red-500 rounded-full w-5 h-5 text-sm flex items-center justify-center text-white font-bold':
                unseenMessages > 0,
            })}
          >
            {unseenMessages}
          </p>
        )}
      </div>
    </div>
  )
}

export default ChatItem
