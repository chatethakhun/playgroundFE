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
  kit_id: string
  color_id: string
  id: string
}
interface CreateKitRunnerPayload {
  color_id: string
  kit_id: string
  amount: number
  name: string
}
