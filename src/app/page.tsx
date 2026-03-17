import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';

export const revalidate = 0; // Disable static rendering so recent projects show immediately

export default async function Home() {
  let featuredProjects: any[] = [];
  try {
    featuredProjects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    });
  } catch (error) {
    console.error("Home page Prisma error:", error);
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="page-header" style={{ height: '70vh' }}>
        <div className="container text-center animate-fade-in">
          <h1>We Build Your Dreams</h1>
          <p style={{ marginBottom: '2rem' }}>Professional Civil Engineering and Construction Services</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/projects" className="btn btn-primary">View Projects</Link>
            <Link href="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="section">
        <div className="container grid grid-2">
          <div style={{ alignSelf: 'center' }}>
            <h2>Mainthisha Associates</h2>
            <p>We are a professional civil engineering and construction company specializing in residential, commercial, industrial, and infrastructure projects.</p>
            <p>Operating under the leadership of Mr. Satheeshkumar, we focus on high-quality construction, reliable project execution, strong structural engineering, and modern construction techniques to deliver durable and efficient buildings.</p>
            <Link href="/about" className="btn btn-dark" style={{ marginTop: '1rem' }}>Read More</Link>
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

      {/* Services Overview */}
      <section className="section section-light text-center">
        <div className="container">
          <h2 className="section-title text-dark">Our Expertise</h2>
          <div className="section-header">
            <p>Comprehensive engineering and construction services tailored to your needs.</p>
          </div>
          <div className="grid grid-3">
            <div className="card" style={{ padding: '2rem' }}>
              <h3>Industrial</h3>
              <p>Heavy structural steel fabrication, PEB structures, and manufacturing facilities.</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <h3>Commercial</h3>
              <p>Business spaces, retail units, and commercial complexes with structural durability.</p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <h3>Residential</h3>
              <p>Modern urban living spaces and residential apartments built to last.</p>
            </div>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <Link href="/services" className="btn btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Animated Statistics */}
      <section className="section section-dark text-center">
        <div className="container">
          <div className="grid grid-3">
            <div>
              <h2 style={{ fontSize: '3rem', color: 'var(--accent-color)' }}>50+</h2>
              <p>Projects Completed</p>
            </div>
            <div>
              <h2 style={{ fontSize: '3rem', color: 'var(--accent-color)' }}>15+</h2>
              <p>Years of Experience</p>
            </div>
            <div>
              <h2 style={{ fontSize: '3rem', color: 'var(--accent-color)' }}>75+</h2>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview (To be made dynamic later) */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-header">
            <p>Explore some of our most monumental achievements.</p>
          </div>

          <div className="grid grid-3">
            {featuredProjects.map(project => (
              <div key={project.id} className="card">
                <div style={{ height: '200px', backgroundColor: '#eaeaea', position: 'relative', overflow: 'hidden' }}>
                  {project.imageUrl ? (
                    <Image src={project.imageUrl} alt={project.name} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No Image</div>
                  )}
                </div>
                <div style={{ padding: '1.5rem', textAlign: 'left' }}>
                  <h3 style={{ color: 'var(--primary-color)' }}>{project.name}</h3>
                  <p style={{ color: 'var(--accent-color)', fontWeight: 600 }}>{project.type}</p>
                </div>
              </div>
            ))}

            {featuredProjects.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '2rem', color: '#666' }}>No featured projects to display yet.</div>
            )}
          </div>
          <div style={{ marginTop: '3rem' }}>
            <Link href="/projects" className="btn btn-primary">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="section section-light text-center">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="section-header" style={{ marginBottom: '2rem' }}></div>
          <div className="card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1.5rem' }}>&quot;Mainthisha Associates delivered beyond our expectations. Their structural expertise and professional approach resulted in an exceptionally durable facility.&quot;</p>
            <h4>- Happy Client</h4>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/testimonials" className="btn btn-outline" style={{ color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>More Reviews</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
