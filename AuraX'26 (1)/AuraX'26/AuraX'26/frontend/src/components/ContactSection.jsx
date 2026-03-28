export function ContactSection() {
  return (
    <section id="contact" className="section">
      <span className="section-label">// contact & location</span>
      <h2 className="section-title" style={{ marginBottom: 40 }}>
        Find <span className="neon-text">Us</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
        <div>
          <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--neon)', letterSpacing: '0.08em', marginBottom: 20, textTransform: 'uppercase' }}>
              Get In Touch
            </div>
            {[
              { icon: '📍', label: 'Address', value: 'KGiSL Institute of Technology,\nSaravanampatti, Coimbatore — 641035' },
              { icon: '📧', label: 'Email', value: 'aurax@kgist.edu.in' },
              { icon: '📞', label: 'Helpline', value: '+91 94430 12345 (9AM – 6PM)' },
              { icon: '🌐', label: 'Website', value: 'www.kgist.edu.in/aurax26' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>Follow AuraX'26</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Instagram', 'LinkedIn', 'Twitter', 'YouTube'].map(platform => (
                <a key={platform} href="#" style={{
                  padding: '6px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  border: '1px solid var(--border)', borderRadius: 3,
                  color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--neon)'; e.currentTarget.style.color = 'var(--neon)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(0,255,106,0.15)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="glass-card" style={{ padding: 0, overflow: 'hidden', minHeight: 300 }}>
            <div style={{
              height: 300, position: 'relative',
              background: 'linear-gradient(135deg, #080c0a 0%, #0a1a0d 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(0,255,106,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,106,0.06) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }} />
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 400 300">
                <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(0,255,106,0.15)" strokeWidth="8" />
                <line x1="200" y1="0" x2="200" y2="300" stroke="rgba(0,255,106,0.15)" strokeWidth="5" />
                <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(0,255,106,0.07)" strokeWidth="3" />
                <line x1="0" y1="220" x2="400" y2="220" stroke="rgba(0,255,106,0.07)" strokeWidth="3" />
                <rect x="120" y="80" width="160" height="140" fill="rgba(0,255,106,0.04)" stroke="rgba(0,255,106,0.2)" strokeWidth="1" rx="4" />
                <text x="200" y="155" textAnchor="middle" fill="rgba(0,255,106,0.4)" fontSize="9" fontFamily="monospace">KGiSL Campus</text>
              </svg>
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', background: 'var(--neon)', color: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', margin: '0 auto 8px',
                  boxShadow: '0 0 20px rgba(0,255,106,0.8)',
                }} className="pulse-glow">📍</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--neon)', textShadow: '0 0 10px rgba(0,255,106,0.5)' }}>
                  KGiSL Institute of Technology
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  Saravanampatti, Coimbatore
                </div>
              </div>
              {[60, 90, 120].map((r, i) => (
                <div key={i} style={{
                  position: 'absolute', width: r, height: r, borderRadius: '50%',
                  border: '1px solid rgba(0,255,106,0.15)',
                  top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  animation: `pulse-glow ${2 + i * 0.5}s ease-in-out infinite`,
                }} />
              ))}
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)' }}>
              <a href="https://maps.google.com/?q=KGiSL+Institute+of+Technology+Coimbatore" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--neon)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                Open in Google Maps →
              </a>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 20, marginTop: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>How to Reach</div>
            {[
              { icon: '🚌', mode: 'Bus', desc: 'Route 17 from Gandhipuram — alight at KGiSL Stop' },
              { icon: '🚕', mode: 'Cab', desc: 'Search "KGiSL Saravanampatti" on Ola/Uber' },
              { icon: '🚂', mode: 'Train', desc: '12km from Coimbatore Junction (Cab recommended)' },
            ].map(item => (
              <div key={item.mode} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <span>{item.icon}</span>
                <div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--neon)', marginRight: 6 }}>{item.mode}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '40px', background: 'rgba(0,0,0,0.4)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--neon)', textShadow: '0 0 15px rgba(0,255,106,0.4)' }}>
              AURAX'26
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em', marginTop: 4 }}>
              Innovation Ignites the Future
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['#about', '#events', '#schedule', '#resources', '#faq', '#dashboard', '#pass'].map(href => (
              <a key={href} href={href} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)',
                textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px', transition: 'color 0.2s',
              }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--neon)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {href.slice(1)}
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingTop: 20, borderTop: '1px solid rgba(0,255,106,0.06)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
            © 2026 KGiSL Institute of Technology. All rights reserved.
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
            Designed for AuraX'26 Tech Fest
          </div>
        </div>
      </div>
    </footer>
  );
}