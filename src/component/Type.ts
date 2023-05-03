export enum TransitionEnum {
    Enter = 'enter',
    Exit = 'exit',
    Before = 'before',
    None = '',
}

export interface Props {
    children: any
    className?: string
    delay?: number
    duration?: number
    when: boolean
    stagger?: number
    type?: string
    onComplete?: (transition: TransitionEnum) => void
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
