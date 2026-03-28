import ContactForm from '@/components/ContactForm';

export const metadata = {
    title: 'Contact Us | Mainthisha Associates',
    description: 'Get in touch with Mainthisha Associates for your next construction or civil engineering project in Coimbatore and Tamil Nadu.',
};

export default function ContactPage() {
    return (
        <div>
            <section className="page-header" style={{ height: '30vh', minHeight: '250px' }}>
                <div className="container text-center animate-fade-in">
                    <h1>Contact Us</h1>
                    <p>We&apos;re here to build your dreams</p>
                </div>
            </section>

            <section className="section bg-light">
                <div className="container grid grid-2" style={{ gap: '4rem' }}>

                    {/* Contact Details */}
                    <div>
                        <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Get In Touch</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                            Ready to start your next big project? Contact Mainthisha Associates today for professional civil engineering and construction services.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ fontSize: '2rem', color: 'var(--accent-color)' }}>📍</div>
                                <div>
                                    <h4 style={{ marginBottom: '0.3rem' }}>Office Address</h4>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                        2/476 &apos;E&apos; Teacher&apos;s Colony<br />
                                        Chinniampalayam<br />
                                        Coimbatore – 641062<br />
                                        Tamil Nadu, India
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ fontSize: '2rem', color: 'var(--accent-color)' }}>📞</div>
                                <div>
                                    <h4 style={{ marginBottom: '0.3rem' }}>Phone</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>8675557444</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ fontSize: '2rem', color: 'var(--accent-color)' }}>✉️</div>
                                <div>
                                    <h4 style={{ marginBottom: '0.3rem' }}>Email</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>mainthishaassociate@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card" style={{ padding: '3rem', backgroundColor: 'var(--bg-color)' }}>
                        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>Send us a Message</h3>
                        <ContactForm />
                    </div>

                </div>
            </section>

            {/* Embedded Google Maps */}
            <section style={{ height: '400px', backgroundColor: '#eaeaea' }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1557007205466!2d77.0620076!3d11.0269324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8565b9d29ebf%3A0x6bba31d06ff966bc!2sTeachers%20Colony%2C%20Chinniyampalayam%2C%20Coimbatore%2C%20Tamil%20Nadu%20641062!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </section>
        </div>
    );
}
