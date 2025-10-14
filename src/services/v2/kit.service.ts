import axiosInstanceV2 from './apiBase'

const getAllKits = async (status?: KitStatus): Promise<Array<KitV2>> => {
  try {
    const params = status ? { status } : {}
    const response = await axiosInstanceV2.get<Array<KitV2>>('/kits', {
      params,
    })
    return response.data
  } catch (err) {
    console.error('Error fetching kits:', err)
    return [] // หรือ return [] ถ้าต้องการ fallback
  }
}

const getAllKitQuery = (status: KitStatus) => ({
  queryFn: () => getAllKits(status ?? 'in_progress'),
  queryKey: ['kits', status],
})

export default {
  getAllKits,
  getAllKitQuery,
}
