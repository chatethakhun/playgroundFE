import axiosInstanceV2 from './apiBase'

const getAllKits = async () => {
  try {
    const response = await axiosInstanceV2.get<Array<KitV2>>('/kits')
    return response.data
  } catch (err) {}
}

const getAllKitQuery = () => ({
  queryFn: () => getAllKits(),
  queryKey: ['kits'],
})

export default {
  getAllKits,
  getAllKitQuery,
}
