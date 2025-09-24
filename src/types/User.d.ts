interface User {
  _id: string
  email: string
  fullName: string
  avatar: string
  bio: string
  createdAt: string
  updatedAt: string
  role: 'user' | 'admin'
}
