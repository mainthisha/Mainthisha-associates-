import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken, signToken } from '@/lib/auth';
import { hashPassword } from '@/lib/password';

export async function POST(request: NextRequest) {
    try {
        // 1. Verify user session
        const token = request.cookies.get('admin_session')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload || payload.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
        }

        // 2. Parse request body
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and Email are required.' }, { status: 400 });
        }

        // 3. Find current user
        const currentUser = await prisma.user.findUnique({
            where: { email: payload.email }
        });

        if (!currentUser) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        // 4. Validate if new email is already in use by another user
        const normalizedNewEmail = email.toLowerCase().trim();
        if (normalizedNewEmail !== currentUser.email) {
            const emailTaken = await prisma.user.findUnique({
                where: { email: normalizedNewEmail }
            });
            if (emailTaken) {
                return NextResponse.json({ error: 'Email address is already in use.' }, { status: 400 });
            }
        }

        // 5. Update data object
        const updateData: any = {
            name: name.trim(),
            email: normalizedNewEmail,
        };

        if (password && password.trim() !== '') {
            if (password.length < 8) {
                return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
            }
            updateData.password = await hashPassword(password);
        }

        // 6. Save updates
        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: updateData
        });

        // 7. Create response and update session cookie
        const response = NextResponse.json({
            success: true,
            user: { email: updatedUser.email, name: updatedUser.name, role: updatedUser.role }
        });

        // Re-sign token if email changed (or to renew expiration)
        const newToken = await signToken({ email: updatedUser.email, role: updatedUser.role });
        response.cookies.set({
            name: 'admin_session',
            value: newToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Settings update error:', error);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
