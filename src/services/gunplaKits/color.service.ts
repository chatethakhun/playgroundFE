import axiosInstance from '../apiBase'

export const createColor = (data: Partial<Color>) => {
  try {
    return axiosInstance.post<Color>('/colors', data)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getColors = async () => {
  try {
    return (await axiosInstance.get<Array<Color>>('/colors')).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getColorsQuery = () => ({
  queryKey: ['colors'],
  queryFn: () => getColors(),
})

export const getColor = async (id: string) => {
  try {
    return (await axiosInstance.get<Color>(`/colors/${id}`)).data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateColor = async (id: string, data: Partial<Color>) => {
  try {
    return (await axiosInstance.put<Color>(`/colors/${id}`, data)).data
  } catch (error) {
    console.error(error)
    throw error
  }
}
