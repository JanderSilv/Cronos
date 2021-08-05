export interface Time {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

const makeHours = (date: Date) => {
  const hours = date.getHours() + date.getTimezoneOffset() / 60 - 24
  if (hours < 0) {
    return hours + 24
  }
  return hours
}

const parseTime = (time: number): Time => {
  const date = new Date(time)
  const hours = makeHours(date)
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  return {
    hours,
    minutes,
    seconds,
    milliseconds
  }
}

export default parseTime
