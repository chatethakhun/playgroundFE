import axiosInstanceV2 from '@/services/v2/apiBase'

const login = async (data: LoginPayload) => {
  try {
    const response = await axiosInstanceV2.post<LoginResponse>(
      '/auth/login',
      data,
    )

    localStorage.setItem('v2Token', response.data.token)

    return response.data.token
  } catch {
    throw new Error('การเข้าสู่ระบบล้มเหลว')
  }
}

export default { login }
