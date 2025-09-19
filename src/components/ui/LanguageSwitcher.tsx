import i18n from '../../i18n'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocale } from '@/hooks/useLocale'
import { memo } from 'react'
const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex  justify-end">
      <Select
        onValueChange={(e) => {
          setLocale(e)
          i18n.changeLanguage(e)
        }}
        value={locale}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Change language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="th">Thai</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
})

export default LanguageSwitcher
