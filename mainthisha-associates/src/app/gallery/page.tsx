"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

type GalleryImage = {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
};

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [filter, setFilter] = useState('All');
    const [lightboxImg, setLightboxImg] = useState<GalleryImage | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        
        const fetchGallery = async () => {
            try {
                const res = await fetch('/api/gallery', { signal: controller.signal });
                if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
                const data = await res.json();
                if (data && Array.isArray(data)) {
                    setImages(data);
                }
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.error("Gallery Fetch Error:", error);
                }
            }
        };

        fetchGallery();

        return () => controller.abort();
    }, []);

    const categories = ['All', 'Industrial', 'Residential', 'Commercial', 'Renovation'];

    const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

    return (
        <div>
            <section className="page-header" style={{ height: '30vh', minHeight: '250px' }}>
                <div className="container text-center animate-fade-in">
                    <h1>Project Gallery</h1>
                    <p>Visualizing our excellence in construction</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                                    style={filter !== cat ? { color: 'var(--primary-color)', borderColor: 'var(--primary-color)' } : {}}
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredImages.length === 0 ? (
                        <div className="text-center" style={{ padding: '4rem 0' }}>
                            <h3 style={{ color: 'var(--text-muted)' }}>No images uploaded yet.</h3>
                            <p>Use the Admin Dashboard to add images to the gallery.</p>
                        </div>
                    ) : (
                        <div className="grid grid-3" style={{ gap: '1rem' }}>
                            {filteredImages.map(img => (
                                <div
                                    key={img.id}
                                    style={{
                                        position: 'relative',
                                        height: '250px',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        borderRadius: '8px',
                                        backgroundColor: '#eaeaea'
                                    }}
                                    className="gallery-item"
                                    onClick={() => setLightboxImg(img)}
                                >
                                    {img.imageUrl ? (
                                        <Image src={img.imageUrl} alt={img.title} fill style={{ objectFit: 'cover' }} />
                                    ) : (
                                        'No Image'
                                    )}
                                    <div className="gallery-caption" style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        backgroundColor: 'rgba(0,0,0,0.7)',
                                        color: 'white',
                                        padding: '1rem',
                                        transform: 'translateY(100%)',
                                        transition: 'transform 0.3s ease'
                                    }}>
                                        <h4 style={{ color: 'white', margin: 0 }}>{img.title}</h4>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent-color)' }}>{img.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {lightboxImg && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <button
                        onClick={() => setLightboxImg(null)}
                        style={{
                            position: 'absolute',
                            top: '20px', right: '30px',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '2.5rem',
                            cursor: 'pointer'
                        }}
                    >&times;</button>

                    <div style={{ position: 'relative', width: '80%', height: '70%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: '2rem' }}>
                        {lightboxImg.imageUrl ? (
                            <img src={lightboxImg.imageUrl} alt={lightboxImg.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        ) : 'No Image'}
                    </div>
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <h3 style={{ color: 'white', margin: 0 }}>{lightboxImg.title}</h3>
                        <p style={{ color: 'var(--accent-color)', margin: 0 }}>{lightboxImg.category}</p>
                    </div>
                </div>
            )}

            <style jsx>{`
        .gallery-item:hover > div {
          transform: scale(1.05);
        }
        .gallery-item:hover .gallery-caption {
          transform: translateY(0);
        }
      `}</style>
        </div>
    );
}
