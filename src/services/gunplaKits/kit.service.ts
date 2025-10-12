import { toSnakeCase } from '@/utils/string'
import axiosInstance from '../apiBase'

export const createKit = async (data: Partial<Kit>) => {
  try {
    return (await axiosInstance.post<Kit>('/kits', data)).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getKits = async ({ isFinished = false }) => {
  try {
    const url = isFinished ? '/kits?isFinished=true' : '/kits'
    return (await axiosInstance.get<Array<Kit>>(url)).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getKitsQuery = (isFinished = false) => ({
  queryKey: ['kits', isFinished],
  queryFn: () => getKits({ isFinished }),
})

export const getKit = async (id: string) => {
  try {
    return (await axiosInstance.get<Kit>(`/kits/${id}`)).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getKitQuery = (kitId: string) => ({
  queryKey: ['kits', kitId],
  queryFn: () => getKit(kitId),
})

export const getKitRunners = async (id: string) => {
  try {
    return (await axiosInstance.get<Array<Runner>>(`/kits/${id}/runner`)).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateIsFinished = async (id: string, isFinished: boolean) => {
  try {
    return (
      await axiosInstance.put<Kit>(`/kits/${id}/is-finished`, { isFinished })
    ).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createKitRunner = async (data: Partial<Runner>, kitId: string) => {
  try {
    return (await axiosInstance.post<Runner>(`/kits/${kitId}/runner`, data))
      .data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getKitRunner = async (kitId: string, runnerId: string) => {
  try {
    return (
      await axiosInstance.get<Runner>(`/kits/${kitId}/runner/${runnerId}`)
    ).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateKitRunner = async (
  data: Partial<Runner>,
  kitId: string,
  runnerId: string,
) => {
  try {
    return (
      await axiosInstance.put<Runner>(`/kits/${kitId}/runner/${runnerId}`, data)
    ).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteKitRunner = async (kitId: string, runnerId: string) => {
  try {
    return (await axiosInstance.delete(`/kits/${kitId}/runner/${runnerId}`))
      .data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getKitSubassemblies = async (
  kitId: string,
  usedInPart = false,
) => {
  try {
    const params = new URLSearchParams()
    params.append('notUsedInPart', usedInPart.toString())
    return (
      await axiosInstance.get<Array<KitSubassembly>>(
        `/kits/${kitId}/subassembly?${params.toString()}`,
      )
    ).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createKitSubassembly = async (
  data: Partial<KitSubassembly>,
  kitId: string,
) => {
  try {
    return (
      await axiosInstance.post<KitSubassembly>(`/kits/${kitId}/subassembly`, {
        ...data,
        key: toSnakeCase(data.name || ''),
      })
    ).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getKitParts = async (kitId: string) => {
  try {
    return (await axiosInstance.get<Array<KitPart>>(`/kits/${kitId}/parts`))
      .data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createKitPart = async (data: {
  subassembly: string
  kit: string
  requires: {
    runner: string
    gate: string
  }[]
}) => {
  try {
    return (await axiosInstance.post<KitPart>(`/parts`, data)).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getKitPart = async (partId: string) => {
  try {
    return (await axiosInstance.get<KitPart>(`/parts/${partId}`)).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateKitPart = async (
  data: {
    subassembly: string
    kit: string
    requires: {
      runner: string
      gate: string
    }[]
    isCut: boolean
  },
  partId: string,
) => {
  try {
    return (await axiosInstance.put<KitPart>(`/parts/${partId}`, data)).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateCutInRequires = async (
  partId: string,
  runnerId: string,
  isCut = false,
) => {
  try {
    return (
      await axiosInstance.put<KitPart>(
        `/parts/${partId}/require/${runnerId}/cut`,
        { isCut },
      )
    ).data
  } catch (error) {
    console.error(error)
    throw error
  }
}
