import axiosInstance from '../apiBase'

export const getListWorkout = async () => {
  try {
    const { data } = await axiosInstance.get<{
      workouts: Array<Workout>
    }>('/workouts/list')


    return data.workouts
  } catch (error) {
    throw error
  }
}

export const createWorkout = async (workout: Partial<Workout>) => {
  try {
    const { data } = await axiosInstance.post('/workouts/create', workout)


    return data
  } catch (error) {
    throw error
  }
}

export const deleteWorkout = async (workoutId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/workouts/${workoutId}`)

    return data
  } catch (error) {
    throw error
  }
}

export const getSingleWorkout = async (workoutId: string) => {
  try {
    const { data } = await axiosInstance.get<{
      workout: Workout
    }>(`/workouts/${workoutId}`)


    return data.workout
  } catch (error) {
    throw error
  }
}

export const updateWorkout = async (
  workoutId: string,
  workout: Partial<Workout>,
) => {
  try {
    const { data } = await axiosInstance.put(`/workouts/${workoutId}`, workout)

    return data
  } catch (error) {
    throw error
  }
}
