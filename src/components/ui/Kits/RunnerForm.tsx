import { memo, useCallback } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextInput from '../TextInput'
import Button from '../Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import LoadingSpinner from '../LoadingSpinner'
import DropDown from '../Dropdown'

import useCustomRouter from '@/hooks/useCustomRouter'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import runnerService from '@/services/v2/runner.service'
import colorService from '@/services/v2/color.service'

const schema = yup.object({
  code: yup.string().required('runner:runner.form.code_error'),
  color: yup.number().required('runner:runner.form.color_error'),
  qty: yup.number().required('runner:runner.form.qty_error'),
})

type Data = yup.Asserts<typeof schema>

const RunnerForm = memo(
  ({ kitId, runner }: { kitId: string; runner?: RunnerV2 }) => {
    const queryClient = useQueryClient()
    const method = useForm({
      defaultValues: {
        code: runner?.name ?? '',
        color: runner?.color_id ?? 0,
        qty: runner?.amount ?? 1,
      },
      resolver: yupResolver(schema),
    })

    const { data, isLoading } = useQuery({
      queryKey: ['colors'],
      queryFn: () => colorService.getAllColors(),
    })

    const { t } = useTranslation(['common', 'runner'])

    const { goTo } = useCustomRouter()

    const { mutate: addRunner } = useMutation({
      mutationFn: (data: Data) =>
        runnerService.createKitRunner({
          amount: data.qty,
          color_id: data.color,
          kit_id: Number(kitId),
          name: data.code,
        }),
      onSuccess: (data) => {
        if (!data) return
        toast(t('save-success'), { position: 'bottom-center' })
        method.reset()
        queryClient.refetchQueries({
          queryKey: ['kits', data.kit_id, 'runners'],
        })
      },
    })
    const { mutate: updateRunner } = useMutation({
      mutationFn: (data: Data) => {
        if (!runner?.id) throw new Error('Missing runner id')
        return runnerService.updateKitRunner(runner?.id, {
          ...data,
          color_id: data.color,
          name: data.code,
          amount: data.qty,
          kit_id: Number(kitId),
        })
      },
      onSuccess: (data) => {
        if (!data) return
        toast(t('save-success'), { position: 'bottom-center' })
        method.reset()

        queryClient.setQueryData<Array<RunnerV2>>(
          ['kits', data.kit_id, 'runners'],
          (oldData) => {
            if (!oldData) return oldData

            const target = oldData.find((r) => r.id === data.id)
            if (!target) return oldData

            return oldData.map((r) => {
              if (r.id === data.id) {
                return {
                  ...r,
                  name: data.name,
                  color_id: data.color_id,
                  amount: data.amount,
                }
              }
              return r
            })
          },
        )
        // queryClient.refetchQueries({
        //   queryKey: ['kits', data.kit._id, 'runners'],
        // })
        // toast(t('save-success'), { position: 'bottom-center' })
        goTo(`/gunpla-kits/kits/${data.kit_id}`)
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
                  label: `${color.name}${color.is_clear ? ` (${t('color:color.clear-color')})` : ''}`,
                  value: color.id,
                }))}
                value={String(value)}
                onChange={onChange}
                placeholder={t('runner:runner.form.color_ph')}
                label={t('runner:runner.form.runner_label')}
                errorMessage={t(error?.message ?? '')}
                disabled={data?.length === 0}
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
                value={String(value)}
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
