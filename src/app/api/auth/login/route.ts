import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { comparePassword } from '@/lib/password';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Find user in DB
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() }
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Compare password
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Check role (only allow ADMIN to access)
        if (user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Access denied' }, { status: 403 });
        }

        // Sign token
        const token = await signToken({ email: user.email, role: user.role });

        // Create response
        const response = NextResponse.json({
            success: true,
            user: { email: user.email, name: user.name, role: user.role }
        });

        // Set secure HttpOnly cookie (no maxAge means it expires when browser is closed)
        response.cookies.set({
            name: 'admin_session',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
