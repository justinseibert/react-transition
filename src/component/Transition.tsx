import React, { useCallback, useEffect, useState } from 'react'

import { styles } from './Style'
import { Props, TransitionKeys } from './Type'

export const DEFAULT_TRANSITION_DURATION = 300

const Transition: React.FC<Props> = ({
    className = '',
    delay = 0,
    duration = DEFAULT_TRANSITION_DURATION,
    when = false,
    stagger = 0,
    type = 'fadeUp',
    children,
    onComplete,
}: Props) => {
    const timerRef = React.useRef<number | null>(null)
    const [totalDuration] = useState(delay + stagger * React.Children.count(children) + duration)
    const [transition, setTransition] = useState<TransitionKeys>('exit')
    const [prevTransition, setPrevTransition] = useState<TransitionKeys>('exit')
    const [isReady, setIsReady] = useState(false)

    const watch = useCallback(
        (currentTransition: TransitionKeys) => {
            if (onComplete) {
                timerRef.current = window.setTimeout(() => {
                    onComplete(currentTransition)
                }, totalDuration)
            }
            setPrevTransition(currentTransition)
        },
        [onComplete, totalDuration]
    )

    useEffect(() => {
        if (transition !== prevTransition) {
            watch(transition)
        }
    }, [transition, prevTransition, watch])

    useEffect(() => {
        if (isReady) {
            setTransition('enter')
        } else {
            setTransition('exit')
        }
    }, [isReady])

    useEffect(() => {
        setIsReady(when && !!children)
    }, [when, children])

    return React.Children.map(children, (child: any, index: number) => {
        if (!child) {
            return null
        }
        return React.cloneElement(child, {
            className: [
                child.props.className,
                className,
                'component--transition-wrapper',
                transition ? `component--transition-${transition}` : '',
                stagger ? `component--transition-child component--transition-stagger-${index}` : '',
            ]
                .filter(Boolean)
                .join(' '),
            key: index,
            style: {
                ...child.props.style,
                ...styles({
                    delay:
                        (delay + stagger) *
                        (transition === 'enter' ? index + 1 : React.Children.count(children) - index),
                    duration,
                    style: transition ? `${type}-${transition}` : '',
                }),
            },
        })
    })
}

export default Transition
