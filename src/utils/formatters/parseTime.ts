export interface Time {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

const parseTime = (time: number): Time => {
  const date = new Date(time)
  const hours = date.getHours() + date.getTimezoneOffset() / 60 - 24
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
