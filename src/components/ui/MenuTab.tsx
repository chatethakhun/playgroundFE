import { cn } from '@/utils/cn'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
const TabItem = memo(
  function TabItem({
    tab,
    onClick,
    isActive = false,
  }: {
    tab: string
    onClick?: () => void
    isActive?: boolean
  }) {
    const { t } = useTranslation(['kit', 'runner'])
    return (
      <li className="me-2 cursor-pointer" onClick={onClick}>
        <div
          className={cn(
            'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group',
            {
              'active dark:text-primary dark:border-primary font-bold bg-gray-300':
                isActive,
            },
          )}
        >
          {t(tab)}
        </div>
      </li>
    )
  },
  (prev, next) => {
    return (
      prev.tab === next.tab &&
      prev.isActive === next.isActive &&
      prev.onClick === next.onClick
    )
  },
)

const MenuTab = memo(function MenuTab({
  tabs = [],
  currentIndex = 0,
  onChange,
}: {
  tabs: string[]
  currentIndex: number
  onChange?: (index: number) => void
}) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {tabs.map((tab, index) => (
          <TabItem
            tab={tab}
            key={index}
            onClick={() => onChange?.(index)}
            isActive={currentIndex === index}
          />
        ))}
      </ul>
    </div>
  )
})

export default MenuTab
