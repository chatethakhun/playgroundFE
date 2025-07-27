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

export const getMe = async () => {
  try {
    const response = await axios.get<{ user: User; token: string }>(
      `${import.meta.env.VITE_API_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      },
    )

    if (response.status !== 200) {
      throw new Error('Invalid credentials')
    }

    return response.data
  } catch (error) {
    console.log(`Error from getMe service: ${error}`)
    throw error
  }
}

export const updateProfile = async ({
  fullName,
  bio,
  avatar,
}: {
  fullName: string
  bio: string
  avatar?: string
}) => {
  const payload = {
    fullName,
    bio,
    avatar,
  }
  try {
    console.log({ token: localStorage.getItem('token') })
    const response = await axios.put<{ user: User }>(
      `${import.meta.env.VITE_API_URL}/api/auth/update-profile`,
      payload,
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      },
    )

    if (response.status !== 200) {
      throw new Error('Invalid credentials')
    }

    return response.data.user
  } catch (error) {
    console.log(`Error from updateProfile service: ${error}`)
    throw error
  }
}
