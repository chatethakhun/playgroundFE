interface Piece {
  gage: string
  label: string
}

interface Runner {
  _id: string
  name: string
  color: Color | string
  kit: Kit
  code: string
  qty: number
  pieces: Array<Piece>
}
