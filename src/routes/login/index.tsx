import { useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { IoIosArrowBack } from 'react-icons/io'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import PageContainer from '@/components/ui/PageContainer'
import IconButton from '@/components/ui/IconButton'
import useCustomRouter from '@/hooks/useCustomRouter'
import TextInput from '@/components/ui/TextInput'
import Button from '@/components/ui/Button'
import { login } from '@/services/auth/auth.service'

const loginSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Minimun 6 characters'),
})

type FormValues = yup.InferType<typeof loginSchema>

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { goTo } = useCustomRouter()

  const method = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  const { handleSubmit, control } = method

  const onSumbit = useCallback(async (formValue: FormValues) => {
    const { email, password } = formValue
    try {
      const { data } = await login(email, password)
      console.log({ data })
    } catch (error) {
      console.error(`error from login ${error}`)
    }
  }, [])
  return (
    <PageContainer>
      <IconButton onClick={() => goTo('/')}>
        <IoIosArrowBack className="text-2xl" />
      </IconButton>

      <h1 className="text-3xl font-bold">
        Welcome back! Glad to see you, Again!
      </h1>

      <FormProvider {...method}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              id="email"
              type="email"
              placeholder="Email"
              errorMessage={error?.message || ''}
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
              placeholder="password"
              type="password"
              errorMessage={error?.message || ''}
              onChange={(evt) => onChange(evt.currentTarget.value)}
              value={value}
            />
          )}
        />

        <Button onClick={handleSubmit(onSumbit)}>Login</Button>
      </FormProvider>
    </PageContainer>
  )
}
