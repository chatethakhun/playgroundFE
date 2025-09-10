import { formatDuration } from '@/utils/date'
import { useEffect, useMemo, useState } from 'react'

/** คืนค่า duration (ms) จาก startedAt/endedAt ถ้าไม่มี endedAt จะนับต่อเนื่องแบบสด */
export function useElapsedDuration(
  startedAt?: string | Date,
  endedAt?: string | Date,
) {
  const start = useMemo(
    () => (startedAt ? new Date(startedAt) : null),
    [startedAt],
  )
  const end = useMemo(() => (endedAt ? new Date(endedAt) : null), [endedAt])

  const initial = useMemo(() => {
    if (!start) return 0
    const stop = end ?? new Date()
    return Math.max(0, stop.getTime() - start.getTime())
  }, [start, end])

  const [elapsed, setElapsed] = useState(initial)

  useEffect(() => {
    if (!start) return
    if (end) {
      // จบ session แล้ว → คงค่าคงที่
      setElapsed(initial)
      return
    }
    setElapsed(initial) // รีเซ็ตตอน start เปลี่ยน
    const id = setInterval(() => {
      setElapsed(Date.now() - start.getTime())
    }, 1000) // อัปเดตทุก 1 วินาที
    return () => clearInterval(id)
  }, [start, end, initial])

  return formatDuration(elapsed) // หน่วยเป็นมิลลิวินาที
}
