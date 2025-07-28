interface AppNotification {
  _id: string
  userId: string
  message: string
  createdAt?: string
  updatedAt?: string
  read: boolean
}
