import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useRef } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import PageContainer from '@/components/ui/PageContainer'
import Avatar from '@/components/ui/Avatar'
import TextInput from '@/components/ui/TextInput'
import TextAreaInput from '@/components/ui/TextAreaInput'
import Button from '@/components/ui/Button'

const profileSchema = yup.object({
  fullName: yup.string().required('Full Name is required'),
  avatar: yup.string().required('Avatar is required'),
  bio: yup.string().optional(),
})

type FormData = yup.InferType<typeof profileSchema>
export const Route = createFileRoute('/_authenticated/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const inputFile = useRef<HTMLInputElement>(null)
  const method = useForm({
    defaultValues: {
      fullName: '',
      avatar: '',
    },
    resolver: yupResolver(profileSchema),
  })
  const { handleSubmit, control } = method

  const onChangeUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length === 0) return
      const file = (e.target.files || [])[0]

      console.log(e.target.files)
    },
    [],
  )

  const onSubmit = useCallback((data: FormData) => {
    console.log(data)
  }, [])

  return (
    <PageContainer noPadding>
      <div className="flex justify-center items-center-safe h-[30%] relative ">
        <div
          className="w-[128px] h-[128px] relative"
          onClick={() => {
            if (inputFile.current) {
              inputFile.current.click()
            }
          }}
        >
          <Avatar size={128} alt="profile" />
          <input
            ref={inputFile}
            type="file"
            className="hidden"
            onChange={onChangeUpload}
          />
        </div>
      </div>

      <div className="bg-primary h-full px-8 py-10 rounded-t-3xl flex flex-col gap-3">
        <TextInput id="Email" placeholder="Email" value={''} disabled />
        <FormProvider {...method}>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput
                id="fullName"
                placeholder="Full name"
                onChange={(evt) => onChange(evt.target.value)}
                value={value}
                errorMessage={error?.message || ''}
              />
            )}
          />

          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextAreaInput
                id="bio"
                placeholder="Bio"
                onChange={(evt) => onChange(evt.target.value)}
                value={value}
                errorMessage={error?.message || ''}
              />
            )}
          />

          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </FormProvider>
      </div>
    </PageContainer>
  )
}
