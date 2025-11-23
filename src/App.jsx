import { useState } from 'react'
import './App.css'
import LandingPage from './LandingPage'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [activeTab, setActiveTab] = useState('quick')
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review the E2B documentation', column: 'today' },
    { id: 2, text: 'Outline the demo video structure', column: 'done' },
  ])
  const [input, setInput] = useState('')
  const [openMenuId, setOpenMenuId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const addTodo = (column = 'later') => {
    if (!input) return
    setTodos([...todos, { id: Date.now(), text: input, column }])
    setInput('')
  }

  const moveTodo = (id, newColumn) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, column: newColumn } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const startEdit = (id, text) => {
    setEditingId(id)
    setEditText(text)
    setOpenMenuId(null)
  }

  const saveEdit = () => {
    if (!editText.trim()) return
    setTodos(todos.map(todo =>
      todo.id === editingId ? { ...todo, text: editText } : todo
    ))
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
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

  const laterTodos = todos.filter(t => t.column === 'later')
  const todayTodos = todos.filter(t => t.column === 'today')
  const doneTodos = todos.filter(t => t.column === 'done')

  return (
    <div className="container">
      <div className="header-with-back">
        <div className="app-brand">NOT A MEMO</div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'quick' ? 'active' : ''}`}
          onClick={() => setActiveTab('quick')}
        >
          Quick Add
        </button>
        <button
          className={`tab ${activeTab === 'kanban' ? 'active' : ''}`}
          onClick={() => setActiveTab('kanban')}
        >
          Kanban
        </button>
      </div>

      {/* Quick Add View */}
      {activeTab === 'quick' && (
        <div className="quick-add-view">
          <div className="quick-stats">
            <div className="stat">
              <span className="stat-number">{laterTodos.length}</span>
              <span className="stat-label">Later</span>
            </div>
            <div className="stat">
              <span className="stat-number">{todayTodos.length}</span>
              <span className="stat-label">Today</span>
            </div>
            <div className="stat">
              <span className="stat-number">{doneTodos.length}</span>
              <span className="stat-label">Done</span>
            </div>
          </div>
          <div className="quick-input-container">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your task..."
              className="quick-textarea"
              rows="4"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  addTodo('today')
                }
              }}
            />
            <div className="quick-actions">
              <button onClick={() => addTodo('later')} className="btn-later">
                <span>Later</span>
              </button>
              <button onClick={() => addTodo('today')} className="btn-today">
                Today
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kanban View */}
      {activeTab === 'kanban' && (
        <div className="kanban-board">
          {/* Later Column */}
          <div className="kanban-column">
            <div className="column-header later-header">
              <h3>Later</h3>
              <span className="count">{laterTodos.length}</span>
            </div>
            <div className="column-tasks">
              {laterTodos.map(todo => (
                <div key={todo.id} className="kanban-task">
                  <div className="kebab-menu-container">
                    <button
                      className="kebab-btn"
                      onClick={() => setOpenMenuId(openMenuId === todo.id ? null : todo.id)}
                    >
                      ⋮
                    </button>
                    {openMenuId === todo.id && (
                      <div className="kebab-menu">
                        <button onClick={() => startEdit(todo.id, todo.text)}>
                          Edit
                        </button>
                        <button onClick={() => { deleteTodo(todo.id); setOpenMenuId(null); }}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  {editingId === todo.id ? (
                    <div className="task-edit-container">
                      <textarea
                        className="task-edit-textarea"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            saveEdit()
                          } else if (e.key === 'Escape') {
                            cancelEdit()
                          }
                        }}
                        onBlur={cancelEdit}
                        autoFocus
                      />
                      <div className="edit-hint">Enter to save, Esc to cancel</div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="task-text"
                        onDoubleClick={() => startEdit(todo.id, todo.text)}
                      >
                        {todo.text}
                      </div>
                      <div className="task-actions">
                        <button onClick={() => moveTodo(todo.id, 'today')} className="move-btn">
                          TODAY
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {laterTodos.length === 0 && (
                <div className="empty-state">No tasks for later</div>
              )}
            </div>
          </div>

          {/* Today Column */}
          <div className="kanban-column">
            <div className="column-header today-header">
              <h3>Today</h3>
              <span className="count">{todayTodos.length}</span>
            </div>
            <div className="column-tasks">
              {todayTodos.map(todo => (
                <div key={todo.id} className="kanban-task">
                  <div className="kebab-menu-container">
                    <button
                      className="kebab-btn"
                      onClick={() => setOpenMenuId(openMenuId === todo.id ? null : todo.id)}
                    >
                      ⋮
                    </button>
                    {openMenuId === todo.id && (
                      <div className="kebab-menu">
                        <button onClick={() => startEdit(todo.id, todo.text)}>
                          Edit
                        </button>
                        <button onClick={() => { deleteTodo(todo.id); setOpenMenuId(null); }}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  {editingId === todo.id ? (
                    <div className="task-edit-container">
                      <textarea
                        className="task-edit-textarea"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            saveEdit()
                          } else if (e.key === 'Escape') {
                            cancelEdit()
                          }
                        }}
                        onBlur={cancelEdit}
                        autoFocus
                      />
                      <div className="edit-hint">Enter to save, Esc to cancel</div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="task-text"
                        onDoubleClick={() => startEdit(todo.id, todo.text)}
                      >
                        {todo.text}
                      </div>
                      <div className="task-actions">
                        <button onClick={() => moveTodo(todo.id, 'later')} className="move-btn">
                          LATER
                        </button>
                        <button onClick={() => moveTodo(todo.id, 'done')} className="move-btn done">
                          DONE
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {todayTodos.length === 0 && (
                <div className="empty-state">Nothing scheduled for today</div>
              )}
            </div>
          </div>

          {/* Done Column */}
          <div className="kanban-column">
            <div className="column-header done-header">
              <h3>Done</h3>
              <span className="count">{doneTodos.length}</span>
            </div>
            <div className="column-tasks">
              {doneTodos.map(todo => (
                <div key={todo.id} className="kanban-task done">
                  <div className="kebab-menu-container">
                    <button
                      className="kebab-btn"
                      onClick={() => setOpenMenuId(openMenuId === todo.id ? null : todo.id)}
                    >
                      ⋮
                    </button>
                    {openMenuId === todo.id && (
                      <div className="kebab-menu">
                        <button onClick={() => startEdit(todo.id, todo.text)}>
                          Edit
                        </button>
                        <button onClick={() => { deleteTodo(todo.id); setOpenMenuId(null); }}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  {editingId === todo.id ? (
                    <div className="task-edit-container">
                      <textarea
                        className="task-edit-textarea"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            saveEdit()
                          } else if (e.key === 'Escape') {
                            cancelEdit()
                          }
                        }}
                        onBlur={cancelEdit}
                        autoFocus
                      />
                      <div className="edit-hint">Enter to save, Esc to cancel</div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="task-text"
                        onDoubleClick={() => startEdit(todo.id, todo.text)}
                      >
                        {todo.text}
                      </div>
                      <div className="task-actions">
                        <button onClick={() => moveTodo(todo.id, 'today')} className="move-btn">
                          TODAY
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {doneTodos.length === 0 && (
                <div className="empty-state">No completed tasks yet</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        <button className="back-button" onClick={handleBackToHome}>
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default App
