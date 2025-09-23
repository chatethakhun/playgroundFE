import { toSnakeCase } from '@/utils/string'
import axiosInstance from '../apiBase'

const generateColorCode = (name: string) => {
  const newName = `${name}_clear`
  const code = toSnakeCase(newName)
  return code.length > 0 ? code : undefined
}

export const createColorCode = (name?: string) => {
  if (!name) return undefined
  const code = generateColorCode(name)
  return code
}

export const createColor = (data: Partial<Color>) => {
  try {
    return axiosInstance.post<Color>('/colors', {
      ...data,
      code: createColorCode(data.name),
    })
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
    const { data: newData } = await axiosInstance.put<Color>(`/colors/${id}`, {
      ...data,
      code: createColorCode(data.name),
    })

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
