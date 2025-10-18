enum KitStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}
interface Kit {
  _id: string
  name: string
  grade: string
  runners: Array<Runner>
  isFinished: boolean
}

interface KitV2 {
  id: number
  name: string
  grade: string
  runners: Array<RunnerV2>
  is_finished: boolean
  status: KitStatus
}
