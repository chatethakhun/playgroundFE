import { memo, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  primary?: boolean
  secondary?: boolean
  isBlock?: boolean
}
const Button = memo(
  ({
    children,
    primary = true,
    secondary = false,
    isBlock = false,
    onClick,
    disabled = false,
  }: IButton) => {
    return (
      <button
        onClick={onClick}
        type="button"
        className={cn(
          ' rounded-md px-4 py-2 font-semibold disabled:opacity-50',
          {
            'w-full': isBlock,
            'bg-dark text-white hover:bg-gray-800': primary,
            'bg-white text-dark hover:bg-gray-200 border-dark border-1':
              secondary,
          },
        )}
        disabled={disabled}
      >
        {children}
      </button>
    )
  },
  (prev, next) =>
    prev.primary === next.primary &&
    prev.secondary === next.secondary &&
    prev.isBlock === next.isBlock &&
    prev.children === next.children,
)

export default Button
