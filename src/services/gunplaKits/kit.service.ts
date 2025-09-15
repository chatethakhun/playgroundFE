import axiosInstance from '../apiBase'

export const createKit = (data: Partial<Kit>) => {
  try {
    return axiosInstance.post<Kit>('/kits', data)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getKits = async () => {
  try {
    return (await axiosInstance.get<Array<Kit>>('/kits')).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getKit = async (id: string) => {
  try {
    return (await axiosInstance.get<Kit>(`/kits/${id}`)).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getKitRunners = async (id: string) => {
  try {
    return (await axiosInstance.get<Array<Runner>>(`/kits/${id}/runner`)).data
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

export const getKitSubassemblies = async (kitId: string) => {
  try {
    return (
      await axiosInstance.get<Array<KitSubassembly>>(
        `/kits/${kitId}/subassembly`,
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
      await axiosInstance.post<KitSubassembly>(
        `/kits/${kitId}/subassembly`,
        data,
      )
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
