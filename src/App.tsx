import React, { useCallback, useState } from 'react'
import Transition from 'component'

const App: React.FC = () => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [isVisible, toggleVisible] = useState(false)
    const [startTime, setStartTime] = useState(0)

    const handleStart = () => {
        setStartTime(Date.now())
        toggleVisible(!isVisible)
    }

    const handleComplete = useCallback(
        (type: any) => {
            const endTime = Date.now()
            console.log('duration', type, endTime - startTime)
        },
        [startTime]
    )

    return (
        <>
            <div ref={containerRef}>
                <Transition when={isVisible} stagger={100} onComplete={handleComplete}>
                    <div>to do...</div>
                    <div>to do...</div>
                    <div>to do...</div>
                    <div>to do...</div>
                </Transition>
            </div>
            <button onClick={handleStart}>toggle</button>
        </>
    )
}

export default App
