import axiosInstanceV2 from '../v2/apiBase'

const getGameByAppId = async (appId: string) => {
  try {
    const { data } = await axiosInstanceV2.get(`/steam/${appId}`)
    return data
  } catch {
    return null
  }
}

export class SteamPriceService {
  static getPrice(appId: string) {
    return getGameByAppId(appId)
  }
}
