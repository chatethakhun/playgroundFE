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
