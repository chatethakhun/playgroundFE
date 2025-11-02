import { memo, useMemo, type ButtonHTMLAttributes } from 'react'

import RSButton from 'rsuite/Button'

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
    onClick,
    disabled = false,
    primary,
    secondary,
    ghost,
    isBlock,
  }: IButton) => {
    const variant = useMemo(() => {
      if (primary) return 'primary'
      if (secondary) return 'default'
      if (ghost) return 'ghost'
      return 'primary'
    }, [primary, secondary, ghost])
    return (
      <RSButton
        onClick={onClick}
        type="button"
        disabled={disabled}
        block={isBlock}
        appearance={variant}
      >
        {children}
      </RSButton>
    )
  },
)

export default Button
