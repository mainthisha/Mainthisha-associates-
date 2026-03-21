import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dpim3ccke',
    api_key: '439281631121978',
    api_secret: 'Pk3T3uE0ZaB3qAmowH5CD2PliTI',
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (!file.name.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
            return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WEBP, AVIF allowed.' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'mainthisha-associates' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        const uploadResult = result as { secure_url: string };
        return NextResponse.json({ url: uploadResult.secure_url });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}