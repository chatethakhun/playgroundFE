import kitSubassemblyService from '@/services/v2/kitSubassembly.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import DropDown from '../Dropdown'
import Button from '../Button'

import { useTranslation } from 'react-i18next'
import kitPartService from '@/services/v2/kitPart.service'

const schema = yup.object({
  kit_id: yup.string().required(),
  sub_assembly_id: yup.string().required(),
})
interface KitPartRequirementFormProps {
  kitId: number
}

const toOption = (subassembly: KitSubassemblyV2) => ({
  value: subassembly.id,
  label: subassembly.name,
})

type FormData = yup.Asserts<typeof schema>
const KitPartForm = ({ kitId }: KitPartRequirementFormProps) => {
  const { data } = useQuery({
    queryKey: ['kit', Number(kitId), 'subassemblies'],
    queryFn: () =>
      kitSubassemblyService.getAllKitSubassemblies(kitId.toString()),
  })

  const { mutate: createReq } = useMutation({
    mutationFn: (data: FormData) =>
      kitPartService.createKitPart({
        kit_id: Number(data.kit_id),
        sub_assembly_id: Number(data.sub_assembly_id),
      }),
  })
  const { t } = useTranslation(['common', 'part'])
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sub_assembly_id: '',
      kit_id: kitId.toString(),
    },
  })

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
              options={(data ?? []).map(toOption)}
              value={value}
              onChange={onChange}
              required
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
