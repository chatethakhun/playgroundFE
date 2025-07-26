import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useRef, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useMutation } from '@tanstack/react-query'

import PageContainer from '@/components/ui/PageContainer'
import Avatar from '@/components/ui/Avatar'
import TextInput from '@/components/ui/TextInput'
import TextAreaInput from '@/components/ui/TextAreaInput'
import Button from '@/components/ui/Button'

import { uploadFile } from '@/services/upload/upload.service'

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
  const [avatar, setAvatar] = useState('')
  const method = useForm({
    defaultValues: {
      fullName: '',
      avatar: '',
    },
    resolver: yupResolver(profileSchema),
  })
  const { handleSubmit, control } = method

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (url) => {
      console.log({ url })
      setAvatar(url)
    },
  })

  const onChangeUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length === 0 || uploadMutation.isPending) return
      const file = (e.target.files || [])[0]

      // limit file size to 1MB
      if (file.size > 1024 * 1024) {
        alert('File size must be less than 1MB')
        return
      }
      console.log(file)
      uploadMutation.mutate(file)
    },
    [uploadMutation],
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
            if (inputFile.current && !uploadMutation.isPending) {
              inputFile.current.click()
            }
          }}
        >
          <Avatar size={128} alt="profile" src={avatar} />
          {uploadMutation.isPending && (
            <AiOutlineLoading3Quarters className="text-primary absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center animate-spin" />
          )}
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
