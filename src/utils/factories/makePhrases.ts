import { Greetings } from '../../models/enums'

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
  period: Greetings,
  status: boolean,
  hour: number,
  minute: number
): string => {
  if (!period) return ''

  if (period === Greetings.morning) {
    if (hour === 11) return phrases.morning.ending
    else if (status) return phrases.morning.startingWorking
    else return phrases.morning.starting
  } else if (period === Greetings.lunch) {
    if (hour === 13 && minute >= 40) return phrases.lunch.ending
    else if (status) return phrases.lunch.startingWorking
    else return phrases.lunch.starting
  } else if (period === Greetings.afternoon) {
    if (hour === 17) return phrases.afternoon.ending
    else if (status) return phrases.afternoon.startingWorking
    else return phrases.afternoon.starting
  } else if (period === Greetings.night) {
    if (hour === 12 && minute >= 40) return phrases.night.ending
    else if (status) return phrases.night.startingWorking
    else return phrases.night.starting
  } else if (period === Greetings.daybreak) {
    if (hour === 4) return phrases.daybreak.ending
    else if (status) return phrases.daybreak.startingWorking
    else return phrases.daybreak.starting
  }
}

export default makePhrases
