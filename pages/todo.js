import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Todo.module.css';

const STORAGE_KEY = 'nextjs-mini-todo';

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
    setTodos((current) => current.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  };

  const removeTodo = (id) => {
    setTodos((current) => current.filter((item) => item.id !== id));
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Mini Todo Project</h1>
      <p className={styles.description}>
        Practice Next.js with a small todo app that saves your list in the browser.
      </p>

      <form onSubmit={addTodo} className={styles.form}>
        <input
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Add a new task"
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <p className={styles.noTasks}>No tasks yet. Add one to start.</p>
      ) : (
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`${styles.todoItem} ${todo.done ? styles.todoDoneItem : ''}`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`${styles.todoText} ${todo.done ? styles.doneText : ''}`}
              >
                {todo.text}
              </button>
              <button
                onClick={() => removeTodo(todo.id)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <Link href="/" className={styles.backLink}>
        ← Back to home
      </Link>
    </main>
  );
}
