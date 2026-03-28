'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

export default function BlogImageUploadField() {
    const [imageUrl, setImageUrl] = useState('');

    return (
        <>
            <ImageUpload onUploadComplete={(url) => setImageUrl(url)} />
            {imageUrl && (
                <div style={{ marginTop: '1rem' }}>
                    <p style={{ color: 'green', fontSize: '0.9rem', marginBottom: '0.5rem' }}>✓ Image Uploaded Successfully</p>
                    <img src={imageUrl} alt="Preview" style={{ height: '100px', borderRadius: '4px' }} />
                </div>
            )}
            {/* This hidden input ensures the Server Action receives the uploaded image URL */}
            <input type="hidden" name="imageUrl" value={imageUrl} />
        </>
    );
}
