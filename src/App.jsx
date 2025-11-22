import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review the E2B documentation', completed: false, tag: 'Study' },
    { id: 2, text: 'Outline the demo video structure', completed: true, tag: 'Work' },
    { id: 3, text: 'Test the MCP server', completed: false, tag: 'Dev' },
  ])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (!input) return
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false, tag: 'General' },
    ])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ))
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          🚀 Task Master <span className="badge">v2.0</span>
        </h1>
        <p>Manage your tasks with AI speed</p>
      </header>

      <main className="card">
        <div className="input-area">
          <input
            className="modern-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button className="primary-btn" onClick={addTodo}>
            Add Task
          </button>
        </div>

        <div className="list-area">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'done' : ''}`}
              onClick={() => toggleTodo(todo.id)}
            >
              <span className="status-icon">{todo.completed ? '✅' : '⬜'}</span>
              <span className="todo-text">{todo.text}</span>
              <span className="tag">{todo.tag}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
