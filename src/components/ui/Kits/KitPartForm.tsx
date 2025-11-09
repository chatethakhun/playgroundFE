import kitSubassemblyService from '@/services/v2/kitSubassembly.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import DropDown from '../Dropdown'
import Button from '../Button'

import { useTranslation } from 'react-i18next'
import kitPartService from '@/services/v2/kitPart.service'
import { queryClient } from '@/utils/queryClient'
import { useMemo } from 'react'

const schema = yup.object({
  kit_id: yup.string().required(),
  sub_assembly_id: yup.string().required(),
})
interface KitPartRequirementFormProps {
  kitId: number
  kitPartIds: Array<KitPartV2['id']>
}

const toOption = (subassembly: KitSubassemblyV2 & { disabled: boolean }) => ({
  value: subassembly.id,
  label: subassembly.name,
  disabled: subassembly.disabled,
})

type FormData = yup.Asserts<typeof schema>
const KitPartForm = ({ kitId, kitPartIds }: KitPartRequirementFormProps) => {
  const { data } = useQuery({
    queryKey: ['kit', Number(kitId), 'subassemblies'],
    queryFn: async () => {
      const data = await kitSubassemblyService.getAllKitSubassemblies(
        kitId.toString(),
      )
      return data
    },
  })

  const { mutate: createReq } = useMutation({
    mutationFn: (data: FormData) =>
      kitPartService.createKitPart({
        kit_id: Number(data.kit_id),
        sub_assembly_id: Number(data.sub_assembly_id),
      }),

    onSuccess: (newData) => {
      if (!newData) return
      queryClient.setQueryData<Array<KitPartV2>>(
        ['kits', Number(kitId), 'kit_parts'],
        (oldData) => {
          if (!oldData) return oldData
          return oldData.concat({
            ...newData,
            sub_assembly: (data ?? []).find(
              (sub) => parseInt(sub.id) === newData.sub_assembly_id,
            ),
            requirements: [],
          })
        },
      )

      // disable subassembly
      queryClient.setQueryData<Array<KitSubassemblyV2>>(
        ['kit', Number(kitId), 'subassemblies'],
        (oldData) => {
          if (!oldData) return oldData
          return oldData.map((sub) => {
            if (Number(sub.id) === newData.sub_assembly_id) {
              return {
                ...sub,
                disabled: true,
              }
            }
            return sub
          })
        },
      )

      form.reset()
    },
    onError: () => {
      form.reset()
    },
  })
  const { t } = useTranslation(['common', 'part'])
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sub_assembly_id: '',
      kit_id: kitId.toString(),
    },
  })

  const filteredSubassemblies = useMemo(() => {
    if (!data) return []
    // add disabled and sorted disabled to last
    return data
      .map((sub) => ({
        ...sub,
        disabled: kitPartIds.includes(parseInt(sub.id)),
      }))
      .sort((a, b) => {
        if (a.disabled === b.disabled) {
          return 0
        }
        return a.disabled ? 1 : -1
      })
  }, [data, kitPartIds])

  const onSubmit = (data: FormData) => {
    createReq(data)
  }

  return (
    <div className="space-y-2">
      <FormProvider {...form}>
        <Controller
          control={form.control}
          name="sub_assembly_id"
          render={({ field: { value, onChange } }) => (
            <DropDown
              label={t('part:part.form.subassembly_label')}
              options={(filteredSubassemblies ?? []).map(toOption)}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Button onClick={form.handleSubmit(onSubmit)} isBlock>
          {t('common:save')}
        </Button>
      </FormProvider>
    </div>
  )
}

export default KitPartForm
