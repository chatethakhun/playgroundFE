import AvatarPlaceholder from '@/assets/images/avatar.png'

interface AvatarProps {
  src?: string
  alt?: string
  size?: number
}
const Avatar = ({ src, alt, size = 64 }: AvatarProps) => {
  return (
    <div
      className="relative border border-gray rounded-full p-2 "
      style={{ width: size, height: size }}
    >
      <img
        src={src || AvatarPlaceholder}
        alt={alt}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
      />
    </div>
  )
}

export default Avatar
