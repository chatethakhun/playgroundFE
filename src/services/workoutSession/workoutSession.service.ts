import axios from 'axios'

export const createWorkoutSession = async ({
  title,
  focus,
}: {
  title: string
  focus?: string
}) => {
  try {
    const { data } = await axios.post<{
      workoutSession: WorkoutSession
    }>(
      `${import.meta.env.VITE_API_URL}/api/workout-session/start`,
      { title, focus },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      },
    )

    return data.workoutSession
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getListWorkoutSession = async ({
  isCompleted,
}: {
  isCompleted?: boolean
}) => {
  const url = new URL(
    `${import.meta.env.VITE_API_URL}/api/workout-session/list`,
  )

  if (isCompleted) {
    url.searchParams.append('isCompleted', 'true')
  }
  try {
    const { data } = await axios.get<{
      workoutSessions: Array<WorkoutSession>
    }>(url.href, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    })

    return data.workoutSessions
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getWorkoutSession = async (id: string) => {
  try {
    const response = await axios.get<{
      data: {
        _id: string
        focus: string
        startedAt: string
        title: string
        userId: string
      }
    }>(`${import.meta.env.VITE_API_URL}/api/workout-session/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    })

    return response.data.data
  } catch (error) {
    console.error(error)
  }
}
