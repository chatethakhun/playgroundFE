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

export default { getAllKitParts }
