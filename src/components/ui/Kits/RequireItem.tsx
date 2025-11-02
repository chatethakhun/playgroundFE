import {
  Item,
  ItemActions,
  ItemContent,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { Badge } from '@/components/ui/badge'
import RunnerColor from './RunnerColor'
import MultipleColorBox from './MultipleColorBox'
import { CheckCircle } from 'lucide-react'
import { memo } from 'react'
import { sortGates } from '@/utils/requirement'
import { cn } from '@/lib/utils'

const RequireItem = memo(
  ({
    item,
    onChecked,
  }: {
    item: KitRequirementWithRunnerAndColor
    onChecked: (item: KitRequirementWithRunnerAndColor) => void
  }) => {
    return (
      <Item
        className={cn('border rounded-2xl shadow-md')}
        isChecked={item.is_cut}
      >
        <ItemHeader>
          <div className="flex space-x-4">
            {item.runner.color.is_multiple ? (
              <MultipleColorBox />
            ) : (
              <RunnerColor
                color={item.runner.color.hex}
                name={item.runner.color.name}
              />
            )}
            <ItemTitle className="text-lg font-bold">
              {item.runner.name} x {item.runner.amount}
            </ItemTitle>
          </div>
        </ItemHeader>
        <ItemMedia />
        <ItemContent>
          <div className="flex flex-wrap space-x-2 space-y-2">
            {sortGates(item.gate).map((gate, index) => (
              <Badge key={index} variant="outline" className="shadow-sm">
                {gate}
              </Badge>
            ))}
          </div>
        </ItemContent>
        <ItemActions>
          <CheckCircle
            onClick={() => onChecked(item)}
            className={`${!item.is_cut ? 'text-gray-300' : 'text-green-500'} h-6 w-6`}
          />
        </ItemActions>
      </Item>
    )
  },
)

export default RequireItem
