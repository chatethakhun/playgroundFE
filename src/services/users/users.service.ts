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
