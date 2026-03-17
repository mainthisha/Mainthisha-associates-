'use client';

import { useState } from 'react';

export default function ImageUpload({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                onUploadComplete(data.url);
            } else {
                alert('Upload failed: ' + data.error);
            }
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Upload failed. Check console.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ padding: '1rem', border: '1px dashed #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
            <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
            {uploading && <span style={{ marginLeft: '1rem', color: 'var(--accent-color)' }}>Uploading image... please wait.</span>}
        </div>
    );
}
