// ==========================================
// 1. MAIN Branch (Before) - src/App.jsx
// ==========================================

import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'E2Bのドキュメントを読む', completed: false },
    { id: 2, text: 'デモ動画の構成を考える', completed: true },
  ])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (!input) return
    setTodos([...todos, { id: Date.now(), text: input, completed: false }])
    setInput('')
  }

  return (
    <div className="container">
      <h1>Simple Todo List</h1>
      <div className="input-group">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
