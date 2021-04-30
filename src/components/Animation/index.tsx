import Lottie from 'react-lottie'
import {
  LunchAnimation,
  NightAnimation,
  SunAnimation,
  WorkingAnimation
} from '../../../public/assets/animations'

interface Props {
  period: string
  status: boolean
}

const Animation = ({ period, status }: Props): JSX.Element => {
  const chooseAnimation = () => {
    if (status) return WorkingAnimation
    switch (period.toLowerCase()) {
      case 'bom dia':
      case 'boa tarde':
        return SunAnimation
      case 'boa madrugada':
      case 'boa noite':
        return NightAnimation
      case 'bom almoço':
        return LunchAnimation
    }
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: chooseAnimation(),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return <Lottie options={defaultOptions} width={100} />
}

export default Animation
