import axiosInstanceV2 from './apiBase'

const getAllKitSubassemblies = async (
  kitId: string,
): Promise<Array<KitSubassemblyV2>> => {
  try {
    const response = await axiosInstanceV2.get(`/kits/${kitId}/sub_assemblies`)
    return response.data
  } catch (error) {
    console.error('Error fetching kit subassemblies:', error)
    return []
  }
}

export default {
  getAllKitSubassemblies,
}
