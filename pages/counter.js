import { useState } from 'react';
import Link from 'next/link';

export default function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Counter Example</h1>
      <p>Use this counter to practice React state in Next.js.</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
        <button
          onClick={() => setCount(count - 1)}
          style={{ padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
        >
          -
        </button>

        <span style={{ fontSize: '1.5rem', minWidth: '2.5rem', textAlign: 'center' }}>{count}</span>

        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
        >
          +
        </button>
      </div>

      <Link href="/" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
        ← Back to home
      </Link>
    </main>
  );
}
