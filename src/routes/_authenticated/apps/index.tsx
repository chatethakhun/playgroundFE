import { createFileRoute } from '@tanstack/react-router'
import { MessageCircle, Dumbbell } from 'lucide-react'
export const Route = createFileRoute('/_authenticated/apps/')({
  component: RouteComponent,
})

const apps = [
  { name: 'ChatApp', path: '/chatapp', icon: MessageCircle },
  { name: 'FitnessTracker', path: '/fitnesstracker', icon: Dumbbell },
]

function RouteComponent() {
  return (
    <div>
      {apps.map((app) => (
        <p>{app.name}</p>
      ))}
    </div>
  )
}
