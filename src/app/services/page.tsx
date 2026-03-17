export const metadata = {
    title: 'Our Services | Mainthisha Associates',
    description: 'Explore the comprehensive civil engineering and construction services offered by Mainthisha Associates, ranging from residential to industrial construction.',
};

export default function ServicesPage() {
    const services = [
        {
            title: "Residential Construction",
            description: "Building modern urban living spaces, luxury homes, and apartment complexes.",
            benefits: "High-quality finishes, ergonomic designs, and long-lasting structural strength.",
            icon: "🏠"
        },
        {
            title: "Commercial Construction",
            description: "Developing business spaces, retail units, and commercial complexes.",
            benefits: "Optimized layouts, commercial infrastructure durability, and aesthetic appeal.",
            icon: "🏢"
        },
        {
            title: "Industrial Construction",
            description: "Heavy structural steel fabrication and Pre-Engineered Buildings (PEB) for manufacturing.",
            benefits: "High load-bearing capacity, operational efficiency, and rapid deployment.",
            icon: "🏭"
        },
        {
            title: "Structural Engineering",
            description: "Comprehensive engineering analysis, design, and reinforcement strategies.",
            benefits: "Guaranteed structural safety, extreme durability, and cost-effective material usage.",
            icon: "📐"
        },
        {
            title: "Architectural Planning",
            description: "Detailed blueprints, 3D modelling, and space optimization planning.",
            benefits: "Visualizing layouts before construction, ensuring functional and beautiful spaces.",
            icon: "✏️"
        },
        {
            title: "Renovation and Remodeling",
            description: "Restoring heritage buildings and modernizing existing structures.",
            benefits: "Preserving historical character while implementing modern safety standards.",
            icon: "🔨"
        },
        {
            title: "Interior Construction",
            description: "Executing premium interior civil modifications and structural styling.",
            benefits: "Seamless integration with the main architecture and tailored functionality.",
            icon: "🛋️"
        },
        {
            title: "Infrastructure Development",
            description: "Public layout development, drainage systems, and road networks.",
            benefits: "Enhancing community livability and promoting sustainable development.",
            icon: "🌉"
        },
        {
            title: "Project Management",
            description: "End-to-end oversight covering scheduling, procurement, and site execution.",
            benefits: "On-time delivery, strict adherence to budgets, and complete peace of mind.",
            icon: "📋"
        }
    ];

    return (
        <div>
            <section className="page-header" style={{ height: '30vh', minHeight: '250px' }}>
                <div className="container text-center animate-fade-in">
                    <h1>Our Services</h1>
                    <p>Comprehensive Construction & Engineering Solutions</p>
                </div>
            </section>

            <section className="section bg-light">
                <div className="container">
                    <div className="text-center section-header">
                        <h2 className="section-title">What We Do</h2>
                        <p style={{ marginTop: '1rem', maxWidth: '800px', margin: '1rem auto' }}>
                            We offer a broad spectrum of services to cater to residential, commercial, and industrial sectors. With Mainthisha Associates, you get a full lifecycle partner for your construction needs.
                        </p>
                    </div>

                    <div className="grid grid-3">
                        {services.map((service, index) => (
                            <div key={index} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
                                <h3 style={{ marginBottom: '1rem' }}>{service.title}</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flexGrow: 1 }}>{service.description}</p>
                                <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Key Benefits:</strong>
                                    <p style={{ fontSize: '0.9rem' }}>{service.benefits}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="section section-dark text-center">
                <div className="container">
                    <h2 style={{ color: 'white' }}>Ready to Start Your Project?</h2>
                    <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Contact us today to discuss your specific requirements.</p>
                    <a href="/contact" className="btn btn-primary">Get a Quote</a>
                </div>
            </section>
        </div>
    );
}
