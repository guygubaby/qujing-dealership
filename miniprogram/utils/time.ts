import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

export const time = {
  format(date: Date | Dayjs | null | undefined | number | string, fmt = 'YYYY-MM-DD HH:mm:ss') {
    if (!date)
      return ''

    return dayjs(date).format(fmt)
  },
  formatDate(date: Date | Dayjs | null | undefined | number | string) {
    return this.format(date, 'YYYY-MM-DD')
  },
  formatWithEnter(date: Date | Dayjs | null | undefined | number | string) {
    return this.format(date, 'YYYY-MM-DD\nHH:mm:ss')
  },
}
