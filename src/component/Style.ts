import { StyleProps, TransitionRulesType } from './Type'

const getTransition = ({ delay, duration }: StyleProps) => {
    return `${duration || 300}ms ${delay || 0}ms`
}

const generateStyle = (rules: TransitionRulesType) => {
    return {
        ...rules,
        msTransform: rules.transform,
        WebkitTransform: rules.transform,
    }
}

export const styles = (props: StyleProps) => {
    switch (props.style) {
        case 'fadeUp-exit':
            return generateStyle({
                opacity: 0,
                transform: 'translate3d(0, 10px, 0)',
                transition: `opacity ${getTransition(props)}, transform ${getTransition(props)}`,
            })

        case 'fadeUp-enter':
            return generateStyle({
                opacity: 1,
                transform: 'translate3d(0, 0, 0)',
                transition: `opacity ${getTransition(props)}, transform ${getTransition(props)}`,
            })

        case 'fadeDown-exit':
            return generateStyle({
                opacity: 0,
                transform: 'translate3d(0, -10px, 0)',
                transition: `opacity ${getTransition(props)}, transform ${getTransition(props)}`,
            })

        case 'fadeDown-enter':
            return generateStyle({
                opacity: 1,
                transform: 'translate3d(0, 0, 0)',
                transition: `opacity ${getTransition(props)}, transform ${getTransition(props)}`,
            })

        case 'fadeIn-exit':
            return generateStyle({
                opacity: 0,
                transform: 'scale3d(0.95, 0.95, 0.95)',
                transition: `opacity ${getTransition(props)}, transform ${getTransition(props)}`,
            })

        case 'fadeIn-enter':
            return generateStyle({
                opacity: 1,
                transform: 'scale3d(1, 1, 1)',
                transition: `opacity ${getTransition(props)}, transform ${getTransition(props)}`,
            })

        case 'fadeOn-exit':
            return {
                opacity: 0,
                transition: `opacity ${getTransition(props)}`,
            }

        case 'fadeOn-enter':
            return {
                opacity: 1,
                transition: `opacity ${getTransition(props)}`,
            }

        case 'fadeLeft-exit':
            return generateStyle({
                opacity: 0,
                transform: 'translate3d(10px, 0 , 0)',
                transition: `opacity ${getTransition(props)}, transform ${getTransition(props)}`,
            })

        case 'fadeLeft-enter':
            return generateStyle({
                opacity: 1,
                transform: 'translate3d(0, 0 , 0)',
                transition: `opacity ${getTransition(props)}, transform ${getTransition(props)}`,
            })

        case 'expandY-before':
            return {
                left: '-999999px',
                position: 'fixed',
                top: '-999999px',
            }

        case 'expandY-exit':
            return {
                height: 0,
                overflow: 'hidden',
                transition: `height ${getTransition(props)}`,
            }

        case 'expandY-enter':
            return {
                height: props.height || 'auto',
                overflow: 'hidden',
                transition: `height ${getTransition(props)}`,
            }

        default:
            return {}
    }
}
