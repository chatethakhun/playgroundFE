import axiosInstanceV2 from './apiBase'

const getAllKitParts = async (kitId: string): Promise<Array<KitPartV2>> => {
  try {
    const response = await axiosInstanceV2.get(`/kits/${kitId}/kit_parts`)
    return response.data
  } catch (error) {
    console.error('Error fetching kit part:', error)
    return []
  }
}

const createKitPart = async (
  data: Omit<
    KitPartV2,
    | 'id'
    | 'updated_at'
    | 'created_at'
    | 'code'
    | 'is_cut'
    | 'user_id'
    | 'requirements'
  >,
) => {
  try {
    const response = await axiosInstanceV2.post<KitPartV2>(`/kit_parts`, data)
    return response.data
  } catch (error) {
    console.error('Error creating kit part:', error)
    return null
  }
}

const updateIsCut = async (
  id: number,
  isCut: boolean,
): Promise<KitPartV2 | null> => {
  try {
    const response = await axiosInstanceV2.patch(`/kit_parts/${id}/is_cut`, {
      is_cut: isCut,
    })
    return response.data
  } catch (error) {
    console.error('Error updating kit part:', error)
    return null
  }
}

const getKitPartById = async (id: number): Promise<KitPartV2 | null> => {
  try {
    const response = await axiosInstanceV2.get(`/kit_parts/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching kit part:', error)
    return null
  }
}

const getKitPartByIdQuery = (id: number, kitId: number) => ({
  queryFn: () => getKitPartById(id),
  queryKey: ['kits', kitId, 'kitPart', id],
})

const deleteKitPart = async (id: number) => {
  try {
    const response = await axiosInstanceV2.delete(`/kit_parts/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting kit part:', error)
    return null
  }
}

// const updateCutInRequires = async (
//   id: string,
//   runnerId: string,
//   isCut: boolean,
// ) => {
//   try {
//     const response = await axiosInstanceV2.patch(
//       `/kit_parts/${id}/requires/${runnerId}`,
//       {
//         isCut,
//

export default {
  getAllKitParts,
  createKitPart,
  updateIsCut,
  getKitPartById,
  getKitPartByIdQuery,
  deleteKitPart,
}
