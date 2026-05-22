import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Inject pathname into request headers for layout server components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', pathname);
    
    const next = () => NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });

    // 1. Skip middleware for static assets, public folder, etc.
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.includes('.')
    ) {
        return next();
    }

    // 2. Protect Admin Pages (/admin/...)
    if (pathname.startsWith('/admin')) {
        // Bypass login page itself to prevent infinite loops
        if (pathname === '/admin/login') {
            const token = request.cookies.get('admin_session')?.value;
            if (token) {
                const payload = await verifyToken(token);
                if (payload && payload.role === 'ADMIN') {
                    // Already logged in, redirect to dashboard
                    return NextResponse.redirect(new URL('/admin', request.url));
                }
            }
            return next();
        }

        const token = request.cookies.get('admin_session')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        const payload = await verifyToken(token);
        if (!payload || payload.role !== 'ADMIN') {
            // Delete cookie since it's invalid
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin_session');
            return response;
        }

        return next();
    }

    // 3. Protect Modifying APIs (/api/projects, /api/gallery, /api/upload)
    const protectedApis = ['/api/projects', '/api/gallery', '/api/upload'];
    const isProtectedApi = protectedApis.some(api => pathname === api || pathname.startsWith(api + '/'));

    if (isProtectedApi) {
        // Allow GET requests for projects and gallery so visitors can read content
        if (request.method === 'GET') {
            return next();
        }

        // For POST, PUT, DELETE, check admin authentication
        const token = request.cookies.get('admin_session')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized. Login required.' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload || payload.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 401 });
        }

        return next();
    }

    return next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/projects/:path*',
        '/api/gallery/:path*',
        '/api/upload/:path*',
    ],
};
