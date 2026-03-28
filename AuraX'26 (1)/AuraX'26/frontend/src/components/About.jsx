export default function About() {
  const highlights = [
    { icon: '⚡', title: 'Hackathon', desc: '24-hr coding marathon with massive prizes' },
    { icon: '🤖', title: 'Robotics', desc: 'Build and battle autonomous machines' },
    { icon: '🧠', title: 'AI Workshop', desc: 'Hands-on ML model training sessions' },
    { icon: '🎮', title: 'Gaming Arena', desc: 'BGMI & Valorant esports tournament' },
    { icon: '🎨', title: 'UI Design', desc: 'Sprint-based design challenges' },
    { icon: '💻', title: 'Code Contest', desc: 'Algorithmic challenges for all levels' },
  ];

  return (
    <section id="about" className="section">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <span className="section-label">// about the fest</span>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            Where Technology<br />
            <span className="neon-text">Meets Innovation</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 20 }}>
            AuraX'26 is KGiSL Institute of Technology's flagship annual tech festival —
            a convergence of brilliance, creativity, and cutting-edge technology.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 32 }}>
            From competitive hackathons to hands-on AI workshops, robotics battles to
            esports tournaments — AuraX'26 is the arena where future tech leaders emerge.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Date', value: 'April 1, 2026' },
              { label: 'Venue', value: 'KGiSL Campus' },
              { label: 'City', value: 'Coimbatore, TN' },
            ].map(item => (
              <div key={item.label} style={{
                padding: '12px 20px', border: '1px solid var(--border)',
                borderRadius: 4, background: 'var(--glass)',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--neon)', marginTop: 4 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {highlights.map((item, i) => (
            <div key={i} className="glass-card" style={{ padding: '20px', cursor: 'default' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--neon)', letterSpacing: '0.05em', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 80, padding: '32px 40px',
        background: 'rgba(0,255,106,0.03)', border: '1px solid var(--border)', borderRadius: 8,
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--neon)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 20 }}>
          Event Day Timeline
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
          {[
            { time: '8:00', event: 'Registration' },
            { time: '9:00', event: 'Inauguration' },
            { time: '10:00', event: 'Events Begin' },
            { time: '13:00', event: 'Lunch Break' },
            { time: '14:00', event: 'Afternoon Sessions' },
            { time: '18:00', event: 'Finals' },
            { time: '20:00', event: 'Awards' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? 1 : 0 }}>
              <div style={{ textAlign: 'center', minWidth: 80 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--neon)', marginBottom: 6 }}>{item.time}</div>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--neon)', boxShadow: '0 0 8px var(--neon)', margin: '0 auto 6px' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{item.event}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--neon-dim), transparent)', minWidth: 20, marginBottom: 22 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}