import { memo, useCallback, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ITagInput extends React.InputHTMLAttributes<HTMLInputElement> {
  tags: Array<string>
  handleTag: (tags: Array<string>) => void
  label?: string
  errorMessage?: string
  inputMode?:
    | 'text'
    | 'numeric'
    | 'decimal'
    | 'tel'
    | 'email'
    | 'url'
    | 'search' // 👈 เพิ่ม inputMode
}

const TagItem = memo(
  ({ tag, onRemoveTag }: { tag: string; onRemoveTag?: () => void }) => {
    return (
      <li className="input-tag__tags__item border border-primary rounded-sm px-2 py-0 flex gap-2 items-center">
        {tag}
        <X
          className="w-4 h-4 text-red-500 cursor-pointer"
          onClick={onRemoveTag}
        />
      </li>
    )
  },
)

TagItem.displayName = 'TagItem'

const TagInput = ({
  tags,
  handleTag: onChange,
  label,
  placeholder,
  id,
  name,
  errorMessage,
  disabled,
  type = 'text',
  inputMode = 'text', // 👈 default inputMode
}: ITagInput) => {
  const [inputValue, setInputValue] = useState('')

  const addTag = useCallback(
    (tag: string) => {
      const trimmedTag = tag.trim()
      if (trimmedTag && !tags.includes(trimmedTag)) {
        onChange([...tags, trimmedTag])
      }
    },
    [onChange, tags],
  )

  const onRemoveTag = useCallback(
    (i: number) => {
      onChange(tags.filter((_, index) => index !== i))
    },
    [onChange, tags],
  )

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const isEnterKey = e.key === 'Enter'
      const isCommaKey = e.key === ','

      if (isEnterKey || isCommaKey) {
        e.preventDefault()
        e.stopPropagation() // 👈 เพิ่มบรรทัดนี้

        if (inputValue.trim()) {
          addTag(inputValue)
          setInputValue('')
        }
      }
    },
    [addTag, inputValue],
  )

  // 👇 เพิ่ม onBlur เพื่อเพิ่ม tag เมื่อ blur
  const handleBlur = useCallback(() => {
    if (inputValue.trim()) {
      addTag(inputValue)
      setInputValue('')
    }
  }, [addTag, inputValue])

  return (
    <fieldset className="flex flex-col gap-2 relative">
      {label && <label className="text-dark">{label}</label>}
      <div
        className={cn(
          'rounded-md border-border border-1 bg-white py-2 px-4 text-dark rounde-lg focus:outline-dark-gray',
          {
            'bg-light-gray': disabled,
            'border-red-500 border-2': errorMessage,
          },
        )}
      >
        <ul className="input-tag__tags flex gap-1 flex-wrap">
          {tags.map((tag, i) => (
            <TagItem
              key={`${tag}_${i}`}
              tag={tag}
              onRemoveTag={() => onRemoveTag(i)}
            />
          ))}
          <li className="input-tag__tags__input">
            <input
              id={id}
              name={name}
              type={type} // 👈 เปลี่ยนเป็น text เสมอ
              inputMode={inputMode} // 👈 ใช้ inputMode แทน
              pattern={inputMode === 'numeric' ? '[0-9]*' : undefined} // 👈 เพิ่ม pattern
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress} // 👈 ป้องกัน Enter
              onBlur={handleBlur} // 👈 เพิ่ม tag เมื่อ blur
              autoComplete="off"
              placeholder={placeholder || 'Add a tag'}
              className="focus:outline-none"
              disabled={disabled}
            />
          </li>
        </ul>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm font-bold px-1">{errorMessage}</p>
      )}
    </fieldset>
  )
}

export default TagInput
