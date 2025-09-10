import WorkoutSessionForm from '@/components/ui/workoutSession/WorkoutSessionForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/fitnesstracker/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-10">
      <p className="text-center text-5xl font-bold">Let's workout together</p>

      <WorkoutSessionForm />
    </div>
  )
}
