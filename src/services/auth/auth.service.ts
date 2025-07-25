import axios from 'axios'

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post<{ user: User; token: string }>(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        email,
        password,
      },
    )

    if (response.status !== 200) {
      throw new Error('Invalid credentials')
    }

    localStorage.setItem('token', response.data.token)

    const data = response.data
    return data
  } catch (error) {
    console.log(`Error from login service: ${error}`)
    throw error
  }
}

export const signup = async ({
  fullName,
  email,
  password,
}: {
  fullName: string
  email: string
  password: string
}) => {
  try {
    const response = await axios.post<{ user: User; token: string }>(
      `${import.meta.env.VITE_API_URL}/api/auth/signup`,
      {
        fullName,
        email,
        password,
      },
    )
    if (response.status !== 201) {
      throw new Error('Invalid credentials')
    }

    localStorage.setItem('token', response.data.token)
    const data = response.data
    return data
  } catch (error) {
    console.log(`Error from signup service: ${error}`)
    throw error
  }
}
