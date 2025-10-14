enum KitStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  done = 'done',
}
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
  status: KitStatus
}
