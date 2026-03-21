import prisma from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Default image
const DEFAULT_BLOG_IMAGE =
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000";

export default async function SingleBlogPage({
    params,
}: {
    params: { id?: string };
}) {
    // ✅ Prevent crash if id is missing
    if (!params?.id) {
        return notFound();
    }

    const post = await prisma.blogPost.findUnique({
        where: { id: params.id },
    });

    // ✅ If no post found
    if (!post) {
        return notFound();
    }

    const imageUrl = post.imageUrl || DEFAULT_BLOG_IMAGE;

    return (
        <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', paddingBottom: '5rem' }}>

            {/* HEADER */}
            <section
                style={{
                    height: '45vh',
                    minHeight: '350px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#111',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '2rem'
                }}
            >
                <div style={{ maxWidth: '900px' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
                        {post.title}
                    </h1>

                    <p>
                        Written by <strong>{post.author}</strong> •{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section style={{ marginTop: '-4rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>

                    {/* ✅ Correct Back Button */}
                    <Link
                        href="/blog"
                        style={{
                            display: 'inline-block',
                            marginBottom: '1rem',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            color: '#333'
                        }}
                    >
                        ← Back to all articles
                    </Link>

                    <div
                        style={{
                            background: '#fff',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                        }}
                    >
                        {/* IMAGE */}
                        <div style={{ position: 'relative', height: '400px' }}>
                            <Image
                                src={imageUrl}
                                alt={post.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>

                        {/* TEXT */}
                        <div
                            style={{
                                padding: '2rem',
                                whiteSpace: 'pre-wrap',
                                lineHeight: '1.8',
                                fontSize: '1.1rem',
                                color: '#333',
                            }}
                        >
                            {post.content}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}