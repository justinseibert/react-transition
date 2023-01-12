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
    elem?: any
    when: boolean
    stagger?: number
    type?: string
}

export interface StyleProps {
    delay?: number
    duration?: number
    style?: string
    height?: number
    width?: number
}

export interface TransitionRulesType {
    transform: string
    [key: string]: string | number
}
