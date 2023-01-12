import React from 'react'
import Transition from 'component'

const App: React.FC = () => {
  const [isVisible, toggleVisible] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      toggleVisible(true)
    }, 1000)
  }, [])

  return (
    <Transition when={isVisible} stagger={100}>
      <div>to do...</div>
      <div>to do...</div>
      <div>to do...</div>
      <div>to do...</div>
    </Transition>
  )
}

export default App
