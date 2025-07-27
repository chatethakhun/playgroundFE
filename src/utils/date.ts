export const dateTimeDayDDMMYYYY = (date: Date) => {
  const weekdayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
  const weekday = weekdayFormat.format(date) // e.g., Mon

  // Format the day, month, and year in Thai Buddhist calendar
  const thaiDateFormat = new Intl.DateTimeFormat('th-TH-u-ca-buddhist', {
    day: '2-digit', // 30
    month: '2-digit', // 08
    year: 'numeric', // 2567 (Buddhist year)
  })
  const thaiDate = thaiDateFormat.format(date)

  return `${weekday} ${thaiDate}`
}

export const dateTimeDDMMYYYY = (date: Date | string) => {
  // Format the day, month, and year in Thai Buddhist calendar
  const thaiDateFormat = new Intl.DateTimeFormat('th-TH-u-ca-buddhist', {
    day: '2-digit', // 30
    month: '2-digit', // 08
    year: 'numeric', // 2567 (Buddhist year)
  })

  if (typeof date === 'string') {
    date = new Date(date)
  }

  const thaiDate = thaiDateFormat.format(date)

  return thaiDate
}

export const formatTimestamp = (time: string | Date): string => {
  const now = new Date()
  const targetTime = new Date(time)
  const diffInSeconds = Math.floor(
    (now.getTime() - targetTime.getTime()) / 1000,
  )

  if (diffInSeconds < 60) {
    return 'Now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = String(targetTime.getHours()).padStart(2, '0')
    const minutes = String(targetTime.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  } else {
    return dateTimeDDMMYYYY(targetTime) // Assuming this returns DD/MM/YYYY
  }
}
