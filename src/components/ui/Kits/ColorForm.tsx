import { memo, useCallback } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import TextInput from '../TextInput'
import Button from '../Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createColor } from '@/services/gunplaKits/color.service'

const schema = yup.object({
  name: yup.string().required(),
  hex: yup.string().required().min(6).max(7),
})

type Data = yup.Asserts<typeof schema>

const ColorForm = memo(({ onClose }: { onClose?: () => void }) => {
  const queryClient = useQueryClient()
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      hex: '#ffffff',
    },
  })

  const { mutate: addColor } = useMutation({
    mutationFn: (data: Data) => createColor(data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['colors'],
      })
      onClose && onClose()
    },
  })

  const onSubmit = useCallback((data: Data) => {
    addColor(data)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <FormProvider {...form}>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              id={field.name}
              label="Color name"
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="hex"
          render={({ field }) => (
            <TextInput
              {...field}
              id={field.name}
              type="color"
              label="Color Hex"
              onChange={(e) => {
                field.onChange(e.target.value)
              }}
            />
          )}
        />

        <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
      </FormProvider>
    </div>
  )
})

export default ColorForm
