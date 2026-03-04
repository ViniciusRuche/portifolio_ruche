import dayjs from 'dayjs'

export const formatDate = (date) => {
  try {
    return dayjs(date).format('DD/MM/YYYY')
  } catch {
    return null
  }
}
