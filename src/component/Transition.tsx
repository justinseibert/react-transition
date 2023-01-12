import React, { useCallback, useEffect, useState } from 'react'

import { styles } from './Style'
import { Props, TransitionEnum } from './Type'

export const DEFAULT_TRANSITION_DURATION = 300

const Transition: React.FC<Props> = ({
    className = '',
    delay = 0,
    duration = DEFAULT_TRANSITION_DURATION,
    elem = null,
    when = false,
    stagger = 0,
    type = 'fadeUp',
    children,
}: Props) => {
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [transition, setTransition] = useState(TransitionEnum.Exit)

    const asyncTransition = async (_transition: TransitionEnum) => {
        return new Promise(() => {
            setTransition(_transition)
        })
    }

    const asyncDimension = async (_height: number, _width: number) => {
        return new Promise(() => {
            setHeight(_height)
            setWidth(_width)
        })
    }

    const handleTransition = useCallback(async () => {
        if (elem && !when && transition !== TransitionEnum.Before) {
            await asyncTransition(TransitionEnum.Enter)
        }

        window.requestAnimationFrame(async () => {
            await asyncTransition(when ? TransitionEnum.Enter : TransitionEnum.Exit)
            if (when) {
                window.setTimeout(() => {
                    setTransition(TransitionEnum.None)
                }, delay + stagger * React.Children.count(children) + duration + 10)
            }
        })
    }, [elem, when, transition, delay, stagger, children, duration])

    useEffect(() => {
        const handleElem = async () => {
            if (elem && elem.current) {
                await asyncTransition(TransitionEnum.Before)
                await asyncDimension(elem.current.offsetHeight, elem.current.offsetWidth)
            }
            handleTransition()
        }
        handleElem()
    }, [elem, handleTransition])

    useEffect(() => {
        handleTransition()
    }, [when, handleTransition])

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
                delay: (delay + stagger) * (index + 1),
                duration,
                height,
                style: transition ? `${type}-${transition}` : '',
                width,
            }),
        })
    })
}

export default Transition
