import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextInput from '../TextInput'
import { useCallback } from 'react'
import Button from '../Button'
import DropDown from '../Dropdown'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createWorkout,
  updateWorkout,
} from '@/services/workout/workout.service'
import useCustomRouter from '@/hooks/useCustomRouter'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  workoutType: yup.string().required('Workout type is required'),
  workoutReps: yup
    .number()
    .moreThan(0, 'Workout reps is required')
    .required('Workout reps is required'),
  workoutSets: yup
    .number()
    .moreThan(0, 'Workout sets is required')
    .required('Workout sets is required'),
})

type Data = yup.Asserts<typeof schema>

const WorkoutForm = ({ workout }: { workout?: Workout }) => {
  const queryClient = useQueryClient()
  const method = useForm({
    defaultValues: {
      name: workout?.name || '',
      workoutType: workout?.workoutType || '',
      workoutReps: workout?.workoutReps || 0,
      workoutSets: workout?.workoutSets || 0,
      description: workout?.description || '',
    },
    resolver: yupResolver(schema),
  })

  const { goTo } = useCustomRouter()

  const createWorkoutMutation = useMutation({
    mutationFn: (data: Data) => createWorkout(data),
    onSuccess: () => {
      goTo('/fitnesstracker/workout')
    },
    onError: () => {
      console.log('error')
    },
  })

  const updateWorkoutMutation = useMutation({
    mutationFn: (data: Data) => updateWorkout(String(workout?._id), data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['workouts', workout?._id] })
      goTo('/fitnesstracker/workout')
    },
    onError: () => {
      console.log('error')
    },
  })

  const onSubmit = useCallback(
    (data: Data) => {
      workout
        ? updateWorkoutMutation.mutate(data)
        : createWorkoutMutation.mutate(data)
    },
    [createWorkoutMutation],
  )

  return (
    <FormProvider {...method}>
      <Controller
        control={method.control}
        name="name"
        render={({
          field: { name, value, onChange },
          fieldState: { error },
        }) => (
          <TextInput
            id={name}
            name={name}
            label="Name"
            value={value}
            onChange={onChange}
            errorMessage={error?.message}
          />
        )}
      />

      <Controller
        control={method.control}
        name="description"
        render={({
          field: { name, value, onChange },
          fieldState: { error },
        }) => (
          <TextInput
            id={name}
            name={name}
            label="Description"
            value={value ?? ''}
            onChange={onChange}
            errorMessage={error?.message}
          />
        )}
      />

      <Controller
        name="workoutType"
        control={method.control}
        render={({
          field: { name, value, onChange },
          fieldState: { error },
        }) => (
          <DropDown
            label="Workout Type"
            id={name}
            value={value}
            onChange={onChange}
            options={[
              { label: 'Cardio', value: 'cardio' },
              { label: 'Strength', value: 'strength' },
              { label: 'Yoga', value: 'yoga' },
            ]}
            errorMessage={error?.message}
          />
        )}
      />

      <Controller
        name="workoutReps"
        control={method.control}
        render={({
          field: { name, value, onChange },
          fieldState: { error },
        }) => (
          <TextInput
            id={name}
            type={'number'}
            name={name}
            label="Workout Reps"
            value={String(value)}
            onChange={onChange}
            errorMessage={error?.message}
          />
        )}
      />

      <Controller
        name="workoutSets"
        control={method.control}
        render={({
          field: { name, value, onChange },
          fieldState: { error },
        }) => (
          <TextInput
            id={name}
            name={name}
            type="number"
            label="Workout Sets"
            value={String(value)}
            onChange={onChange}
            errorMessage={error?.message}
          />
        )}
      />

      <Button onClick={method.handleSubmit(onSubmit)} isBlock>
        Save
      </Button>
    </FormProvider>
  )
}

export default WorkoutForm
