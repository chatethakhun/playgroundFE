import type { ButtonHTMLAttributes } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const IconButton = ({ children, onClick }: IButton) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 rounded-md border-border border-1 text-dark"
    >
      {children}
    </button>
  )
}

export default IconButton
