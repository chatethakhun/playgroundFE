import Button from '@/components/ui/Button'
import DropDown from '@/components/ui/Dropdown'
import PageContainer from '@/components/ui/PageContainer'
import TextInput from '@/components/ui/TextInput'
import { GUNPLA_GRADE } from '@/constant/gunplaKits'
import useCustomRouter from '@/hooks/useCustomRouter'
import { createKit } from '@/services/gunplaKits/kit.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
export const Route = createFileRoute('/_authenticated/gunpla-kits/kits/new')({
  component: RouteComponent,
})

const schema = yup.object({
  name: yup.string().required(),
  grade: yup.string().required().oneOf(GUNPLA_GRADE),
})

type Data = yup.Asserts<typeof schema>

function RouteComponent() {
  const { goTo } = useCustomRouter()
  const method = useForm({
    defaultValues: {
      name: '',
      grade: 'MG',
    },
    resolver: yupResolver(schema),
  })

  const { mutate: addKit } = useMutation({
    mutationFn: (data: Data) => createKit(data),
    onSuccess: () => {
      goTo('/gunpla-kits/kits')
    },
  })

  const onSubmit = useCallback(
    (data: Data) => {
      addKit(data)
    },
    [addKit],
  )
  return (
    <PageContainer>
      <FormProvider {...method}>
        <Controller
          control={method.control}
          name="name"
          render={({
            field: { onChange, value, onBlur, name },
            fieldState: { error },
          }) => (
            <TextInput
              id={name}
              label="Gunpla Kit Name"
              name={name}
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              errorMessage={error?.message || ''}
              required
            />
          )}
        />

        <Controller
          control={method.control}
          name="grade"
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <DropDown
              id={name}
              name={name}
              onChange={(e) => onChange(e.target.value)}
              options={GUNPLA_GRADE.map((g) => ({
                value: g,
                label: g,
              }))}
              value={value}
              errorMessage={error?.message}
            />
          )}
        />

        <Button isBlock onClick={method.handleSubmit(onSubmit)}>
          Save
        </Button>
      </FormProvider>
    </PageContainer>
  )
}
