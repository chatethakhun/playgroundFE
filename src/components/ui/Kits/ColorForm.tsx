import { memo, useCallback } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import TextInput from '../TextInput'
import Button from '../Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateColor } from '@/services/gunplaKits/color.service'
import { Sketch } from '@uiw/react-color'

import SwitchInput from '../SwitchInput'
import { useTranslation } from 'react-i18next'
import useCustomRouter from '@/hooks/useCustomRouter'
import { toast } from 'react-toastify'
import colorService from '@/services/v2/color.service'
const schema = yup.object({
  name: yup.string().required(),
  hex: yup.string().required().min(6).max(7),
  multiple: yup.boolean().required(),
  clearColor: yup.boolean().required(),
})

type Data = yup.Asserts<typeof schema>

const ColorForm = memo(
  ({ onClose, color }: { onClose?: () => void; color?: Color }) => {
    const queryClient = useQueryClient()
    const { goTo } = useCustomRouter()
    const { t } = useTranslation(['common', 'color'])
    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        name: color?.name || '',
        hex: color?.hex ?? '#ffffff',
        multiple: color?.multiple ?? false,
        clearColor: color?.clearColor ?? false,
      },
    })

    const isMultiple = form.watch('multiple')

    const { mutate: addColor } = useMutation({
      mutationFn: (data: Data) =>
        colorService.createColor({
          name: data.name,
          hex: data.hex,
          is_multiple: data.multiple,
          is_clear: data.clearColor,
        }),
      onSuccess: (newData) => {
        if (!newData) return
        queryClient.setQueryData<Array<ColorV2>>(['colors'], (oldData) => {
          return [...(oldData ?? []), newData]
        })

        onClose && onClose()
      },
      onError: () => {
        toast.error(t('color:color.form.error'))
      },
    })

    const { mutate: editColor } = useMutation({
      mutationFn: (data: Data) => updateColor(color?._id ?? '', data),
      onSuccess: (newData) => {
        // refetch query data in cached queryClient
        queryClient.setQueryData<Array<Color>>(['colors'], (oldData) => {
          return (oldData ?? []).map((c) =>
            c._id === newData?._id ? newData : c,
          )
        })
        // refetch query data in cached queryClient
        queryClient.setQueryData<Color>(['colors', newData?._id], newData)

        goTo(`/gunpla-kits/kits/colors`)
      },
      onError: () => {
        toast.error(t('color:color.form.error'))
      },
    })

    const onSubmit = useCallback(
      (data: Data) => {
        color?._id ? editColor(data) : addColor(data)
      },
      [color?._id],
    )

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
                label={t('color:color.form.name_label')}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="multiple"
            render={({ field }) => (
              <SwitchInput
                checked={field.value}
                onCheckedChange={field.onChange}
                label={t('color:color.form.multiple_label')}
              />
            )}
          />
          {!isMultiple && (
            <Controller
              control={form.control}
              name="hex"
              render={({ field }) => (
                <Sketch
                  color={field.value}
                  onChange={(color) => field.onChange(color.hex)}
                />
                // <TextInput
                //  x` {...field}
                //   id={field.name}
                //   type="color"
                //   label="Color Hex"
                //   onChange={(e) => {
                //     field.onChange(e.target.value)
                //   }}
                // />
              )}
            />
          )}

          <Controller
            control={form.control}
            name="clearColor"
            render={({ field }) => (
              <SwitchInput
                checked={field.value}
                onCheckedChange={field.onChange}
                label={t('color:color.form.clear_color_label')}
              />
            )}
          />

          <Button onClick={form.handleSubmit(onSubmit)}>
            {t('common:save')}
          </Button>
        </FormProvider>
      </div>
    )
  },
)

export default ColorForm
