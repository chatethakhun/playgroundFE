interface SteamPricing {
  id: unique id
  app_id: unique id
  name: string
  steam_db_url: string
  is_buy: boolean
  user_id: number
  created_at: string
  updated_at: string
}

interface Steam {
  app_id: unique id
  currency: string
  discount: number
  image: string
  name: string
  price: number
}
