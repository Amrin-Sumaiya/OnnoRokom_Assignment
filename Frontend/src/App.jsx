import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-amber-200">
        <h1 className='bg-amber-300 text-amber-950'>Hello World</h1>

        <p>Count: {count}</p>

        <button className='bg-amber-500' onClick={() => setCount(count + 1)}>
          Increase
        </button>
      </div>
    </>
  )
}

export default App