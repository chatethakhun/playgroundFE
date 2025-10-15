interface Piece {
  gage: string
  label: string
}

interface Runner {
  _id: string
  color: Color | string
  kit: Kit
  code: string
  qty: number
  pieces: Array<Piece>
  isCut: boolean
}

interface RunnerV2 {
  name: string
  kit_id: number
  color_id: number
  id: number
  amount: number
}
interface CreateKitRunnerPayload {
  color_id: number
  kit_id: number
  amount: number
  name: string
}

interface UpdateKitRunnerPayload {
  id: number
  name: string
  kit_id: string
  color_id: string
  is_used: boolean
}

interface UpdateIsUsedPayload {
  is_used: boolean
}

interface RunnerColor {
  name: string
  kit_id: string
  is_used: boolean
  color: ColorV2
  id: number
  amount: number
}
