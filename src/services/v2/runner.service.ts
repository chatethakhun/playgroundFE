import axiosInstanceV2 from './apiBase'

const getKitRunnerColors = async (kitId: string): Promise<RunnerColor[]> => {
  try {
    const response = await axiosInstanceV2.get(`/kits/${kitId}/runner_colors`)
    return response.data
  } catch (error) {
    console.error('Error fetching kit runners:', error)
    return []
  }
}

const getKitRunners = async (kitId: number): Promise<RunnerV2[]> => {
  try {
    const response = await axiosInstanceV2.get(`/kits/${kitId}/runners`)
    return response.data
  } catch (error) {
    console.error('Error fetching kit runners:', error)
    return []
  }
}

const createKitRunner = async (
  data: CreateKitRunnerPayload,
): Promise<RunnerV2 | null> => {
  try {
    const response = await axiosInstanceV2.post(`/runners`, {
      ...data,
      name: data.name,
      kit_id: Number(data.kit_id),
      color_id: Number(data.color_id),
    })
    return response.data
  } catch (error) {
    console.error('Error creating kit runner:', error)
    return null
  }
}

const updateKitRunner = async (
  runnerId: RunnerV2['id'],
  data: Omit<RunnerV2, 'id' | 'created_at' | 'updated_at' | 'is_used'>,
): Promise<RunnerV2 | null> => {
  try {
    const response = await axiosInstanceV2.patch(`/runners/${runnerId}`, {
      ...data,
      name: data.name,
      kit_id: Number(data.kit_id),
      color_id: Number(data.color_id),
    })
    return response.data
  } catch (error) {
    console.error('Error updating kit runner:', error)
    return null
  }
}

const updateIsUsed = async (
  id: number,
  data: UpdateIsUsedPayload,
): Promise<RunnerV2 | null> => {
  try {
    const response = await axiosInstanceV2.patch(`/runners/${id}/status`, {
      is_used: data.is_used,
    })
    return response.data
  } catch (error) {
    console.error('Error updating kit runner:', error)
    return null
  }
}

const getRunnerById = async (runnerId: number): Promise<RunnerV2 | null> => {
  try {
    const response = await axiosInstanceV2.get(`/runners/${runnerId}  `)
    return response.data
  } catch (error) {
    console.error('Error fetching kit by runner ID:', error)
    return null
  }
}

const getRunnerByIdQuery = (
  kitId: RunnerV2['kit_id'],
  runnerId: RunnerV2['id'],
) => ({
  queryFn: () => getRunnerById(Number(runnerId)),
  queryKey: ['kits', kitId, 'runners', runnerId],
})

export default {
  getKitRunnerColors,
  getRunnerById,
  createKitRunner,
  getRunnerByIdQuery,
  updateKitRunner,
  updateIsUsed,
  getKitRunners,
}
