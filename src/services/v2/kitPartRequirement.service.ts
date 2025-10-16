import axiosInstanceV2 from './apiBase'
const getAllKitPartRequirements = async (
  kitPartId: number,
): Promise<Array<KitPartRequirement>> => {
  try {
    const response = await axiosInstanceV2.get(
      `kit_parts/${kitPartId}/requirements`,
    )
    return response.data
  } catch (error) {
    console.error('Error fetching kit part requirements:', error)
    return []
  }
}

const getAllKitPartRequirementsQuery = (kitPartId: number, kitId: number) => ({
  queryFn: () => getAllKitPartRequirements(kitPartId),
  queryKey: ['kits', kitId, 'kit_parts', kitPartId, 'requirements'],
})

const getKitPartRequirementById = async (
  id: number,
): Promise<KitPartRequirement | null> => {
  try {
    const response = await axiosInstanceV2.get(`/kit_part_requirements/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching kit part requirement:', error)
    return null
  }
}

const bulkCreateKitPartRequirements = async (
  kit_part_id: number,
  requirements: Array<Omit<KitPartRequirement, 'id' | 'user_id'>>,
) => {
  try {
    const response = await axiosInstanceV2.post(`kit_parts/requirements/bulk`, {
      kit_part_id,
      items: requirements,
    })
    return response.data
  } catch (error) {
    console.error('Error creating kit part requirements:', error)
    return []
  }
}
const bulkUpdateKitPartRequirements = async (
  kit_part_id: number,
  requirements: Array<BulkUpdateKitPartRequirement>,
) => {
  try {
    const response = await axiosInstanceV2.patch(
      `kit_parts/requirements/bulk`,
      {
        kit_part_id,
        items: requirements,
      },
    )
    return response.data
  } catch (error) {
    console.error('Error updating kit part requirements:', error)
    return []
  }
}

export default {
  getAllKitPartRequirements,
  getAllKitPartRequirementsQuery,
  getKitPartRequirementById,
  bulkCreateKitPartRequirements,
  bulkUpdateKitPartRequirements,
}
