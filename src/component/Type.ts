export type TransitionKeys = 'enter' | 'exit' | 'before' | 'none'

export interface Props {
    children: any
    className?: string
    delay?: number
    duration?: number
    when: boolean
    stagger?: number
    type?: string
    onComplete?: (transition: TransitionKeys) => void
}

export interface StyleProps {
    delay?: number
    duration?: number
    style?: string
}

export interface TransitionRulesType {
    transform: string
    [key: string]: string | number
}
