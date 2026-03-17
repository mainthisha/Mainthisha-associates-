import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
    try {
        const images = await prisma.galleryImage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const imageUrl = formData.get('imageUrl') as string;

        const image = await prisma.galleryImage.create({
            data: { title, category, imageUrl }
        });

        try {
            revalidatePath('/admin/gallery');
            revalidatePath('/gallery');
        } catch (e) { }

        return NextResponse.json({ success: true, image });
    } catch (error) {
        console.error('Error saving gallery image:', error);
        return NextResponse.json({ error: 'Error saving gallery image' }, { status: 500 });
    }
}
