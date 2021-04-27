const makeGreetings = (hour: number, minute: number) => {
  if (hour >= 0 && minute >= 0 && hour < 5 && minute < 60)
    return 'Boa Madrugada'
  if (
    hour >= 5 &&
    minute >= 0 &&
    ((hour < 11 && minute < 60) || (hour < 12 && minute < 30))
  )
    return 'Bom dia'
  if (
    (hour >= 11 && minute >= 30 && hour < 12 && minute < 60) ||
    (hour >= 12 && minute >= 0 && hour >= 12 && hour < 14)
  )
    return 'Bom almoço'
  if (hour >= 13 && hour < 18 && hour < 18 && minute < 60) return 'Boa tarde'
  if (hour >= 18 && hour < 24 && minute < 60) return 'Boa noite'
}

export default makeGreetings
