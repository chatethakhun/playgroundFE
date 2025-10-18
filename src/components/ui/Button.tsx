import { memo, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  primary?: boolean
  secondary?: boolean
  isBlock?: boolean
  ghost?: boolean
}
const Button = memo(
  ({
    children,
    primary = true,
    secondary = false,
    ghost = false,
    isBlock = false,
    onClick,
    disabled = false,
  }: IButton) => {
    return (
      <button
        onClick={onClick}
        type="button"
        className={cn(
          ' rounded-md px-4 py-2 font-semibold disabled:opacity-50 cursor-pointer ',
          {
            'w-full': isBlock,
            'bg-dark text-white hover:bg-gray-800 active:bg-gray-900': primary,
            'bg-white text-dark hover:bg-gray-200 border-dark border-1 active:bg-gray-300':
              secondary,
            'bg-white text-dark hover:bg-gray-200 active:bg-gray-300': ghost,
          },
        )}
        disabled={disabled}
      >
        {children}
      </button>
    )
  },
)

export default Button
