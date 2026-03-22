import prisma from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const DEFAULT_BLOG_IMAGE =
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000";

export default async function SingleBlogPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    if (!id) {
        return notFound();
    }

    const post = await prisma.blogPost.findUnique({
        where: { id },
    });

    if (!post) {
        return notFound();
    }

    const imageUrl = post.imageUrl || DEFAULT_BLOG_IMAGE;

    return (
        <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', paddingBottom: '5rem' }}>
            <section className="page-header" style={{ height: '45vh', minHeight: '350px' }}>
                <div className="container text-center animate-fade-in" style={{ maxWidth: '900px' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem', color: '#fff' }}>
                        {post.title}
                    </h1>
                    <p style={{ color: '#fff' }}>
                        Written by <strong>{post.author}</strong> •{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </section>

            <section style={{ marginTop: '2rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
                    <Link href="/blog" style={{
                        display: 'inline-block',
                        marginBottom: '1rem',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        color: '#8B0000'
                    }}>
                        ← Back to all articles
                    </Link>

                    <div style={{
                        background: '#fff',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    }}>
                        <div style={{ position: 'relative', height: '400px' }}>
                            <Image
                                src={imageUrl}
                                alt={post.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                        <div style={{
                            padding: '2rem',
                            whiteSpace: 'pre-wrap',
                            lineHeight: '1.8',
                            fontSize: '1.1rem',
                            color: '#333',
                        }}>
                            {post.content}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}