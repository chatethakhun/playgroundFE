import axios from 'axios'

const getNotifications = async () => {
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

const markReadNotification = async (notificationId: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/notification/mark-read/${notificationId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}
export { getNotifications, markReadNotification }
