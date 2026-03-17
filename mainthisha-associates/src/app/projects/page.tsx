import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';

export const metadata = {
    title: 'Our Projects | Mainthisha Associates',
    description: 'Explore the portfolio of infrastructure, industrial, commercial, and residential projects completed by Mainthisha Associates.',
};

export const revalidate = 0; // Disable static rendering for this page since CMS can update projects

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <section className="page-header" style={{ height: '30vh', minHeight: '250px' }}>
                <div className="container text-center animate-fade-in">
                    <h1>Our Projects</h1>
                    <p>Monumental Achievements in Engineering</p>
                </div>
            </section>

            <section className="section bg-light">
                <div className="container">
                    <div className="text-center section-header">
                        <h2 className="section-title">Portfolio</h2>
                        <p style={{ marginTop: '1rem' }}>We take pride in building structures that stand the test of time.</p>
                    </div>

                    <div className="grid grid-3">
                        {projects.map((project) => (
                            <div key={project.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: '250px', backgroundColor: '#eaeaea', position: 'relative', overflow: 'hidden' }}>
                                    {project.imageUrl ? (
                                        <Image src={project.imageUrl} alt={project.name} fill style={{ objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>{project.name}</h3>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: '600', marginBottom: '0.5rem' }}>{project.type}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>📍 {project.location}</div>
                                    <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                                        {project.description.length > 120 ? project.description.substring(0, 120) + '...' : project.description}
                                    </p>
                                    <Link href={`/projects/${project.id}`} className="btn btn-outline" style={{ color: 'var(--primary-color)', borderColor: 'var(--primary-color)', textAlign: 'center', display: 'block' }}>
                                        View Project Details
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {projects.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                                <h3>No projects found.</h3>
                                <p>Check back later for updates on our latest projects.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
