import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save to the public/uploads directory securely
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');

        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // dir already exists
        }

        // Sanitize filename and strictly enforce safe extensions
        let filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        if (!filename.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
            return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WEBP, AVIF allowed.' }, { status: 400 });
        }

        // Add timestamp to prevent overwriting
        filename = `${Date.now()}_${filename}`;

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Return the public URL
        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}
