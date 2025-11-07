import axiosInstanceV2 from '../v2/apiBase'

const getGames = {
  queryKey: ['steam/games'],
  queryFn: async () => {
    try {
      const { data } = await axiosInstanceV2.get<Array<SteamPricing>>('/steam')
      return data
    } catch {
      return null
    }
  },
}

const getGameByAppId = (appId: string) => ({
  queryKey: ['steam/games', appId],
  queryFn: async () => {
    try {
      const { data } = await axiosInstanceV2.get<Steam>(`/steam/${appId}`)
      return data
    } catch {
      return null
    }
  },
})

export class SteamPriceService {
  static getPrice(appId: string) {
    return getGameByAppId(appId)
  }

  static getAllGamesWatchList() {
    return getGames
  }
}
