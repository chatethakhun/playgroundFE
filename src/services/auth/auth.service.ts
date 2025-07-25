import axios from 'axios'

export const login = async (email: string, password: string) => {
  try {
    console.log({ env: import.meta.env })
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        email,
        password,
      },
    )
    return data
  } catch (error) {
    console.log(error)
  }
}
