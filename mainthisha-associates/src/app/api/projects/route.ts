import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const type = formData.get('type') as string;
        const location = formData.get('location') as string;
        const description = formData.get('description') as string;
        const imageUrl = formData.get('imageUrl') as string;

        const project = await prisma.project.create({
            data: { name, type, location, description, imageUrl }
        });

        // Attempt cache revalidation for routes, might be constrained in Edge but we fail silently on build-errors
        try {
            revalidatePath('/admin/projects');
            revalidatePath('/projects');
        } catch (e) { }

        return NextResponse.json({ success: true, project });
    } catch (error) {
        console.error('Error saving project:', error);
        return NextResponse.json({ error: 'Error saving project' }, { status: 500 });
    }
}
