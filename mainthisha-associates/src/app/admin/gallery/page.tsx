import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import NewGalleryImageForm from '@/components/NewGalleryImageForm';

export const metadata = {
    title: 'Manage Gallery | Admin CMS',
};

export default async function AdminGalleryPage() {
    const images = await prisma.galleryImage.findMany({
        orderBy: { createdAt: 'desc' },
    });

    async function deleteImage(formData: FormData) {
        'use server';
        const id = formData.get('id') as string;
        await prisma.galleryImage.delete({ where: { id } });
        revalidatePath('/admin/gallery');
        revalidatePath('/gallery');
    }

    return (
        <div className="grid grid-2" style={{ gap: '2rem' }}>
            <div>
                <div className="admin-header">
                    <h1>Manage Gallery</h1>
                    <p>Add new images to the public gallery.</p>
                </div>
                <div className="admin-panel">
                    <NewGalleryImageForm />
                </div>
            </div>

            <div>
                <div className="admin-header">
                    <h2 style={{ opacity: 0 }}>Gallery List</h2>
                    <p style={{ opacity: 0 }}>Spacing</p>
                </div>
                <div className="admin-panel">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title / Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {images.map(img => (
                                <tr key={img.id}>
                                    <td>
                                        <strong>{img.title}</strong><br />
                                        <small style={{ color: '#888' }}>{img.category}</small>
                                    </td>
                                    <td>
                                        <form action={deleteImage} style={{ display: 'inline' }}>
                                            <input type="hidden" name="id" value={img.id} />
                                            <button type="submit" className="admin-btn admin-btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                            {images.length === 0 && (
                                <tr>
                                    <td colSpan={2} style={{ textAlign: 'center', padding: '1rem' }}>No images yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
