import Link from 'next/link';
import './admin.css';

export const metadata = {
    title: 'Admin Dashboard | Mainthisha Associates',
    description: 'Manage the website content for Mainthisha Associates',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    CMS <span>Admin</span>
                </div>
                <nav className="admin-nav">
                    <Link href="/admin">Dashboard</Link>
                    <Link href="/admin/projects">Projects</Link>
                    <Link href="/admin/gallery">Gallery</Link>
                    <Link href="/admin/services">Services</Link>
                    <Link href="/admin/testimonials">Testimonials</Link>
                    <Link href="/admin/blog">Blog / News</Link>
                    <Link href="/admin/messages">Inquiries/Messages</Link>
                    <Link href="/" target="_blank" className="view-site-link">View Live Site</Link>
                </nav>
            </aside>
            <main className="admin-main">
                {children}
            </main>
        </div>
    )
}
