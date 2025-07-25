import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  primary?: boolean
  secondary?: boolean
  isBlock?: boolean
}
const Button = ({
  children,
  primary = true,
  secondary = false,
  isBlock = false,
}: IButton) => {
  return (
    <button
      type="button"
      className={cn(' rounded-md px-4 py-4 font-semibold', {
        'w-full': isBlock,
        'bg-dark text-white hover:bg-gray-800': primary,
        'bg-white text-dark hover:bg-gray-200 border-dark border-1': secondary,
      })}
    >
      {children}
    </button>
  )
}

export default Button
