import { useState, useEffect } from 'react';
import { useApp } from '../App';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Resources', href: '#resources' },
  { label: 'Mentors', href: '#mentors' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Pass', href: '#pass' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { user } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav style={{ borderBottomColor: scrolled ? 'rgba(0,255,106,0.25)' : 'rgba(0,255,106,0.1)' }}>
      <a href="#hero" className="nav-logo flicker">
        AuraX<span style={{ color: '#fff', textShadow: 'none' }}>'</span>26
      </a>

      <ul className="nav-links">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {user && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 14px',
            border: '1px solid rgba(0,255,106,0.3)',
            borderRadius: 4,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'var(--neon)', color: '#000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700,
            }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--neon)' }}>
              {user.name?.split(' ')[0]}
            </span>
          </div>
        )}
        <a href="#events" className="btn-neon" style={{ padding: '8px 16px', fontSize: '0.65rem', textDecoration: 'none' }}>
          <span>Register</span>
        </a>
      </div>
    </nav>
  );
}