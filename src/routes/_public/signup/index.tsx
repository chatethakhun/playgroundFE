import { createFileRoute } from '@tanstack/react-router'
import { IoIosArrowBack } from 'react-icons/io'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useCallback } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import IconButton from '@/components/ui/IconButton'
import PageContainer from '@/components/ui/PageContainer'
import useCustomRouter from '@/hooks/useCustomRouter'
import TextInput from '@/components/ui/TextInput'
import Button from '@/components/ui/Button'
import { signup } from '@/services/auth/auth.service'

const signupSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Minimun 6 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

type FormValues = yup.InferType<typeof signupSchema>

export const Route = createFileRoute('/_public/signup/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { goTo } = useCustomRouter()
  const signUpMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      goTo('/chatapp')
    },
    onError: (err) => {
      console.log(err)
      alert('Something went wrong')
    },
  })
  const method = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signupSchema),
  })
  const { handleSubmit, control } = method
  const onSubmit = useCallback((data: FormValues) => {
    signUpMutation.mutate({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    })
  }, [])
  return (
    <PageContainer>
      <IconButton onClick={() => goTo('/')}>
        <IoIosArrowBack className="text-2xl" />
      </IconButton>

      <h1 className="text-3xl font-bold">Hello! Register to get started</h1>

      <FormProvider {...method}>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              id="fullName"
              type="text"
              placeholder="Full Name"
              errorMessage={error?.message || ''}
              onChange={(evt) => onChange(evt.currentTarget.value)}
              value={value}
            />
          )}
        />
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
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              id="confirmPassword"
              placeholder="confirm password"
              type="password"
              errorMessage={error?.message || ''}
              onChange={(evt) => onChange(evt.currentTarget.value)}
              value={value}
            />
          )}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={signUpMutation.isPending}
        >
          {signUpMutation.isPending ? 'Signing up...' : 'Sign up'}
        </Button>
      </FormProvider>

      <div className="flex justify-center items-center mt-auto gap-2">
        <p>Already have an account?</p>
        <p
          className="text-primary cursor-pointer"
          onClick={() => goTo('/login')}
        >
          Log in Now
        </p>
      </div>
    </PageContainer>
  )
}
