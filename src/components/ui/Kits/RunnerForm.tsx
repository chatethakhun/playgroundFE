import { memo, useCallback } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextInput from '../TextInput'
import Button from '../Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getColors } from '@/services/gunplaKits/color.service'
import LoadingSpinner from '../LoadingSpinner'
import DropDown from '../Dropdown'
import {
  createKitRunner,
  updateKitRunner,
} from '@/services/gunplaKits/kit.service'
import useCustomRouter from '@/hooks/useCustomRouter'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const schema = yup.object({
  code: yup.string().required('runner:runner.form.code_error'),
  color: yup.string().required('runner:runner.form.color_error'),
  qty: yup.number().required('runner:runner.form.qty_error'),
  numberOfPieces: yup.number(),
})

type Data = yup.Asserts<typeof schema>

const RunnerForm = memo(
  ({ kitId, runner }: { kitId: string; runner?: Runner }) => {
    const queryClient = useQueryClient()
    const method = useForm({
      defaultValues: {
        code: runner?.code ?? '',
        color:
          typeof runner?.color !== 'string' ? (runner?.color?._id ?? '') : '',
        qty: runner?.qty ?? 1,
        numberOfPieces: 1,
      },
      resolver: yupResolver(schema),
    })

    const { data, isLoading } = useQuery({
      queryKey: ['colors'],
      queryFn: () => getColors(),
    })

    const { t } = useTranslation(['common', 'runner'])

    const { goTo } = useCustomRouter()

    const { mutate: addRunner } = useMutation({
      mutationFn: (data: Data) => createKitRunner(data, kitId),
      onSuccess: (data) => {
        toast(t('save-success'), { position: 'bottom-center' })
        method.reset()
        queryClient.refetchQueries({
          queryKey: ['kits', data.kit._id, 'runners'],
        })
      },
    })
    const { mutate: updateRunner } = useMutation({
      mutationFn: (data: Data) =>
        updateKitRunner(data, kitId, runner?._id ?? ''),
      onSuccess: (data) => {
        method.reset()
        queryClient.refetchQueries({
          queryKey: ['kits', data.kit._id, 'runners'],
        })
        toast(t('save-success'), { position: 'bottom-center' })
        goTo(`/gunpla-kits/kits/${data.kit._id}`)
      },
    })

    const onSubmit = useCallback(
      (data: Data) => {
        runner ? updateRunner(data) : addRunner(data)
      },
      [runner],
    )

    if (isLoading) return <LoadingSpinner />

    return (
      <div className="flex flex-col gap-4">
        <FormProvider {...method}>
          <Controller
            control={method.control}
            name="code"
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <TextInput
                name={name}
                id={name}
                onChange={onChange}
                value={value}
                errorMessage={t(error?.message ?? '')}
                label={t('runner:runner.form.code_label')}
                placeholder={t('runner:runner.form.code_ph')}
              />
            )}
          />
          <Controller
            name="color"
            control={method.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DropDown
                options={(data || []).map((color) => ({
                  label: `${color.name}${color.clearColor ? ` (${t('color:color.clear-color')})` : ''}`,
                  value: color._id,
                }))}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={t('runner:runner.form.color_ph')}
                label={t('runner:runner.form.runner_label')}
                errorMessage={t(error?.message ?? '')}
              />
            )}
          />
          <Controller
            control={method.control}
            name="qty"
            render={({
              field: { name, onChange, value },
              fieldState: { error },
            }) => (
              <TextInput
                type="number"
                name={name}
                id={name}
                onChange={onChange}
                value={value}
                errorMessage={t(error?.message ?? '')}
                label={t('runner:runner.form.qty_label')}
                placeholder={t('runner:runner.form.qty_ph')}
              />
            )}
          />

          <Button isBlock onClick={method.handleSubmit(onSubmit)}>
            {t('common:save')}
          </Button>
        </FormProvider>
      </div>
    )
  },
)

export default RunnerForm
