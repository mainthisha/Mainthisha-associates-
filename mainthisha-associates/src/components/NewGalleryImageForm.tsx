'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';

export default function NewGalleryImageForm() {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        formData.append('imageUrl', imageUrl);

        const response = await fetch('/api/gallery', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            router.refresh();
            // Reset form completely
            const form = e.target as HTMLFormElement;
            form.reset();
            setImageUrl('');
            setIsSubmitting(false);
        } else {
            alert("Failed to save image.");
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <div className="form-group">
                <label className="form-label">Image Title</label>
                <input type="text" name="title" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="form-label">Category</label>
                <select name="category" className="form-control" required>
                    <option value="Industrial">Industrial</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Renovation">Renovation</option>
                </select>
            </div>
            <div className="form-group">
                <label className="form-label">Upload Image</label>
                <ImageUpload onUploadComplete={(url) => setImageUrl(url)} />
                {imageUrl && (
                    <div style={{ marginTop: '1rem' }}>
                        <p style={{ color: 'green', fontSize: '0.9rem', marginBottom: '0.5rem' }}>✓ Image Uploaded Successfully</p>
                        <img src={imageUrl} alt="Preview" style={{ height: '100px', borderRadius: '4px' }} />
                    </div>
                )}
            </div>
            <button type="submit" className="admin-btn" disabled={isSubmitting || !imageUrl}>
                {isSubmitting ? 'Uploading...' : 'Save Gallery Image'}
            </button>
        </form>
    );
}
