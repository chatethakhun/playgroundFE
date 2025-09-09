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
import { login } from '@/services/auth/auth.service'
import useAuth from '@/hooks/useAuth'
import { ChevronLeft as IoIosArrowBack } from 'lucide-react'

const loginSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Minimun 6 characters'),
})

type FormValues = yup.InferType<typeof loginSchema>

export const Route = createFileRoute('/_public/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { goTo } = useCustomRouter()
  const { login: loginUser } = useAuth()
  // Access the client
  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      loginUser({ user: data.user, token: data.token })
    },
    onError: (error) => {
      console.error(`error from login ${error}`)
      alert(error)
    },
  })
  const method = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  const { handleSubmit, control } = method

  const onSumbit = useCallback((formValue: FormValues) => {
    const { email, password } = formValue

    mutation.mutate({ email, password })
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

        <Button onClick={handleSubmit(onSumbit)} disabled={mutation.isPending}>
          {mutation.isPending ? 'Loading...' : 'Login'}
        </Button>
      </FormProvider>

      <div className="flex justify-center items-center mt-auto gap-2">
        <p>Don’t have an account?</p>
        <p
          className="text-primary cursor-pointer"
          onClick={() => goTo('/signup')}
        >
          Sign up
        </p>
      </div>
    </PageContainer>
  )
}
