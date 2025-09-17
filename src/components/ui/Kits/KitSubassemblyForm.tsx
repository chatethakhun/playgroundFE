import { memo, useCallback } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createKitSubassembly } from '@/services/gunplaKits/kit.service'
import TextInput from '../TextInput'
import Button from '../Button'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const schema = yup.object({
  name: yup.string().required('Kit Subassembly Name is required'),
  key: yup.string().required('Kit Subassembly Key is required'),
})

type Data = yup.Asserts<typeof schema>

const KitSubassemblyForm = memo(({ kitId }: { kitId: string }) => {
  const queryClient = useQueryClient()
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      key: '',
    },
  })

  const { t } = useTranslation('common')

  const { mutate: addSubassembly } = useMutation({
    mutationFn: (data: Data) => createKitSubassembly(data, kitId),
    onSuccess: () => {
      form.reset()
      queryClient.refetchQueries({
        queryKey: ['kit', kitId, 'subassemblies'],
      })
      toast(t('save-success'), { position: 'bottom-center' })
    },
  })

  const onSubmit = useCallback((data: Data) => {
    addSubassembly(data)
  }, [])
  return (
    <div className="flex flex-col gap-4">
      <FormProvider {...form}>
        <Controller
          control={form.control}
          name="key"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              name={field.name}
              id={field.name}
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
              errorMessage={fieldState.error?.message}
              label="Kit Subassembly Key"
              placeholder="head, arm"
            />
          )}
        />

        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              name={field.name}
              id={field.name}
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
              errorMessage={fieldState.error?.message}
              label="Kit Subassembly Name"
              placeholder="Head"
            />
          )}
        />

        <Button isBlock onClick={form.handleSubmit(onSubmit)}>
          Save
        </Button>
      </FormProvider>
    </div>
  )
})

export default KitSubassemblyForm
