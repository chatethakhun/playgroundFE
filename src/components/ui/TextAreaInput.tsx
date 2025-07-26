import { cn } from '@/utils/cn'

type ThemeTextInput = 'default' | 'white'
interface ITextAreaInput
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  placeholder: string
  id: string
  icon?: React.ReactNode
  errorMessage?: string
  theme?: ThemeTextInput
}
const TextAreaInput = ({
  label,
  placeholder,
  id,
  icon,
  errorMessage,
  onChange,
  value,
  theme = 'default',
  rows = 4,
}: ITextAreaInput) => {
  return (
    <fieldset className="flex flex-col gap-2 relative">
      {label && <label className="text-dark">{label}</label>}
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={cn(
          'rounded-md border-border border-1 py-2 px-4 text-dark rounde-lg focus:outline-dark-gray',
          {
            'bg-light-gray': theme === 'default',
            'bg-white': theme === 'white',
          },
        )}
      />
      <div className="absolute right-2 top-2">{icon}</div>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </fieldset>
  )
}

export default TextAreaInput
