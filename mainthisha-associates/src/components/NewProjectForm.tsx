'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';

export default function NewProjectForm() {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        formData.append('imageUrl', imageUrl);

        // Call server action API directly since we can't cleanly mix Client Components inside Server Actions without props passing
        const response = await fetch('/api/projects', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            router.push('/admin/projects');
            router.refresh();
        } else {
            alert("Failed to save project.");
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Project Name</label>
                <input type="text" name="name" className="form-control" required />
            </div>

            <div className="form-group grid grid-2">
                <div>
                    <label className="form-label">Project Type / Category</label>
                    <input type="text" name="type" className="form-control" placeholder="e.g. Industrial Construction" required />
                </div>
                <div>
                    <label className="form-label">Location</label>
                    <input type="text" name="location" className="form-control" placeholder="e.g. Coimbatore, Tamil Nadu" required />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Short Description</label>
                <textarea name="description" className="form-control" style={{ minHeight: '120px' }} required></textarea>
            </div>

            <div className="form-group">
                <label className="form-label">Project Image</label>
                <ImageUpload onUploadComplete={(url) => setImageUrl(url)} />
                {imageUrl && (
                    <div style={{ marginTop: '1rem' }}>
                        <p style={{ color: 'green', fontSize: '0.9rem', marginBottom: '0.5rem' }}>✓ Image Uploaded Successfully</p>
                        <img src={imageUrl} alt="Preview" style={{ height: '100px', borderRadius: '4px' }} />
                    </div>
                )}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button type="submit" className="admin-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Project'}
                </button>
                <button type="button" onClick={() => router.push('/admin/projects')} className="admin-btn" style={{ backgroundColor: '#666' }} disabled={isSubmitting}>Cancel</button>
            </div>
        </form>
    );
}
