import Link from 'next/link';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import './admin.css';

export const metadata = {
    title: 'Admin Dashboard | Mainthisha Associates',
    description: 'Manage the website content for Mainthisha Associates',
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const headerList = await headers();
    const pathname = headerList.get('x-pathname') || '';

    // If on login page, render children directly without dashboard structure
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    async function handleLogout() {
        'use server';
        const cookieStore = await cookies();
        cookieStore.delete('admin_session');
        redirect('/admin/login');
    }

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
                    <Link href="/admin/settings">Account Settings</Link>
                    <Link href="/" target="_blank" className="view-site-link">View Live Site</Link>
                </nav>
                <form action={handleLogout} className="logout-form">
                    <button type="submit" className="logout-btn">
                        <span>🚪</span> Logout
                    </button>
                </form>
            </aside>
            <main className="admin-main">
                {children}
            </main>
        </div>
    )
}
