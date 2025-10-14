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
  try {
    const response = await axiosInstanceV2.post('/colors', {
      ...data,
      code: data.hex,
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default { getAllColors, getAllColorQuery, createColor }
