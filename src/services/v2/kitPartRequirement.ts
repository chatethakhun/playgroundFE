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

export default {
  getAllKitPartRequirements,
  getAllKitPartRequirementsQuery,
  getKitPartRequirementById,
}
