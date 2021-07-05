import { Greetings } from '../../models/enums'

const makeGreetings = (hour: number, minute: number): Greetings => {
  if (hour >= 0 && minute >= 0 && hour < 5 && minute < 60)
    return Greetings.daybreak
  if (
    hour >= 5 &&
    minute >= 0 &&
    ((hour < 11 && minute < 60) || (hour < 12 && minute < 30))
  )
    return Greetings.morning
  if (
    (hour >= 11 && minute >= 30 && hour < 12 && minute < 60) ||
    (hour >= 12 && minute >= 0 && hour >= 12 && hour < 14)
  )
    return Greetings.lunch
  if (hour >= 13 && hour < 18 && minute < 60) return Greetings.afternoon
  if (hour >= 18 && hour < 24 && minute < 60) return Greetings.night
}

export default makeGreetings
