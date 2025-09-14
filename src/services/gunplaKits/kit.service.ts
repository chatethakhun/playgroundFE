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

export const updateKitRunner = async (id: string, data: Partial<Runner>) => {
  try {
    return (await axiosInstance.put<Runner>(`/kits/runner/${id}`, data)).data
  } catch (error) {
    console.error(error)
    throw error
  }
}
