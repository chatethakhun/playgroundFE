import { useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import PageContainer from '@/components/ui/PageContainer'
import IconButton from '@/components/ui/IconButton'
import useCustomRouter from '@/hooks/useCustomRouter'
import TextInput from '@/components/ui/TextInput'
import Button from '@/components/ui/Button'
import authService from '@/services/v2/auth.service'
import useAuth from '@/hooks/useAuth'
import { ChevronLeft as IoIosArrowBack } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const loginSchema = yup.object({
  username: yup.string().required('form.username_require'),

  password: yup
    .string()
    .required('form.password_require')
    .min(6, 'form.password_min'),
})

type FormValues = yup.InferType<typeof loginSchema>

export const Route = createFileRoute('/_public/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { goTo } = useCustomRouter()
  const { login: loginUser } = useAuth()
  const { t } = useTranslation('login')

  // Access the client
  const mutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => authService.login({ username, password }),
    onSuccess: (_) => {
      loginUser()
    },
    onError: (error) => {
      console.error(`error from login ${error}`)
      alert(error)
    },
  })
  const method = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  const { handleSubmit, control } = method

  const onSumbit = useCallback((formValue: FormValues) => {
    const { username, password } = formValue

    mutation.mutate({ username, password })
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
          name="username"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              id="username"
              type="email"
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              id="password"
              placeholder={t('form.password_ph')}
              type="password"
              errorMessage={t(error?.message || '')}
              onChange={(evt) => onChange(evt.currentTarget.value)}
              value={value}
            />
          )}
        />

        <Button onClick={handleSubmit(onSumbit)} disabled={mutation.isPending}>
          {mutation.isPending ? t('form.loading') : t('form.submit')}
        </Button>
      </FormProvider>

      <div className="flex justify-center items-center mt-auto gap-2">
        <p>{t('dont_have_acc')}</p>
        <p
          className="text-primary cursor-pointer"
          onClick={() => goTo('/signup')}
        >
          {t('sign_up')}
        </p>
      </div>
    </PageContainer>
  )
}
