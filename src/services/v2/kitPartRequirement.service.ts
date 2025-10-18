import axiosInstanceV2 from './apiBase'
const getAllKitPartRequirements = async (
  kitPartId: number,
): Promise<Array<KitRequirementWithRunnerAndColor>> => {
  try {
    const response = await axiosInstanceV2.get(
      `kit_parts/${kitPartId}/requirements_with_runners_and_color`,
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
    const response = await axiosInstanceV2.post(`/requirements/bulk`, {
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
    const response = await axiosInstanceV2.patch(`/requirements/bulk`, {
      kit_part_id,
      items: requirements,
    })
    return response.data
  } catch (error) {
    console.error('Error updating kit part requirements:', error)
    return []
  }
}

const requirementCompareSync = async (
  kit_part_id: number,
  requirement: Array<CompareSyncPayload>,
) => {
  try {
    const { data } = await axiosInstanceV2.patch<Array<KitPartRequirement>>(
      `/requirements/compare_sync`,
      {
        kit_part_id,
        items: requirement,
      },
    )

    return data
  } catch (error) {
    console.error('Error comparing kit part requirements:', error)
    return []
  }
}

export default {
  getAllKitPartRequirements,
  getAllKitPartRequirementsQuery,
  getKitPartRequirementById,
  bulkCreateKitPartRequirements,
  bulkUpdateKitPartRequirements,
  requirementCompareSync,
}
