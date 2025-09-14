interface Piece {
  gage: string
  label: string
}

interface Runner {
  _id: string
  name: string
  color: Color
  kit: string
  code: string
  qty: number
  pieces: Array<Piece>
}
