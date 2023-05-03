import React, { useCallback, useEffect, useState } from 'react'

import { styles } from './Style'
import { Props, TransitionEnum } from './Type'

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
    const [transition, setTransition] = useState(TransitionEnum.Exit)
    const [prevTransition, setPrevTransition] = useState(TransitionEnum.Exit)

    const watch = useCallback(
        (currentTransition: TransitionEnum) => {
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
        if (when) {
            setTransition(TransitionEnum.Enter)
        } else {
            setTransition(TransitionEnum.Exit)
        }
    }, [when])

    return React.Children.map(children, (child: any, index: number) => {
        if (!child) {
            return null
        }
        return React.cloneElement(child, {
            className: [
                className,
                'component--transition-wrapper',
                transition ? `component--transition-${transition}` : '',
                stagger ? `component--transition-child component--transition-stagger-${index}` : '',
            ].join(' '),
            key: index,
            style: styles({
                delay:
                    (delay + stagger) *
                    (transition === TransitionEnum.Enter ? index + 1 : React.Children.count(children) - index),
                duration,
                style: transition ? `${type}-${transition}` : '',
            }),
        })
    })
}

export default Transition
