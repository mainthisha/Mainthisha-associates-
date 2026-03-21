import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Blog & News | Mainthisha Associates',
    description: 'Latest news, construction insights, and project updates from Mainthisha Associates.',
};

export const revalidate = 0;

// Default image with a modern architecture aesthetic
const DEFAULT_BLOG_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000";

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <section className="page-header" style={{ height: '30vh', minHeight: '250px' }}>
                <div className="container text-center animate-fade-in">
                    <h1>News & Insights</h1>
                    <p>Construction Updates and Engineering Knowledge</p>
                </div>
            </section>

            <section className="section bg-light">
                <div className="container">
                    <div className="grid grid-3">
                        {posts.map((post) => {
                            const imageUrl = post.imageUrl || DEFAULT_BLOG_IMAGE;
                            return (
                                <Link href={`/blog/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
                                    <div className="card" style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        backgroundColor: '#fff',
                                        padding: 0
                                    }}>
                                        <div style={{ position: 'relative', width: '100%', height: '240px', backgroundColor: '#eaeaea' }}>
                                            <Image
                                                src={imageUrl}
                                                alt={post.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--accent-color)', marginBottom: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--primary-color)', lineHeight: '1.4' }}>{post.title}</h3>

                                            <div style={{
                                                fontSize: '1rem',
                                                marginBottom: '1.5rem',
                                                color: 'var(--text-muted)',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                lineHeight: '1.6',
                                                flexGrow: 1
                                            }}>
                                                {post.content}
                                            </div>

                                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1.2rem', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.95rem', color: 'var(--primary-color)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    Read Article <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>&rarr;</span>
                                                </span>
                                                <span style={{ fontSize: '0.9rem', color: '#888' }}>By {post.author}</span>
                                            </div>
                                        </div>
                                        {/* CSS hover effect handling without React state */}
                                        <style dangerouslySetInnerHTML={{
                                            __html: `
                                            .card:hover { transform: translateY(-8px) !important; box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }
                                        `}} />
                                    </div>
                                </Link>
                            );
                        })}

                        {posts.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                                <h3 style={{ color: 'var(--text-muted)', fontSize: '1.5rem' }}>No publications available yet.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}