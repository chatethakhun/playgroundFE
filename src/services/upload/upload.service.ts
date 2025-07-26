import axios from 'axios'

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post<{ url: string }>(
      `${import.meta.env.VITE_API_URL}/api/file/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return response.data.url
  } catch (error) {
    console.error(error)
    throw new Error('Error uploading file')
  }
}
