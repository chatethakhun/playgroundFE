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

export const getColorQuery = (id: string) => ({
  queryKey: ['colors', id],
  queryFn: () => getColor(id),
})

export const updateColor = async (id: string, data: Partial<Color>) => {
  try {
    const { data: newData } = await axiosInstance.put<Color>(
      `/colors/${id}`,
      data,
    )

    return newData
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteColor = async (id: string) => {
  try {
    await axiosInstance.delete<Color>(`/colors/${id}`)
    return id
  } catch (error) {
    console.error(error)
    throw error
  }
}
