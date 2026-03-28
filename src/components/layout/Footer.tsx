import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top grid grid-4">
                    <div className="footer-col">
                        <h4>Mainthisha Associates</h4>
                        <div style={{ color: 'var(--accent-color)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>Engineer&apos;s & Builder&apos;s</div>
                        <p>Professional civil engineering and construction company specializing in residential, commercial, industrial, and infrastructure projects.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <Link href="/about">About Us</Link>
                        <Link href="/services">Our Services</Link>
                        <Link href="/projects">Projects</Link>
                        <Link href="/gallery">Gallery</Link>
                    </div>
                    <div className="footer-col">
                        <h4>Support</h4>
                        <Link href="/testimonials">Testimonials</Link>
                        <Link href="/blog">News & Updates</Link>
                        <Link href="/contact">Contact Us</Link>
                        <Link href="/admin">Admin Login</Link>
                    </div>
                    <div className="footer-col">
                        <h4>Contact Info</h4>
                        <p>2/476 'E' Teacher's Colony<br />Chinniampalayam<br />Coimbatore – 641062<br />Tamil Nadu, India</p>
                        <p>Phone: 8675557444</p>
                        <p>Email: mainthishaassociate@gmail.com</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Mainthisha Associates. All rights reserved. | Head of Company: Mr. Satheeshkumar</p>
                </div>
            </div>
        </footer>
    );
}
