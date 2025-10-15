import axiosInstanceV2 from './apiBase'

const getKitPart = async (kitId: string): Promise<Array<KitPart>> => {
  try {
    const response = await axiosInstanceV2.get(`/kits/${kitId}/kit_parts`)
    return response.data
  } catch (error) {
    console.error('Error fetching kit part:', error)
    return []
  }
}

export default { getKitPart }
