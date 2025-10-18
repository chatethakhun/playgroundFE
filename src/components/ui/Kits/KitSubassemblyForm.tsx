import { memo, useCallback } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import TextInput from '../TextInput'
import Button from '../Button'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { toSnakeCase } from '@/utils/string'
import kitSubassemblyService from '@/services/v2/kitSubassembly.service'

const schema = yup.object({
  name: yup.string().required('subassembly:subassembly.form.name_error'),
  key: yup.string(),
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

  const { t } = useTranslation(['common', 'subassembly'])

  const { mutate: addSubassembly } = useMutation({
    mutationFn: (data: Data) =>
      kitSubassemblyService.createKitSubassembly(kitId, {
        name: data.name,
        kit_id: kitId,
      }),
    onSuccess: (newData) => {
      form.reset()
      // queryClient.refetchQueries({
      //   queryKey: ['kit', Number(kitId), 'subassemblies'],
      // })
      if (newData) {
        queryClient.setQueryData<Array<KitSubassemblyV2>>(
          ['kit', Number(kitId), 'subassemblies'],
          (oldData) => {
            if (!oldData) return oldData
            return [...oldData, newData]
          },
        )
      }
      toast(t('save-success'), { position: 'bottom-center' })
    },
  })

  const onSubmit = useCallback(
    (data: Data) => {
      addSubassembly(data)
    },
    [addSubassembly, toSnakeCase],
  )

  console.log({ errors: form.formState.errors })
  return (
    <div className="flex flex-col gap-4">
      <FormProvider {...form}>
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
              label={t('subassembly:subassembly.form.name_label')}
              placeholder={t('subassembly:subassembly.form.name_ph')}
            />
          )}
        />

        <Button
          isBlock
          onClick={() => {
            form.handleSubmit(onSubmit)()
          }}
        >
          {t('save')}
        </Button>
      </FormProvider>
    </div>
  )
})

export default KitSubassemblyForm
