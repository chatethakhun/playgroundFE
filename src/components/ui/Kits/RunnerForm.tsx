import { memo, useCallback } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextInput from '../TextInput'
import Button from '../Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getColors } from '@/services/gunplaKits/color.service'
import LoadingSpinner from '../LoadingSpinner'
import DropDown from '../Dropdown'
import { createKitRunner } from '@/services/gunplaKits/kit.service'

const schema = yup.object({
  code: yup.string().required(),
  color: yup.string().required(),
  qty: yup.number().required(),
  numberOfPieces: yup.number().required(),
})

type Data = yup.Asserts<typeof schema>

const RunnerForm = memo(({ kitId }: { kitId: string }) => {
  const queryClient = useQueryClient()
  const method = useForm({
    defaultValues: {
      code: '',
      color: '',
      qty: 1,
      numberOfPieces: 1,
    },
    resolver: yupResolver(schema),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['colors'],
    queryFn: () => getColors(),
  })

  const { mutate: addRunner } = useMutation({
    mutationFn: (data: Data) => createKitRunner(data, kitId),
    onSuccess: (data) => {
      console.log(data)
      method.reset()
      queryClient.refetchQueries({
        queryKey: ['kits', data.kit._id, 'runners'],
      })
    },
  })

  const onSubmit = useCallback((data: Data) => {
    addRunner(data)
  }, [])

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
              errorMessage={error?.message}
              label="Runner Code"
              placeholder="etc. A1, A2"
            />
          )}
        />
        <Controller
          name="color"
          control={method.control}
          render={({ field: { onChange, value } }) => (
            <DropDown
              options={(data || []).map((color) => ({
                label: color.name,
                value: color._id,
              }))}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Choose color"
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
              value={value}
              errorMessage={error?.message}
              label="QTY"
              placeholder="etc. 4"
            />
          )}
        />
        <Controller
          control={method.control}
          name="numberOfPieces"
          render={({
            field: { name, onChange, value },
            fieldState: { error },
          }) => (
            <TextInput
              type="number"
              name={name}
              id={name}
              onChange={onChange}
              value={value}
              errorMessage={error?.message}
              label="Number of Pieces"
              placeholder="etc. 3"
            />
          )}
        />
        <br />
        <Button isBlock onClick={method.handleSubmit(onSubmit)}>
          Submit
        </Button>
      </FormProvider>
    </div>
  )
})

export default RunnerForm
