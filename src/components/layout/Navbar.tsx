import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <Link href="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Image src="/logo.jpg" alt="Mainthisha Associates Logo" width={50} height={50} style={{ objectFit: 'contain' }} />
                    <div>
                        <div style={{ lineHeight: '1' }}>MAINTHISHA <span style={{ color: 'var(--secondary-color)' }}>ASSOCIATES</span></div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600, marginTop: '2px', letterSpacing: '1px' }}>Engineer&apos;s & Builder&apos;s</div>
                    </div>
                </Link>
                <div className="nav-links">
                    <Link href="/">Home</Link>
                    <Link href="/about">About Us</Link>
                    <Link href="/services">Services</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/gallery">Gallery</Link>
                    <Link href="/testimonials">Testimonials</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact" className="btn btn-primary" style={{ padding: '0.4rem 1.2rem' }}>Contact Us</Link>
                </div>
                <button className="mobile-menu-btn">☰</button>
            </div>
        </nav>
    );
}
