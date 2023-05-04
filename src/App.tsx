import React, { useCallback, useState } from 'react'
import Transition from 'component'

const App: React.FC = () => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [isVisible, toggleVisible] = useState(true)
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
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className='custom-thing' style={{ padding: 10 }}>
                            {index}
                        </div>
                    ))}
                </Transition>
            </div>
            <button onClick={handleStart}>toggle</button>
        </>
    )
}

export default App
