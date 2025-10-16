import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import DropDown from '../Dropdown'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import runnerService from '@/services/v2/runner.service'
import Button from '../Button'
import TagInput from '../TagInput'

const schema = yup.object().shape({
  requirements: yup.array().of(
    yup.object().shape({
      runner_id: yup.string().required('form.runner_required'),
      gates: yup
        .array()
        .of(yup.string().required())
        .min(1, 'form.gate_required'),
    }),
  ),
})

type FormData = yup.Asserts<typeof schema>

const toOption = (runner: RunnerV2) => ({
  value: String(runner.id),
  label: runner.name,
})
const RequirementForm = ({ kitId }: { kitId: number }) => {
  const { t } = useTranslation('part')

  const { data } = useQuery({
    queryFn: () => runnerService.getKitRunners(kitId),
    queryKey: ['kits', kitId, 'runners'],
    enabled: !!kitId,
  })

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      requirements: [
        {
          gates: [],
          runner_id: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'requirements',
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }
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

          <Button isBlock secondary type="button" onClick={() => remove(index)}>
            {t('part.form.remove_part')}
          </Button>
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
          })
        }
      >
        {t('part.form.add_part')}
      </Button>
      <Button isBlock type="submit" onClick={form.handleSubmit(onSubmit)}>
        {t('common:save')}
      </Button>
    </div>
  )
}

export default RequirementForm
