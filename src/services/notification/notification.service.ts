import axios from 'axios'

export const getNotifications = async () => {
  try {
    const response = await axios<{ notifications: Array<AppNotification> }>(
      `${import.meta.env.VITE_API_URL}/api/notification`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      },
    )
    const data = response.data.notifications
    return data
  } catch (error) {
    console.error(error)
  }
}
