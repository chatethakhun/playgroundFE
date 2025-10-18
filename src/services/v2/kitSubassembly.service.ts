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

const createKitSubassembly = async (
  kitId: string,
  kitSubassembly: Omit<KitSubassemblyV2, 'id' | 'created_at' | 'updated_at'>,
): Promise<KitSubassemblyV2 | null> => {
  try {
    const response = await axiosInstanceV2.post(`/sub_assemblies`, {
      ...kitSubassembly,
      kit_id: Number(kitId),
    })
    return response.data
  } catch (error) {
    console.error('Error creating kit subassembly:', error)
    return null
  }
}

export default {
  getAllKitSubassemblies,
  createKitSubassembly,
}
