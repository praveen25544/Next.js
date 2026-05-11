import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Welcome to Next.js</h1>
      <p>This is your starter page.</p>
      <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/about">About page</Link>
        <Link href="/todo">Mini Todo Project</Link>
      </nav>
    </main>
  );
}
