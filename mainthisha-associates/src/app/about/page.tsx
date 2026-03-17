import Image from 'next/image';

export const metadata = {
    title: 'About Us | Mainthisha Associates',
    description: 'Learn about Mainthisha Associates, our mission, vision, and our legacy of excellence in civil engineering and construction under the leadership of Mr. Satheeshkumar.',
};

export default function AboutPage() {
    return (
        <div>
            {/* Page Header */}
            <section className="page-header" style={{ height: '30vh', minHeight: '250px' }}>
                <div className="container text-center animate-fade-in">
                    <h1>About Us</h1>
                    <p>Excellence in Engineering and Construction</p>
                </div>
            </section>

            {/* Company Overview */}
            <section className="section">
                <div className="container grid grid-2">
                    <div>
                        <h2 className="section-title">Who We Are</h2>
                        <p style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
                            Mainthisha Associates is a premier civil engineering and construction company specializing in residential, commercial, industrial, and infrastructure projects. We have built our reputation on high-quality construction, reliable project execution, strong structural engineering, and modern construction techniques.
                        </p>
                        <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                            Operating under the visionary leadership of <strong>Mr. Satheeshkumar</strong>, we are committed to delivering durable and efficient buildings that stand the test of time.
                        </p>
                    </div>
                    <div style={{ position: 'relative', height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                        <Image 
                            src="/construction.jpg" 
                            alt="Mainthisha Associates Construction Team" 
                            fill 
                            style={{ objectFit: 'cover' }} 
                        />
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section section-light">
                <div className="container grid grid-2">
                    <div className="card" style={{ padding: '3rem' }}>
                        <h3 style={{ color: 'var(--accent-color)' }}>Our Mission</h3>
                        <p>
                            To provide exceptional engineering and construction services by utilizing the latest technologies, ensuring structural integrity, and exceeding client expectations through uncompromising quality and reliability.
                        </p>
                    </div>
                    <div className="card" style={{ padding: '3rem' }}>
                        <h3 style={{ color: 'var(--accent-color)' }}>Our Vision</h3>
                        <p>
                            To be the most trusted and sought-after construction and engineering firm, shaping the future of infrastructure with innovative solutions, sustainable practices, and monumental designs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values & Approach */}
            <section className="section">
                <div className="container text-center">
                    <h2 className="section-title">Core Values & Approach</h2>
                    <div className="grid grid-3" style={{ marginTop: '3rem' }}>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h4>Quality First</h4>
                            <p>We use premium materials and rigorous testing to ensure uncompromised quality.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h4>Structural Integrity</h4>
                            <p>Our engineering expertise guarantees buildings that can endure the toughest conditions.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h4>Professional Execution</h4>
                            <p>Timely delivery and transparent project management from start to finish.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h4>Innovation</h4>
                            <p>Integrating modern construction techniques for efficient and sustainable builds.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h4>Safety</h4>
                            <p>Maintaining strict safety protocols to protect our workforce and clients.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h4>Client Focus</h4>
                            <p>Working closely with clients to understand and realize their specific visions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section section-dark">
                <div className="container">
                    <h2 className="section-title text-center" style={{ color: 'white', display: 'block' }}>Our Growth Journey</h2>
                    <div style={{ maxWidth: '800px', margin: '3rem auto', position: 'relative', borderLeft: '3px solid var(--accent-color)', paddingLeft: '2rem' }}>
                        <div style={{ marginBottom: '2rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-42px', top: '0', width: '20px', height: '20px', backgroundColor: 'var(--accent-color)', borderRadius: '50%' }}></div>
                            <h4 style={{ color: 'var(--accent-color)' }}>Inception</h4>
                            <p>Founded by Mr. Satheeshkumar with a focus on local residential projects and structural consulting.</p>
                        </div>
                        <div style={{ marginBottom: '2rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-42px', top: '0', width: '20px', height: '20px', backgroundColor: 'var(--accent-color)', borderRadius: '50%' }}></div>
                            <h4 style={{ color: 'var(--accent-color)' }}>Expansion to Commercial</h4>
                            <p>Started taking on large-scale commercial complexes and expanding our engineering workforce.</p>
                        </div>
                        <div style={{ marginBottom: '2rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-42px', top: '0', width: '20px', height: '20px', backgroundColor: 'var(--accent-color)', borderRadius: '50%' }}></div>
                            <h4 style={{ color: 'var(--accent-color)' }}>Industrial Excellence</h4>
                            <p>Executed major industrial PEB and heavy structural steel manufacturing facilities.</p>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-42px', top: '0', width: '20px', height: '20px', backgroundColor: 'var(--accent-color)', borderRadius: '50%' }}></div>
                            <h4 style={{ color: 'var(--accent-color)' }}>Present Day</h4>
                            <p>Recognized as a leading civil engineering and construction firm in Tamil Nadu, delivering end-to-end infrastructure solutions.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
