interface Kit {
  _id: string
  name: string
  grade: string
  runners: Array<Runner>
  isFinished: boolean
}

interface KitV2 {
  id: string
  name: string
  grade: string
  runners: Array<Runner>
  is_finished: boolean
}
