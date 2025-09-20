import { memo, useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  createKitPart,
  getKitRunners,
  getKitSubassemblies,
  updateKitPart,
} from '@/services/gunplaKits/kit.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import LoadingSpinner from '../LoadingSpinner'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form'

import DropDown from '../Dropdown'
import Button from '../Button'
import { Trash } from 'lucide-react'
import useCustomRouter from '@/hooks/useCustomRouter'
import TagInput from '../TagInput'
import { convertStringArrayToNumberArray, sortNumberArray } from '@/utils/array'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const sortedRequires = (
  requires: { runner: string; gate?: number[] | undefined }[],
) => requires.sort((a, b) => a.runner.localeCompare(b.runner))

const schema = Yup.object().shape({
  subassembly: Yup.string().required('part:part.form.subassembly_error'),
  kit: Yup.string().required('part:part.form.kit_error'),
  requires: Yup.array()
    .of(
      Yup.object().shape({
        runner: Yup.string().required('part:part.form.runner_error'),
        gate: Yup.array()
          .of(Yup.number().required('part:part.form.gate_error'))
          .min(1, 'part:part.form.gate_error'),
      }),
    )
    .min(1, 'part:part.form.requires_error'),
})

type KitPartFormData = Yup.Asserts<typeof schema>

const KitPartForm = memo(
  ({
    kitId,
    part,
  }: {
    kitId: string
    subAssemblyId?: string
    part?: KitPart
  }) => {
    const { goTo } = useCustomRouter()
    const queryClient = useQueryClient()
    const { data: kitSubAssembly, isLoading: isLoadingSubAssembly } = useQuery({
      queryKey: ['kit', kitId, 'subAssembly'],
      queryFn: () => getKitSubassemblies(kitId, true),
      enabled: !!kitId,
    })

    const { t } = useTranslation(['common', 'part'])

    const { data: runners, isLoading: isLoadingRunners } = useQuery({
      queryFn: () => getKitRunners(kitId),
      enabled: !!kitId,
      queryKey: ['kit', kitId, 'runners'],
    })

    const requies = useMemo(() => {
      if (!part)
        return [
          {
            gate: [],
            runner: '',
          },
        ]

      return part.requires.map((req) => ({
        gate: req.gate.split(','),
        runner: req.runner._id,
      }))
    }, [part?.requires])

    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        subassembly: part?.subassembly._id || '',
        kit: kitId,
        requires: requies.map((r) => ({
          runner: r.runner,
          gate: convertStringArrayToNumberArray(r.gate),
        })),
      },
    })

    const { fields, append, remove } = useFieldArray({
      control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
      name: 'requires', // unique name for your Field Array
    })

    const { mutate: addKitPart } = useMutation({
      mutationFn: (data: KitPartFormData) =>
        createKitPart({
          ...data,
          requires: sortedRequires(data.requires || []).map((req) => ({
            runner: req.runner,
            gate: sortNumberArray(req.gate || []).join(', '),
          })),
        }),
      onSuccess: () => {
        toast(t('save-success'), { position: 'bottom-center' })
        form.reset()
      },
    })

    const { mutate: editKitPart } = useMutation({
      mutationFn: (data: KitPartFormData) =>
        updateKitPart(
          {
            ...data,
            requires: sortedRequires(data.requires || []).map((req) => ({
              runner: req.runner,
              gate: sortNumberArray(req.gate || []).join(', '),
            })),
            isCut: part?.isCut || false,
          },
          part?._id!,
        ),
      onSuccess: () => {
        toast(t('save-success'), { position: 'bottom-center' })
        queryClient.refetchQueries({
          queryKey: ['kit', kitId, 'parts'],
        })
      },
    })

    const onSubmit = useCallback(
      (data: KitPartFormData) => {
        !part ? addKitPart(data) : editKitPart(data)
      },
      [part],
    )

    if (isLoadingSubAssembly || isLoadingRunners) return <LoadingSpinner />
    return (
      <div className="flex flex-col gap-4">
        <FormProvider {...form}>
          {!part && (
            <Controller
              control={form.control}
              name="subassembly"
              render={({ field, fieldState }) => (
                <DropDown
                  options={(kitSubAssembly || []).map((kit) => ({
                    label: kit.name,
                    value: kit._id,
                  }))}
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value}
                  errorMessage={t(fieldState.error?.message ?? '')}
                  label={t('part:part.form.subassembly_label')}
                  placeholder={t('part:part.form.subassembly_ph')}
                />
              )}
            />
          )}

          <div className="flex ">
            <div className="border-b border-primary flex-grow">
              <h1 className="font-bold text-primary text-lg ">
                {t('part:part.form.runner_title')}
              </h1>
            </div>
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex md:flex-row gap-4 flex-col">
              <div className="flex-grow ">
                <Controller
                  name={`requires.${index}.runner`}
                  control={form.control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <DropDown
                      options={(runners || []).map((runner) => ({
                        label: runner.code,
                        value: runner._id,
                      }))}
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      errorMessage={t(fieldState.error?.message ?? '')}
                      label={t('part:part.form.runner_label')}
                      placeholder={t('part:part.form.runner_ph')}
                    />
                  )}
                />
              </div>

              <div className="basis-1/2">
                <Controller
                  key={index}
                  name={`requires.${index}.gate`}
                  control={form.control}
                  render={({
                    field: { onChange, value, name },
                    fieldState,
                  }) => (
                    <TagInput
                      type="number"
                      tags={(value || []).map((t) => t.toString())}
                      handleTag={(tags) => onChange(tags.map((t) => t))}
                      label={t('part:part.form.gate_label')}
                      id={name}
                      name={name}
                      errorMessage={t(fieldState.error?.message ?? '')}
                      placeholder={t('part:part.form.gate_ph')}
                    />
                  )}
                />
              </div>
              {fields.length > 1 && (
                <div className="flex items-end">
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => {
                      remove(index)
                    }}
                  >
                    <Trash className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          ))}

          <Button
            onClick={() => {
              append({
                runner: '',
                gate: [],
              })
            }}
            secondary
          >
            {t('part:part.form.add_part')}
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>
            {t('common:save')}
          </Button>
        </FormProvider>
        <Button
          secondary
          onClick={() => goTo(`/gunpla-kits/kits/${kitId}?tab=part`)}
        >
          {t('common:back')}
        </Button>
      </div>
    )
  },
)

export default KitPartForm
