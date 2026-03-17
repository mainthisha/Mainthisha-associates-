import prisma from '@/lib/prisma';

export const metadata = {
    title: 'Client Testimonials | Mainthisha Associates',
    description: 'Read reviews and testimonials from our satisfied clients about our civil engineering and construction projects.',
};

export const revalidate = 0;

export default async function TestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <section className="page-header" style={{ height: '30vh', minHeight: '250px' }}>
                <div className="container text-center animate-fade-in">
                    <h1>Client Testimonials</h1>
                    <p>What our clients say about us</p>
                </div>
            </section>

            <section className="section bg-light">
                <div className="container">
                    <div className="text-center section-header">
                        <h2 className="section-title">Trusted by Industry Leaders</h2>
                    </div>

                    <div className="grid grid-3">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ color: '#FFD700', fontSize: '1.5rem', marginBottom: '1rem' }}>
                                    {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                                </div>
                                <p style={{ fontStyle: 'italic', fontSize: '1.05rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                                    &quot;{testimonial.review}&quot;
                                </p>
                                <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                    <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--primary-color)' }}>{testimonial.clientName}</strong>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Project: {testimonial.projectRef}</span>
                                </div>
                            </div>
                        ))}

                        {testimonials.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                                <h3 style={{ color: 'var(--text-muted)' }}>No testimonials available yet.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
