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

export default { getAllColors, getAllColorQuery, createColor, deleteColor }
