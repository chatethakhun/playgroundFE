import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import TextInput from '../TextInput'
import Button from '../Button'
import { memo, useCallback } from 'react'
import { createWorkoutSession } from '@/services/workoutSession/workoutSession.service'
import useCustomRouter from '@/hooks/useCustomRouter'
import { useMutation } from '@tanstack/react-query'
const schema = yup.object({
  title: yup.string().required('Title is required'),
  focus: yup.string().required('Focus is required'),
})

type Data = yup.Asserts<typeof schema>
const WorkoutSessionForm = memo(() => {
  const { goTo } = useCustomRouter()
  const methods = useForm({
    defaultValues: {
      title: '',
      focus: '',
    },
    resolver: yupResolver(schema),
  })

  const createSession = useMutation({
    mutationFn: (data: Data) => createWorkoutSession(data),
    onSuccess: (data) => {
      goTo(`/fitnesstracker/${data._id}`)
    },
  })

  const { handleSubmit } = methods

  const onSubmit = useCallback(async (data: Data) => {
    try {
      createSession.mutate(data)
    } catch (error) {
      console.error(error)
    }
  }, [])
  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4">
        <Controller
          control={methods.control}
          name="title"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextInput
              id="title"
              name="title"
              value={value}
              onChange={onChange}
              placeholder="Title"
              errorMessage={error?.message ?? ''}
            />
          )}
        />
        <Controller
          control={methods.control}
          name="focus"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextInput
              id="focus"
              name="focus"
              value={value}
              onChange={onChange}
              placeholder="Focus"
              errorMessage={error?.message ?? ''}
            />
          )}
        />

        <Button
          disabled={createSession.isPending}
          onClick={handleSubmit(onSubmit)}
        >
          Start session
        </Button>
      </div>
    </FormProvider>
  )
})

export default WorkoutSessionForm
