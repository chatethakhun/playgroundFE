import axios from 'axios'

export const getUsers = async () => {
  try {
    const response = await axios.get<{
      users: Array<User>
      unseenMessages: Record<string, number>
    }>(`${import.meta.env.VITE_API_URL}/api/users/all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    })

    return response.data
  } catch (error) {
    console.error(error)
  }
}
