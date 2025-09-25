import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextInput from '../../TextInput'
import Button from '../../Button'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { changePassword } from '@/services/users/users.service'
import useCustomRouter from '@/hooks/useCustomRouter'
import { toast } from 'react-toastify'
const schema = yup.object({
  password: yup.string().required('dashboard.user.form.password_required'),
})

type FormData = yup.InferType<typeof schema>
const ChangePasswordForm = ({ userId }: { userId: string }) => {
  const { t } = useTranslation('dashboard')
  const { goTo } = useCustomRouter()

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => changePassword({ ...data, userId }),
    onSuccess: () => {
      toast.success(t('dashboard.user.form.change_password_success'))
      goTo('/dashboard/users')
    },
  })
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = useCallback((data: FormData) => {
    mutate(data)
  }, [])
  return (
    <FormProvider {...form}>
      <Controller
        control={form.control}
        name="password"
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <TextInput
            type="password"
            id={name}
            name={name}
            errorMessage={t(error?.message ?? '')}
            onChange={onChange}
            value={value}
            label={t('dashboard.user.form.change_password_label')}
            placeholder={t('dashboard.user.form.change_password_placeholder')}
          />
        )}
      />

      <Button onClick={form.handleSubmit(onSubmit)}>
        {t('dashboard.user.form.change_password_button')}
      </Button>
    </FormProvider>
  )
}

export default ChangePasswordForm
