import { memo, useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import useChat from '@/hooks/useChat'
import useCustomRouter from '@/hooks/useCustomRouter'
import { cn } from '@/utils/cn'
import { formatTimestamp } from '@/utils/date'

interface ChatItemProps {
  chat: User
  unseenMessages: number
  lastMessage?: Message
}
const ChatItem = ({ chat, unseenMessages = 0, lastMessage }: ChatItemProps) => {
  const { goTo } = useCustomRouter()
  const { onlineUserIds } = useChat()

  const isOnline = useMemo(
    () => onlineUserIds.includes(chat._id),
    [chat._id, onlineUserIds],
  )
  return (
    <div
      className="flex items-center justify-between"
      onClick={() => goTo(`/chatapp/${chat._id}`)}
    >
      <div className="flex items-center relative gap-4 ">
        <div className="relative">
          <Avatar size={50} src={chat.avatar} alt={chat.fullName} />
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full z-10 border" />
          )}
        </div>
        <div className="flex flex-col ">
          <p className="text-sm font-bold text-l gap-2 text-white ">
            {chat.fullName}
          </p>
          <p className="text-xs text-white">
            {lastMessage ? lastMessage.text : 'No Content'}
          </p>
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        {unseenMessages > 0 && (
          <p
            className={cn({
              'bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center text-white   ml-auto ':
                unseenMessages > 0,
            })}
          >
            {unseenMessages}
          </p>
        )}
        <p className="text-xs text-white"> {formatTimestamp(chat.createdAt)}</p>
      </div>
    </div>
  )
}

const memoChatItem = memo(ChatItem, (prev, next) => {
  return (
    prev.chat._id === next.chat._id &&
    prev.unseenMessages === next.unseenMessages
  )
})

export default memoChatItem
