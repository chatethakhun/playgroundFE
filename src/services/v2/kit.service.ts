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

const getAllKitQuery = (status?: KitStatus) => ({
  queryFn: () => getAllKits(status),
  queryKey: ['kits', status],
})

const getKitById = async (id: string): Promise<KitV2 | null> => {
  try {
    const response = await axiosInstanceV2.get<KitV2>(`/kits/${id}`)
    return response.data
  } catch (err) {
    console.error('Error fetching kit:', err)
    return null // หรือ return null ถ้าต้องการ fallback
  }
}

const getKitByIdQuery = (id: string) => ({
  queryFn: () => getKitById(id),
  queryKey: ['kit', id],
})

const createKit = async (data: Partial<KitV2>): Promise<Partial<KitV2>> => {
  const response = await axiosInstanceV2.post<Partial<KitV2>>('/kits', {
    ...data,
    grade: data.grade?.toLowerCase(),
  })

  return response.data
}

const updateKitStatus = async (
  id: string,
  status: KitStatus,
): Promise<KitV2> => {
  const response = await axiosInstanceV2.patch<KitV2>(`/kits/${id}/status`, {
    status,
  })

  return response.data
}

export default {
  getAllKits,
  getAllKitQuery,
  getKitById,
  getKitByIdQuery,
  createKit,
  updateKitStatus,
}
