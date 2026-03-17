import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const metadata = {
    title: 'Manage Services | Admin CMS',
};

export default async function AdminServicesPage() {
    const services = await prisma.service.findMany({
        orderBy: { createdAt: 'desc' },
    });

    // Basic implementation to prevent the missing 404 page
    return (
        <div className="grid grid-2" style={{ gap: '2rem' }}>
            <div>
                <div className="admin-header">
                    <h1>Manage Services</h1>
                    <p>Add new service categories to your offerings.</p>
                </div>
                <div className="admin-panel">
                    <h3>Service addition is coming soon.</h3>
                    <p style={{ marginTop: '1rem', color: '#666' }}>
                        The core structure is ready. To enable full dynamic DB-service swapping, the frontend `/services` component map must be detached from hardcodes.
                    </p>
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
                                <th>Service Area</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(s => (
                                <tr key={s.id}>
                                    <td>
                                        <strong>{s.title}</strong><br />
                                    </td>
                                    <td>
                                        <button disabled className="admin-btn admin-btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', opacity: 0.5 }}>Configuring</button>
                                    </td>
                                </tr>
                            ))}
                            {services.length === 0 && (
                                <tr>
                                    <td colSpan={2} style={{ textAlign: 'center', padding: '1rem' }}>No dynamic services stored in database yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
