import { useState } from 'react'
import './App.css'
import CardSelector from "./pages/CardSelector";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CardSelector />
    </div>
  )
}

export default App
