import Avatar from '@/components/ui/Avatar'
import useAuth from '@/hooks/useAuth'
import { cn } from '@/utils/cn'
import { dateTimeDDMMYYYY } from '@/utils/date'

interface MessageItemProps {
  message: Message
  sender?: User
  reciever?: User
}
const MessageItem = ({ message, sender, reciever }: MessageItemProps) => {
  const { authUser } = useAuth()
  const isSender = message.senderId === authUser?._id
  return (
    <div
      className={cn('flex  items-center-safe gap-2  my-2 ', {
        'justify-start flex-row-reverse ml-auto  rounded-3xl': isSender,
      })}
    >
      <Avatar size={40} src={isSender ? sender?.avatar : reciever?.avatar} />
      <div>
        <div
          className={cn('flex flex-col', {
            'bg-primary text-white px-5 rounded-md py-1': isSender,
            'border-border border rounded-md px-5 py-1': !isSender,
          })}
        >
          <p className="text-md">{message.text}</p>
        </div>
        <p
          className={cn('text-xs text-gray-400 ', {
            'text-right': isSender,
          })}
        >
          {dateTimeDDMMYYYY(message.createdAt)}
        </p>
      </div>
    </div>
  )
}

export default MessageItem
