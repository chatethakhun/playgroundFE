import { memo, type ButtonHTMLAttributes } from 'react'

import RSButton from 'rsuite/Button'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  primary?: boolean
  secondary?: boolean
  isBlock?: boolean
  ghost?: boolean
}
const Button = memo(({ children, onClick, disabled = false }: IButton) => {
  return (
    <RSButton onClick={onClick} type="button" disabled={disabled} block>
      {children}
    </RSButton>
  )
})

export default Button
