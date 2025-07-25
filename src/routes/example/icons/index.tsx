import { createFileRoute } from '@tanstack/react-router'
import * as Icons from 'omoo-icons'
import { useCallback } from 'react'

export const Route = createFileRoute('/example/icons/')({
  component: RouteComponent,
})

function RouteComponent() {
  const onCopy = useCallback((iconName: string) => {
    navigator.clipboard.writeText(`<${iconName} />`)
  }, [])
  return (
    <div className="grid grid-cols-4 gap-2 px-2">
      {Object.entries(Icons).map(([name, Icon]) => (
        <div className="flex  items-center gap-2">
          <div className="flex items-center justify-center w-4 h-4 ">
            <Icon className="text-sm text-gray-700" />
          </div>
          <code
            className="cursor-pointer bg-blue-950 px-2 text-white rounded-md"
            onClick={() => onCopy(name)}
          >{`<${name} />`}</code>
        </div>
      ))}
    </div>
  )
}
