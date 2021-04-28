const phrases = {
  morning: {
    starting: 'Tenha um bom dia!',
    startingWorking: 'Vamos começar, tenha um bom dia de trabalho',
    ending: 'A manhã está acabando, espero que tenha sido produtiva'
  },
  lunch: {
    starting: 'Tenha um ótimo almoço!',
    startingWorking: 'Trabalhando em horário de almoço?',
    ending: 'Almoço acabando, estava gostoso?'
  },
  afternoon: {
    starting: 'Tenha uma ótima tarde!',
    startingWorking:
      'Começou o trabalho atrasado? Ainda da tempo de correr atrás',
    ending: 'Dia de trabalho chegando ao fim'
  },
  night: {
    starting: 'Tenha uma ótima noite!',
    startingWorking: 'Dia puxado? Vamos trabalhar',
    ending: 'Bons sonhos!'
  },
  daybreak: {
    starting: 'Tenha uma ótima madrugada!',
    startingWorking: 'Mais produtivo de madrugada?',
    ending: 'O dia está amanhecendo'
  }
}

const makePhrases = (
  period: string,
  status: number,
  hour: number,
  minute: number
): string => {
  if (!period) return ''

  const auxPeriod = period.toLowerCase()
  if (auxPeriod === 'bom dia') {
    if (hour === 11) return phrases.morning.ending
    else if (status === 1) return phrases.morning.startingWorking
    else return phrases.morning.starting
  } else if (auxPeriod === 'bom almoço') {
    if (hour === 13 && minute >= 40) return phrases.lunch.ending
    else if (status === 1) return phrases.lunch.startingWorking
    else return phrases.lunch.starting
  } else if (auxPeriod === 'boa tarde') {
    if (hour === 17) return phrases.afternoon.ending
    else if (status === 1) return phrases.afternoon.startingWorking
    else return phrases.afternoon.starting
  } else if (auxPeriod === 'boa noite') {
    if (hour === 12 && minute >= 40) return phrases.night.ending
    else if (status === 1) return phrases.night.startingWorking
    else return phrases.night.starting
  } else if (auxPeriod === 'boa madruga') {
    if (hour === 4) return phrases.daybreak.ending
    else if (status === 1) return phrases.daybreak.startingWorking
    else return phrases.daybreak.starting
  }
}

export default makePhrases
