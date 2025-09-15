import { memo, useCallback } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  createKitPart,
  getKitRunners,
  getKitSubassemblies,
} from '@/services/gunplaKits/kit.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../LoadingSpinner'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import TextInput from '../TextInput'
import DropDown from '../Dropdown'
import Button from '../Button'
import { Plus, Trash } from 'lucide-react'
import useCustomRouter from '@/hooks/useCustomRouter'
import TagInput from '../TagInput'

const schema = Yup.object().shape({
  name: Yup.string().required('KitPart name is required'),
  subassembly: Yup.string().required('KitPart subAssemblyId is required'),
  kit: Yup.string().required('KitPart kitId is required'),
  requires: Yup.array()
    .of(
      Yup.object().shape({
        runner: Yup.string().required('Runner is required'),
        gate: Yup.array()
          .of(Yup.string().required('Gate is required'))
          .min(1, 'Gate is required'),
      }),
    )
    .min(1, 'KitPart requires is required'),
})

type KitPartFormData = Yup.Asserts<typeof schema>

const KitPartForm = memo(
  ({ kitId }: { kitId: string; subAssemblyId?: string }) => {
    const { goTo } = useCustomRouter()
    const { data: kitSubAssembly, isLoading: isLoadingSubAssembly } = useQuery({
      queryKey: ['kit', kitId, 'subAssembly'],
      queryFn: () => getKitSubassemblies(kitId),
      enabled: !!kitId,
    })

    const { data: runners, isLoading: isLoadingRunners } = useQuery({
      queryFn: () => getKitRunners(kitId),
      enabled: !!kitId,
      queryKey: ['kit', kitId, 'runners'],
    })

    const form = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        name: '',
        subassembly: '',
        kit: kitId,
        requires: [
          {
            gate: [],
            runner: '',
          },
        ],
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
          requires: (data.requires || []).map((req) => ({
            runner: req.runner,
            gate: (req.gate || []).join(','),
          })),
        }),
      onSuccess: () => {
        form.reset()
      },
    })

    const onSubmit = useCallback((data: KitPartFormData) => {
      addKitPart(data)
    }, [])

    if (isLoadingSubAssembly || isLoadingRunners) return <LoadingSpinner />
    return (
      <div className="flex flex-col gap-4">
        <FormProvider {...form}>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <TextInput
                name={field.name}
                id={field.name}
                label="KitPart name"
                errorMessage={fieldState.error?.message}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />

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
                errorMessage={fieldState.error?.message}
                label="Kit Subassembly"
              />
            )}
          />

          <div className="flex ">
            <div className="border-b border-primary flex-grow">
              <h1 className="font-bold text-primary text-lg ">Kit Runners</h1>
            </div>
            <button
              onClick={() => {
                append({
                  runner: '',
                  gate: [],
                })
              }}
            >
              <Plus className="w-5 h-5 text-primary" />
            </button>
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
                      errorMessage={fieldState.error?.message}
                      label="Kit Runner"
                    />
                  )}
                />
              </div>
              {/*<div className="flex-grow">
                <Controller
                  key={index}
                  name={`requires.${index}.gate`}
                  control={form.control}
                  render={({
                    field: { onChange, value, name },
                    fieldState,
                  }) => (
                    <TextInput
                      name={name}
                      id={name}
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      errorMessage={fieldState.error?.message}
                      label="Kit Runner gate"
                    />
                  )}
                />
              </div>*/}
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
                      tags={value || []}
                      handleTag={(tags) => onChange(tags.map((t) => t))}
                      label="Gates"
                      id={name}
                      name={name}
                      errorMessage={fieldState.error?.message}
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

          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </FormProvider>
        <Button secondary onClick={() => goTo(`/gunpla-kits/kits/${kitId}`)}>
          Back
        </Button>
      </div>
    )
  },
)

export default KitPartForm
