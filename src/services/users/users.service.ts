import axiosInstance from '../apiBase'

export const getUsers = async () => {
  try {
    return (await axiosInstance.get<Array<User>>('/users')).data
  } catch (error) {
    console.error(error)
  }
}

export const getUsersQuery = () => {
  return {
    queryKey: ['users'],
    queryFn: getUsers,
  }
}

export const getUser = async (id: string) => {
  try {
    return (await axiosInstance.get<User>(`/users/${id}`)).data
  } catch (error) {
    console.error(error)
  }
}

export const getUserQuery = (id: string) => {
  return {
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  }
}

export const changePassword = async (data: {
  password: string
  userId: string
}) => {
  try {
    return (await axiosInstance.put<User>('/users/change-password', data)).data
  } catch (error) {
    console.error(error)
  }
}
