import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const metadata = {
    title: 'Manage Testimonials | Admin CMS',
};

export default async function AdminTestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' },
    });

    async function addTestimonial(formData: FormData) {
        'use server';
        const clientName = formData.get('clientName') as string;
        const projectRef = formData.get('projectRef') as string;
        const review = formData.get('review') as string;
        const rating = parseInt(formData.get('rating') as string);

        await prisma.testimonial.create({
            data: { clientName, projectRef, review, rating }
        });
        revalidatePath('/admin/testimonials');
        revalidatePath('/testimonials');
    }

    async function deleteTestimonial(formData: FormData) {
        'use server';
        const id = formData.get('id') as string;
        await prisma.testimonial.delete({ where: { id } });
        revalidatePath('/admin/testimonials');
        revalidatePath('/testimonials');
    }

    return (
        <div className="grid grid-2" style={{ gap: '2rem' }}>
            <div>
                <div className="admin-header">
                    <h1>Manage Testimonials</h1>
                    <p>Add client reviews to your website.</p>
                </div>
                <div className="admin-panel">
                    <h3>Add New Testimonial</h3>
                    <form action={addTestimonial} style={{ marginTop: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Client Name</label>
                            <input type="text" name="clientName" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Project Reference</label>
                            <input type="text" name="projectRef" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Review Text</label>
                            <textarea name="review" className="form-control" required></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Rating (1-5)</label>
                            <input type="number" name="rating" min="1" max="5" defaultValue="5" className="form-control" required />
                        </div>
                        <button type="submit" className="admin-btn">Add Review</button>
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
                                <th>Testimonial</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.map(t => (
                                <tr key={t.id}>
                                    <td>
                                        <strong>{t.clientName}</strong> ({t.rating} Stars)<br />
                                        <small style={{ color: '#888' }}>{t.projectRef}</small>
                                    </td>
                                    <td>
                                        <form action={deleteTestimonial} style={{ display: 'inline' }}>
                                            <input type="hidden" name="id" value={t.id} />
                                            <button type="submit" className="admin-btn admin-btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                            {testimonials.length === 0 && (
                                <tr>
                                    <td colSpan={2} style={{ textAlign: 'center', padding: '1rem' }}>No testimonials yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
