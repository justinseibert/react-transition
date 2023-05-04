import React, { useCallback, useState, useEffect } from 'react'
import Transition from 'component'

const CustomComponent: React.FC<{ children: React.ReactNode }> = ({ children }: any) => {
    return (
        <>
            <div className='custom-component' style={{ padding: 10 }}>
                {children}
            </div>
        </>
    )
}

const App: React.FC = () => {
    const [isVisible, toggleVisible] = useState(true)
    const [startTime, setStartTime] = useState(0)

    const handleStart = () => {
        toggleVisible(!isVisible)
    }

    const handleComplete = useCallback(
        (type: any) => {
            const endTime = Date.now()
            console.log('duration', type, endTime - startTime)
            setStartTime(0)
        },
        [startTime]
    )

    useEffect(() => {
        setStartTime(Date.now())
    }, [isVisible])

    return (
        <>
            <div>status: {!startTime ? 'stopped' : 'transitioning'}</div>
            <div style={{ width: '50%', display: 'inline-block' }}>
                <Transition when={isVisible} stagger={100} onComplete={handleComplete}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CustomComponent key={index}>custom {index}</CustomComponent>
                    ))}
                </Transition>
            </div>
            <div style={{ width: '50%', display: 'inline-block' }}>
                <Transition when={isVisible} stagger={100} onComplete={handleComplete}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className='custom-component' style={{ padding: 10 }}>
                            inline {index}
                        </div>
                    ))}
                </Transition>
            </div>
            <button onClick={handleStart}>toggle</button>
        </>
    )
}

export default App
