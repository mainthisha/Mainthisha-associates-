import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';

export const revalidate = 0;

export default async function Home() {
  let featuredProjects: any[] = [];

  // ✅ SAFE DATABASE CALL (prevents website crash)
  try {
    featuredProjects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    });
  } catch (error) {
    console.log("DB error or connection failed:", error);
    featuredProjects = [];
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="page-header" style={{ height: '70vh' }}>
        <div className="container text-center animate-fade-in">
          <h1>We Build Your Dreams</h1>
          <p style={{ marginBottom: '2rem' }}>
            Professional Civil Engineering and Construction Services
          </p>
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
            <p>
              We are a professional civil engineering and construction company specializing in residential, commercial, industrial, and infrastructure projects.
            </p>
            <p>
              Operating under the leadership of Mr. Satheeshkumar, we focus on high-quality construction, reliable project execution, strong structural engineering, and modern construction techniques.
            </p>
            <Link href="/about" className="btn btn-dark" style={{ marginTop: '1rem' }}>
              Read More
            </Link>
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

      {/* Services */}
      <section className="section section-light text-center">
        <div className="container">
          <h2 className="section-title text-dark">Our Expertise</h2>

          <div className="grid grid-3">
            <div className="card" style={{ padding: '2rem' }}>
              <h3>Industrial</h3>
              <p>Heavy structural steel fabrication and industrial buildings.</p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <h3>Commercial</h3>
              <p>Business spaces and commercial complexes with durability.</p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <h3>Residential</h3>
              <p>Modern homes and apartments built for long-term living.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section-dark text-center">
        <div className="container">
          <div className="grid grid-3">
            <div>
              <h2 style={{ fontSize: '3rem' }}>50+</h2>
              <p>Projects Completed</p>
            </div>
            <div>
              <h2 style={{ fontSize: '3rem' }}>15+</h2>
              <p>Years of Experience</p>
            </div>
            <div>
              <h2 style={{ fontSize: '3rem' }}>75+</h2>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">Featured Projects</h2>

          <div className="grid grid-3">
            {featuredProjects.map(project => (
              <div key={project.id} className="card">
                <div style={{ height: '200px', position: 'relative' }}>
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                      No Image
                    </div>
                  )}
                </div>

                <div style={{ padding: '1rem', textAlign: 'left' }}>
                  <h3>{project.name}</h3>
                  <p>{project.type}</p>
                </div>
              </div>
            ))}

            {featuredProjects.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '2rem' }}>
                No featured projects to display yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-light text-center">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>

          <div className="card" style={{ padding: '3rem', maxWidth: '800px', margin: 'auto' }}>
            <p style={{ fontStyle: 'italic' }}>
              "Mainthisha Associates delivered beyond expectations."
            </p>
            <h4>- Happy Client</h4>
          </div>
        </div>
      </section>
    </div>
  );
}