interface LoginPayload {
  username: string
  password: string
}

interface LoginResponse {
  token: string
}

interface RegisterPayload {
  username: string
  password: string
}

interface RegisterResponse {
  token: string
}
