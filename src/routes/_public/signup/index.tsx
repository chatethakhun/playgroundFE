import { createFileRoute } from '@tanstack/react-router'

import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useCallback } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import IconButton from '@/components/ui/IconButton'
import PageContainer from '@/components/ui/PageContainer'
import useCustomRouter from '@/hooks/useCustomRouter'
import TextInput from '@/components/ui/TextInput'
import Button from '@/components/ui/Button'

import authService from '@/services/v2/auth.service'
import { ChevronLeft as IoIosArrowBack } from 'lucide-react'
const signupSchema = yup.object({
  fullName: yup.string().required('form.name_require'),
  username: yup.string().required('form.username_require'),
  password: yup
    .string()
    .required('form.password_require')
    .min(6, 'form.password_min'),
  confirmPassword: yup
    .string()
    .required('form.c_password_require')
    .oneOf([yup.ref('password')], 'form.c_password_match'),
})

type FormValues = yup.InferType<typeof signupSchema>

export const Route = createFileRoute('/_public/signup/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { goTo } = useCustomRouter()
  const { t } = useTranslation('register')
  const signUpMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      goTo('/apps')
    },
    onError: (err) => {
      console.log(err)
      alert('Something went wrong')
    },
  })
  const method = useForm({
    defaultValues: {
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signupSchema),
  })
  const { handleSubmit, control } = method
  const onSubmit = useCallback((data: FormValues) => {
    signUpMutation.mutate({
      username: data.username,
      password: data.password,
    })
  }, [])
  return (
    <PageContainer>
      <IconButton onClick={() => goTo('/')}>
        <IoIosArrowBack className="text-2xl" />
      </IconButton>

      <h1 className="text-3xl font-bold">{t('title')}</h1>

      <FormProvider {...method}>
        <Controller
          control={control}
          name="fullName"
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <TextInput
              id={name}
              name={name}
              type="text"
              placeholder={t('form.name_ph')}
              errorMessage={t(error?.message || '')}
              onChange={(evt) => onChange(evt.currentTarget.value)}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="username"
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <TextInput
              id={name}
              placeholder={t('form.username_ph')}
              errorMessage={t(error?.message || '')}
              onChange={(evt) => onChange(evt.currentTarget.value)}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <TextInput
              id={name}
              placeholder={t('form.password_ph')}
              type="password"
              errorMessage={t(error?.message || '')}
              onChange={(evt) => onChange(evt.currentTarget.value)}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              id="confirmPassword"
              placeholder={t('form.c_password_ph')}
              type="password"
              errorMessage={t(error?.message || '')}
              onChange={(evt) => onChange(evt.currentTarget.value)}
              value={value}
            />
          )}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={signUpMutation.isPending}
        >
          {signUpMutation.isPending ? t('form.saving') : t('form.save')}
        </Button>
      </FormProvider>

      <div className="flex justify-center items-center mt-auto gap-2">
        <p>{t('form.already_acc')}</p>
        <p
          className="text-primary cursor-pointer"
          onClick={() => goTo('/login')}
        >
          {t('form.to_login')}
        </p>
      </div>
    </PageContainer>
  )
}
