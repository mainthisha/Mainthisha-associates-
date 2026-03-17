import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) return { title: 'Project Not Found | Mainthisha Associates' };

    return {
        title: `${project.name} | Mainthisha Associates`,
        description: project.description,
    };
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id }
    });

    if (!project) {
        notFound();
    }

    return (
        <div>
            <section className="page-header" style={{ height: '30vh', minHeight: '250px' }}>
                <div className="container text-center animate-fade-in">
                    <h1 style={{ fontSize: '2.5rem' }}>{project.name}</h1>
                    <p>{project.type}</p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>

                    <div style={{ marginBottom: '3rem', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#eaeaea', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', position: 'relative' }}>
                        {project.imageUrl ? (
                            <Image src={project.imageUrl} alt={project.name} fill style={{ objectFit: 'cover' }} />
                        ) : (
                            <span>No Image Uploaded</span>
                        )}
                    </div>

                    <div className="grid grid-2" style={{ gap: '4rem' }}>
                        <div>
                            <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Project Overview</h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{project.description}</p>
                        </div>

                        <div>
                            <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-light)' }}>
                                <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--accent-color)', paddingBottom: '0.5rem', display: 'inline-block' }}>Project Details</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <li>
                                        <strong style={{ display: 'block', color: 'var(--text-muted)' }}>Project Name</strong>
                                        <span style={{ fontWeight: '500' }}>{project.name}</span>
                                    </li>
                                    <li>
                                        <strong style={{ display: 'block', color: 'var(--text-muted)' }}>Category / Type</strong>
                                        <span style={{ fontWeight: '500' }}>{project.type}</span>
                                    </li>
                                    <li>
                                        <strong style={{ display: 'block', color: 'var(--text-muted)' }}>Location</strong>
                                        <span style={{ fontWeight: '500' }}>{project.location}</span>
                                    </li>
                                    <li>
                                        <strong style={{ display: 'block', color: 'var(--text-muted)' }}>Status</strong>
                                        <span style={{ fontWeight: '500', color: 'green' }}>Completed</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                        <Link href="/projects" className="btn btn-outline" style={{ color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>
                            &larr; Back to All Projects
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
