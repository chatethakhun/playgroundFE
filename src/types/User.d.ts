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

interface UserV2 {
  username: string
  id: string
  full_name: string
  bio: string
  avatar_url: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}
