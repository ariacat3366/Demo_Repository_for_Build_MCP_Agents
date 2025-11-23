import { useState } from 'react'
import './App.css'
import LandingPage from './LandingPage'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review the E2B documentation', completed: false },
    { id: 2, text: 'Outline the demo video structure', completed: true },
  ])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (!input) return
    setTodos([...todos, { id: Date.now(), text: input, completed: false }])
    setInput('')
  }

  const handleStart = () => {
    setShowLanding(false)
  }

  const handleBackToHome = () => {
    setShowLanding(true)
  }

  if (showLanding) {
    return <LandingPage onStart={handleStart} />
  }

  return (
    <div className="container">
      <div className="header-with-back">
        <button className="back-button" onClick={handleBackToHome}>
          ← Back to Home
        </button>
        <div className="app-brand">NOT A MEMO</div>
        <h1>Todo List</h1>
      </div>
      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
