import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SettingsForm from '@/components/SettingsForm';

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    if (!token) {
        redirect('/admin/login');
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
        redirect('/admin/login');
    }

    const user = await prisma.user.findUnique({
        where: { email: payload.email },
        select: { name: true, email: true }
    });

    if (!user) {
        redirect('/admin/login');
    }

    return (
        <div>
            <div className="admin-header">
                <h1>Account Settings</h1>
                <p>Update your administrator profile credentials and password.</p>
            </div>

            <div className="admin-panel" style={{ maxWidth: '600px' }}>
                <SettingsForm initialUser={user} />
            </div>
        </div>
    );
}
