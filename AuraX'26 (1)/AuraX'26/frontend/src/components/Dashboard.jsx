import { useApp } from '../App';
import { EVENTS } from '../data/events';

export default function Dashboard() {
  const { user, registeredEvents, bookmarks, toggleRegister } = useApp();

  const myEvents = EVENTS.filter(e => registeredEvents.includes(e.id));
  const savedEvents = EVENTS.filter(e => bookmarks.includes(e.id));

  if (!user) {
    return (
      <section id="dashboard" className="section">
        <span className="section-label">// personalized dashboard</span>
        <h2 className="section-title" style={{ marginBottom: 32 }}>
          Fest <span className="neon-text">Dashboard</span>
        </h2>
        <div style={{
          padding: '60px 40px', textAlign: 'center',
          background: 'rgba(0,255,106,0.02)', border: '1px dashed rgba(0,255,106,0.2)', borderRadius: 8,
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>🔐</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: 8 }}>
            Dashboard Locked
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', maxWidth: 400, margin: '0 auto' }}>
            Reload the page to complete onboarding, or register for events to start tracking your schedule.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="section">
      <span className="section-label">// personalized dashboard</span>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <h2 className="section-title">
          Fest <span className="neon-text">Dashboard</span>
        </h2>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          Welcome back, <span style={{ color: 'var(--neon)' }}>{user.name}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Registered Events', value: myEvents.length, color: 'var(--neon)' },
          { label: 'Bookmarked', value: savedEvents.length, color: 'var(--warning)' },
          { label: 'Events on April 1', value: EVENTS.length, color: '#00ccff' },
          { label: 'Prize Pool', value: '₹1.5L', color: '#ff6600' },
        ].map(stat => (
          <div key={stat.label} style={{
            padding: '20px 16px', textAlign: 'center',
            background: 'rgba(0,255,106,0.03)', border: '1px solid var(--border)', borderRadius: 8,
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: stat.color, textShadow: `0 0 15px ${stat.color}60` }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--neon)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
            📋 Registered Events
          </div>
          {myEvents.length === 0 ? (
            <div style={{ padding: '24px', background: 'rgba(0,255,106,0.02)', border: '1px dashed var(--border)', borderRadius: 6, textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
              No events registered yet. <a href="#events" style={{ color: 'var(--neon)' }}>Explore events →</a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {myEvents.map(event => (
                <div key={event.id} className="glass-card" style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: event.color, letterSpacing: '0.04em' }}>
                      {event.name}
                    </div>
                    <button onClick={() => toggleRegister(event.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.7rem' }}>✕</button>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {[
                      { icon: '🕐', label: `${event.startTime}–${event.endTime}` },
                      { icon: '📍', label: event.venue },
                      { icon: '🏆', label: event.prize },
                    ].map(item => (
                      <span key={item.label} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                        {item.icon} {item.label}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 8, padding: '6px 10px', background: 'rgba(0,255,106,0.04)', borderRadius: 3, border: '1px solid rgba(0,255,106,0.1)', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--neon)' }}>
                    🔔 Reminder: Be there 10 min early with your Digital Pass
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--warning)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
            ⭐ Saved Events
          </div>
          {savedEvents.length === 0 ? (
            <div style={{ padding: '24px', background: 'rgba(255,170,0,0.02)', border: '1px dashed rgba(255,170,0,0.2)', borderRadius: 6, textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
              Bookmark events using ⭐ in the Events section.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {savedEvents.map(event => (
                <div key={event.id} className="glass-card" style={{ padding: '14px 16px', borderColor: 'rgba(255,170,0,0.2)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: event.color, marginBottom: 4 }}>
                    ⭐ {event.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                    {event.startTime}–{event.endTime} · {event.venue}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 24, padding: '16px', background: 'rgba(0,200,255,0.03)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: 6 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00ccff', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
              👤 Your Profile
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 4 }}>{user.name}</div>
            {user.college && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginBottom: 4 }}>{user.college}</div>}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
              {user.interests?.map(i => (
                <span key={i} className="tag">{i}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}