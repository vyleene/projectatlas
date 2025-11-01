import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Michael the goon lord was here</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          I gooned {count} times now.
        </button>
      </div>
    </>
  )
}

export default App
