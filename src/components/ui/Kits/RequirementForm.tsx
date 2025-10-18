import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import DropDown from '../Dropdown'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@tanstack/react-query'
import runnerService from '@/services/v2/runner.service'
import Button from '../Button'
import TagInput from '../TagInput'
import kitPartRequirementService from '@/services/v2/kitPartRequirement.service'
import { useCallback } from 'react'
import useCustomRouter from '@/hooks/useCustomRouter'
import { toast } from 'react-toastify'
import { queryClient } from '@/utils/queryClient'

const schema = yup.object().shape({
  requirements: yup.array().of(
    yup.object().shape({
      runner_id: yup.string().required('part.form.runner_error'),
      gates: yup
        .array()
        .of(yup.string().required())
        .min(1, 'part.form.gate_error'),
      kit_part_id: yup.number().required(),
      qty: yup.number().required(),
      requirement_id: yup.number(),
    }),
  ),
})

type FormData = yup.Asserts<typeof schema>

const toOption = (runner: RunnerV2) => ({
  value: String(runner.id),
  label: runner.name,
})

const initialValue = (kitPartId: number, reqs?: Array<KitPartRequirement>) => {
  if (!!reqs && reqs.length > 0) {
    return reqs.map((req) => ({
      runner_id: String(req.runner_id),
      gates: req.gate,
      kit_part_id: req.kit_part_id,
      qty: 1,
      requirement_id: req.id,
    }))
  }
  return [
    {
      gates: [],
      runner_id: '',
      kit_part_id: kitPartId,
      qty: 1,
    },
  ]
}

const toCompareSyncPayload = (req: FormData): Array<CompareSyncPayload> => {
  if (!req.requirements) return []

  return req.requirements.map((r) => ({
    id: Number(r.requirement_id),
    gate: r.gates ?? [],
    qty: Number(r.qty),
    runner_id: Number(r.runner_id),
    kit_part_id: Number(r.kit_part_id),
  }))
}
const RequirementForm = ({
  kitId,
  req,
  kitPartId,
}: {
  kitId: number
  kitPartId: number
  req?: Array<KitPartRequirement>
}) => {
  const { t } = useTranslation('part')

  const { goTo } = useCustomRouter()

  const { data } = useQuery({
    queryFn: () => runnerService.getKitRunners(kitId),
    queryKey: ['kits', kitId, 'runners'],
    enabled: !!kitId,
  })

  const { mutate: compareSync } = useMutation({
    mutationFn: (data: Array<CompareSyncPayload>) =>
      kitPartRequirementService.requirementCompareSync(kitPartId, data),
    onSuccess: (data) => {
      toast.success(t('common.success'))
      queryClient.setQueryData(
        ['kits', kitId, 'kit_parts', kitPartId, 'requirements'],
        data,
      )
    },
  })

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      requirements: initialValue(kitPartId, req),
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'requirements',
  })

  const onSubmit = useCallback((data: FormData) => {
    compareSync(toCompareSyncPayload(data))
    // edit
  }, [])
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-2xl">
        {t('part.form.requirements_label')}
      </h1>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2">
          <Controller
            name={`requirements.${index}.runner_id`}
            control={form.control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DropDown
                options={(data ?? []).map(toOption)}
                label={t('part.form.runner_label')}
                placeholder={t('part.form.runner_ph')}
                value={value}
                onChange={onChange}
                errorMessage={t(error?.message ?? '')}
              />
            )}
          />

          <Controller
            name={`requirements.${index}.gates`}
            control={form.control}
            defaultValue={[]}
            rules={{ required: true }}
            render={({
              field: { value = [], onChange },
              fieldState: { error },
            }) => (
              <TagInput
                type="number"
                tags={value}
                handleTag={onChange}
                label={t('part.form.gate_label')}
                placeholder={t('part.form.gate_ph')}
                errorMessage={t(error?.message ?? '')}
              />
            )}
          />

          {fields.length > 1 && (
            <Button isBlock ghost onClick={() => remove(index)}>
              {t('part.form.remove_part')}
            </Button>
          )}
          <hr />
        </div>
      ))}

      <Button
        isBlock
        secondary
        type="button"
        onClick={() =>
          append({
            runner_id: '',
            gates: [],
            qty: 1,
            kit_part_id: kitPartId,
          })
        }
      >
        {t('part.form.add_part')}
      </Button>
      <Button isBlock type="submit" onClick={form.handleSubmit(onSubmit)}>
        {t('common:save')}
      </Button>
      <Button
        isBlock
        onClick={() => goTo(`/gunpla-kits/kits/${kitId}?tab=part`)}
        ghost
      >
        {t('common:back')}
      </Button>
    </div>
  )
}

export default RequirementForm
