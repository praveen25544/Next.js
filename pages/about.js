import Link from 'next/link';

export default function About() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>About this app</h1>
      <p>This is a basic Next.js example with file-based routing.</p>
      <Link href="/">Go back home</Link>
    </main>
  );
}
