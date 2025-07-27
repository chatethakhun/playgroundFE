import Avatar from '@/components/ui/Avatar'
import useAuth from '@/hooks/useAuth'
import { cn } from '@/utils/cn'

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
      className={cn('flex items-center-safe gap-2  my-2', {
        'justify-start flex-row-reverse w-min ml-auto  rounded-3xl': isSender,
      })}
    >
      <Avatar size={40} src={isSender ? sender?.avatar : reciever?.avatar} />
      <div
        className={cn('flex flex-col', {
          'bg-primary text-white px-5 rounded-md py-1': isSender,
          'border-border border rounded-md px-5 py-1': !isSender,
        })}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  )
}

export default MessageItem
