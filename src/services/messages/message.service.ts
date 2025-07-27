import axios from 'axios'

export const getMessageByUserId = async (userId: string) => {
  try {
    const response = await axios<{ messages: Array<Message> }>(
      `${import.meta.env.VITE_API_URL}/api/message/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      },
    )
    const data = response.data.messages
    return data
  } catch (error) {
    console.error(error)
  }
}

export const sendMessage = async (message: Message, userId: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/message/send/${userId}`,
      message,
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
