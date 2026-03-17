import Link from 'next/link';

export default function BlogNotFound() {
    return (
        <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', backgroundColor: 'var(--bg-color)' }}>
            <h1 style={{ fontSize: '5rem', color: 'var(--accent-color)', marginBottom: '1rem', fontWeight: 'bold' }}>404</h1>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Article Not Found</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                We couldn&apos;t find the engineering or construction article you&apos;re looking for. It may have been removed or the link might be broken.
            </p>
            <Link href="/blog" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                &larr; Return to All Articles
            </Link>
        </div>
    );
}
