import axiosInstanceV2 from './apiBase'

const getAllColors = async () => {
  try {
    const response = await axiosInstanceV2.get<Array<ColorV2>>('/colors')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getAllColorQuery = () => ({
  queryKey: ['colors'],
  queryFn: getAllColors,
})

export { getAllColors, getAllColorQuery }
