import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    let adminName = 'Admin';

    if (token) {
        const payload = await verifyToken(token);
        if (payload) {
            const user = await prisma.user.findUnique({
                where: { email: payload.email }
            });
            if (user && user.name) {
                adminName = user.name;
            }
        }
    }

    const [projectCount, galleryCount, testimonialCount, blogCount] = await Promise.all([
        prisma.project.count(),
        prisma.galleryImage.count(),
        prisma.testimonial.count(),
        prisma.blogPost.count()
    ]);

    return (
        <div>
            <div className="admin-header">
                <h1>Welcome Back, {adminName}!</h1>
                <p>Overview of your website&apos;s content and analytics</p>
            </div>

            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <h3>Projects</h3>
                    <div className="stat-value">{projectCount}</div>
                </div>
                <div className="admin-stat-card">
                    <h3>Gallery Images</h3>
                    <div className="stat-value">{galleryCount}</div>
                </div>
                <div className="admin-stat-card">
                    <h3>Testimonials</h3>
                    <div className="stat-value">{testimonialCount}</div>
                </div>
                <div className="admin-stat-card">
                    <h3>Blog Posts</h3>
                    <div className="stat-value">{blogCount}</div>
                </div>
            </div>

            <div className="admin-panel" style={{ marginTop: '2rem' }}>
                <h2>Welcome to the Content Management System</h2>
                <p>Use the sidebar navigation to add, edit, or delete content across your website.</p>
                <p>All changes made here are instantly reflected on the live public website.</p>
            </div>
        </div>
    );
}
