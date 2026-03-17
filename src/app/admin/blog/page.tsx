import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const metadata = {
    title: 'Manage Blog | Admin CMS',
};

export default async function AdminBlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' },
    });

    async function addPost(formData: FormData) {
        'use server';
        const title = formData.get('title') as string;
        const author = formData.get('author') as string;
        const content = formData.get('content') as string;
        const imageUrl = formData.get('imageUrl') as string;

        await prisma.blogPost.create({
            data: { title, author, content, imageUrl }
        });
        revalidatePath('/admin/blog');
        revalidatePath('/blog');
    }

    async function deletePost(formData: FormData) {
        'use server';
        const id = formData.get('id') as string;
        await prisma.blogPost.delete({ where: { id } });
        revalidatePath('/admin/blog');
        revalidatePath('/blog');
    }

    return (
        <div className="grid grid-2" style={{ gap: '2rem' }}>
            <div>
                <div className="admin-header">
                    <h1>Manage Blog</h1>
                    <p>Publish news and insights.</p>
                </div>
                <div className="admin-panel">
                    <h3>Create New Post</h3>
                    <form action={addPost} style={{ marginTop: '1rem' }}>
                        <div className="form-group grid grid-2">
                            <div>
                                <label className="form-label">Article Title</label>
                                <input type="text" name="title" className="form-control" required />
                            </div>
                            <div>
                                <label className="form-label">Author</label>
                                <input type="text" name="author" defaultValue="Mainthisha Associates" className="form-control" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Content</label>
                            <textarea name="content" className="form-control" style={{ minHeight: '150px' }} required></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Header Image URL (Optional)</label>
                            <input type="text" name="imageUrl" className="form-control" />
                        </div>
                        <button type="submit" className="admin-btn">Publish Article</button>
                    </form>
                </div>
            </div>

            <div>
                <div className="admin-header">
                    <h2 style={{ opacity: 0 }}>List</h2>
                    <p style={{ opacity: 0 }}>Spacing</p>
                </div>
                <div className="admin-panel">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Article</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => (
                                <tr key={post.id}>
                                    <td>
                                        <strong>{post.title}</strong><br />
                                        <small style={{ color: '#888' }}>{new Date(post.createdAt).toLocaleDateString()}</small>
                                    </td>
                                    <td>
                                        <form action={deletePost} style={{ display: 'inline' }}>
                                            <input type="hidden" name="id" value={post.id} />
                                            <button type="submit" className="admin-btn admin-btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan={2} style={{ textAlign: 'center', padding: '1rem' }}>No articles yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
