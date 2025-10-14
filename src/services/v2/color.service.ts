import axiosInstanceV2 from './apiBase'

const getAllColors = async () => {
  try {
    const response = await axiosInstanceV2.get<Array<ColorV2>>('/colors')
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getAllColorQuery = () => ({
  queryKey: ['colors'],
  queryFn: getAllColors,
})

const getColorById = async (id: string) => {
  try {
    const response = await axiosInstanceV2.get<ColorV2>(`/colors/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const getColorByIdQuery = (id: string) => ({
  queryKey: ['color', id],
  queryFn: () => getColorById(id),
})

const createColor = async (data: CreateColorPayload) => {
  const response = await axiosInstanceV2.post<ColorV2>('/colors', {
    ...data,
    code: data.hex,
  })

  if (response.status === 201) {
    return response.data
  }

  return null
}

const deleteColor = async (id: string) => {
  const response = await axiosInstanceV2.delete(`/colors/${id}`)

  if (response.status === 204) {
    return id
  }

  return null
}

const updateColor = async (id: ColorV2['id'], data: UpdateColorPayload) => {
  const response = await axiosInstanceV2.patch<ColorV2>(`/colors/${id}`, data)

  if (response.status === 200) {
    return response.data
  }

  return null
}

export default {
  getAllColors,
  getAllColorQuery,
  getColorById,
  getColorByIdQuery,
  createColor,
  deleteColor,
  updateColor,
}
