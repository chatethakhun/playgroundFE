import { cn } from '@/utils/cn'

interface ITextAreaInput
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  placeholder: string
  id: string
  icon?: React.ReactNode
  errorMessage?: string
}
const TextAreaInput = ({
  label,
  placeholder,
  id,
  icon,
  errorMessage,
  onChange,
  value,

  rows = 4,
}: ITextAreaInput) => {
  return (
    <fieldset className="space-y-1 relative">
      {label && <label className="text-dark">{label}</label>}
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={cn(
          'rounded-md border-border bg-white border-1 py-2 px-4 text-dark rounde-lg focus:outline-dark-gray',
        )}
      />
      <div className="absolute right-2 top-2">{icon}</div>
      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </fieldset>
  )
}

export default TextAreaInput
