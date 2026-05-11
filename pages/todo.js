import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'nextjs-mini-todo';

const styles = {
  container: {
    fontFamily: 'system-ui, sans-serif',
    padding: '2rem',
    maxWidth: '720px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '0.5rem',
    fontSize: 'clamp(2rem, 2.5vw, 2.5rem)',
  },
  description: {
    marginBottom: '1.5rem',
    color: '#475569',
    maxWidth: '640px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  input: {
    flex: '1 1 260px',
    padding: '0.85rem 1rem',
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    minWidth: '180px',
  },
  addButton: {
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '0.85rem 1.25rem',
    cursor: 'pointer',
  },
  noTasks: {
    color: '#475569',
  },
  todoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    marginBottom: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    background: '#ffffff',
  },
  todoDoneItem: {
    background: '#ecfdf5',
    borderColor: '#a7f3d0',
  },
  todoText: {
    border: 'none',
    background: 'transparent',
    color: '#0f172a',
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer',
    padding: 0,
    fontSize: '1rem',
  },
  doneText: {
    textDecoration: 'line-through',
    color: '#166534',
  },
  removeButton: {
    background: 'transparent',
    border: 'none',
    color: '#b91c1c',
    cursor: 'pointer',
    fontWeight: 700,
  },
  backLink: {
    display: 'inline-block',
    marginTop: '1.5rem',
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 600,
  },
};

export default function TodoPage() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    const trimmed = task.trim();
    if (!trimmed) return;
    setTodos((current) => [...current, { id: Date.now(), text: trimmed, done: false }]);
    setTask('');
  };

  const toggleTodo = (id) => {
    setTodos((current) => current.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const removeTodo = (id) => {
    setTodos((current) => current.filter((item) => item.id !== id));
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Mini Todo Project</h1>
      <p style={styles.description}>
        Practice Next.js with a small todo app that saves your list in the browser.
      </p>

      <form onSubmit={addTodo} style={styles.form}>
        <input
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Add a new task"
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <p style={styles.noTasks}>No tasks yet. Add one to start.</p>
      ) : (
        <ul style={styles.todoList}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                ...styles.todoItem,
                ...(todo.done ? styles.todoDoneItem : {}),
              }}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                style={{
                  ...styles.todoText,
                  ...(todo.done ? styles.doneText : {}),
                }}
              >
                {todo.text}
              </button>
              <button onClick={() => removeTodo(todo.id)} style={styles.removeButton}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <Link href="/" style={styles.backLink}>
        ← Back to home
      </Link>
    </main>
  );
}
