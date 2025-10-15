import axiosInstanceV2 from './apiBase'

const getKitRunners = async (kitId: string): Promise<Runner[]> => {
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

export default {
  getKitRunners,
  createKitRunner,
}
