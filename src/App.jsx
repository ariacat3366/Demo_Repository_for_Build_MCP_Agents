import { useState } from 'react'
import './App.css'

function App() {
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

  return (
    <div className="container">
      <h1>Simple Todo List</h1>
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
