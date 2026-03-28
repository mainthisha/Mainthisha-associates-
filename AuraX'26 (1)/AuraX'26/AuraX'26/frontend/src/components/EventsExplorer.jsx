import { useState } from 'react';
import { useApp } from '../App';
import { EVENTS, INTEREST_CATEGORIES } from '../data/events';

function ClashWarning({ events }) {
  const clashes = [];
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const a = events[i], b = events[j];
      const aStart = parseInt(a.startTime.replace(':', ''));
      const aEnd = parseInt(a.endTime.replace(':', ''));
      const bStart = parseInt(b.startTime.replace(':', ''));
      const bEnd = parseInt(b.endTime.replace(':', ''));
      if (aStart < bEnd && bStart < aEnd) {
        clashes.push({ a, b });
      }
    }
  }
  if (!clashes.length) return null;
  return (
    <div style={{
      padding: '16px 20px', borderRadius: 8, marginBottom: 24,
      background: 'rgba(255, 170, 0, 0.06)',
      border: '1px solid rgba(255, 170, 0, 0.3)',
    }}>
      {clashes.map((clash, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ fontSize: '1rem' }}>⚠️</span>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--warning)' }}>
              Schedule Clash Detected
            </span>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#c8a94a', marginTop: 4 }}>
              <strong>{clash.a.name}</strong> ({clash.a.startTime}–{clash.a.endTime}) overlaps with{' '}
              <strong>{clash.b.name}</strong> ({clash.b.startTime}–{clash.b.endTime}).
              You may miss part of one event.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function QueueBar({ filled, total }) {
  const pct = (filled / total) * 100;
  const color = pct >= 90 ? '#ff4444' : pct >= 70 ? 'var(--warning)' : 'var(--neon)';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
          Seats: {filled}/{total}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color }}>
          {pct >= 90 ? 'Almost Full' : pct >= 70 ? 'Filling Fast' : 'Available'}
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}` }} />
      </div>
      {pct >= 70 && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 4 }}>
          Est. wait: ~{Math.round((pct / 100) * 15)} min
        </div>
      )}
    </div>
  );
}

function EventCard({ event, isRegistered, isBookmarked, onRegister, onBookmark }) {
  return (
    <div className="glass-card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: event.color, boxShadow: `0 0 10px ${event.color}` }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
            {event.tags.map(t => (
              <span key={t} className="tag" style={{ borderColor: `${event.color}40`, color: event.color }}>
                {t}
              </span>
            ))}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
            {event.name}
          </h3>
        </div>
        <button
          onClick={() => onBookmark(event.id)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1rem', color: isBookmarked ? 'var(--warning)' : 'var(--text-muted)',
            padding: 4, transition: 'color 0.2s', marginLeft: 8,
          }}
        >⭐</button>
      </div>

      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>
        {event.description}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[
          { label: 'Time', value: `${event.startTime} – ${event.endTime}` },
          { label: 'Venue', value: event.venue },
          { label: 'Team', value: event.team },
          { label: 'Prize', value: event.prize },
        ].map(item => (
          <div key={item.label} style={{ padding: '8px 10px', background: 'rgba(0,255,106,0.03)', borderRadius: 4, border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{item.label}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: 2 }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        <QueueBar filled={event.seats.filled} total={event.seats.total} />
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 14, flexWrap: 'wrap' }}>
        {event.stages.map((stage, i) => {
          const status = i < event.stage ? 'done' : i === event.stage ? 'current' : 'locked';
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              color: status === 'done' ? 'var(--neon)' : status === 'current' ? 'var(--warning)' : 'var(--text-muted)',
            }}>
              <span>{status === 'done' ? '✅' : status === 'current' ? '⏳' : '🔒'}</span>
              {stage}
              {i < event.stages.length - 1 && <span style={{ color: 'var(--text-muted)', marginLeft: 2 }}>›</span>}
            </div>
          );
        })}
      </div>

      {event.techStack.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {event.techStack.map(tech => (
            <span key={tech} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              padding: '2px 8px', borderRadius: 2,
              background: 'rgba(0,200,255,0.06)', border: '1px solid rgba(0,200,255,0.2)',
              color: '#00ccff',
            }}>{tech}</span>
          ))}
        </div>
      )}

      <button
        onClick={() => onRegister(event.id)}
        style={{
          width: '100%', padding: '10px',
          fontFamily: 'var(--font-display)', fontSize: '0.65rem',
          fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          border: `1px solid ${isRegistered ? 'rgba(255,68,68,0.4)' : event.color}`,
          borderRadius: 4,
          background: isRegistered ? 'rgba(255,68,68,0.08)' : `${event.color}15`,
          color: isRegistered ? '#ff4444' : event.color,
          cursor: 'pointer', transition: 'all 0.2s',
        }}
      >
        {isRegistered ? 'Unregister' : 'Register for Event'}
      </button>
    </div>
  );
}

export default function EventsExplorer() {
  const { interests, bookmarks, toggleBookmark, registeredEvents, toggleRegister } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showSuggested, setShowSuggested] = useState(interests.length > 0);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', ...INTEREST_CATEGORIES];

  const filteredEvents = EVENTS.filter(e => {
    const matchFilter = activeFilter === 'All' || e.tags.includes(activeFilter);
    const matchSearch = !searchQuery || e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const suggestedEvents = interests.length > 0
    ? EVENTS.filter(e => e.tags.some(t => interests.includes(t)))
    : [];

  const registeredEventObjects = EVENTS.filter(e => registeredEvents.includes(e.id));

  return (
    <section id="events" className="section">
      <span className="section-label">// events explorer</span>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <h2 className="section-title">
          Explore <span className="neon-text">Events</span>
        </h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {interests.length > 0 && (
            <button
              onClick={() => setShowSuggested(!showSuggested)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                padding: '7px 14px',
                border: `1px solid ${showSuggested ? 'var(--neon)' : 'var(--border)'}`,
                background: showSuggested ? 'rgba(0,255,106,0.08)' : 'transparent',
                color: showSuggested ? 'var(--neon)' : 'var(--text-muted)',
                borderRadius: 4, cursor: 'pointer', letterSpacing: '0.1em',
                textTransform: 'uppercase', transition: 'all 0.2s',
              }}
            >
              ✨ Suggested
            </button>
          )}
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            style={{ width: 200, padding: '7px 12px', fontSize: '0.8rem' }}
          />
        </div>
      </div>

      <ClashWarning events={registeredEventObjects} />

      {showSuggested && suggestedEvents.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--neon)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
            ✨ Recommended for You — based on your interests ({interests.join(', ')})
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {suggestedEvents.slice(0, 3).map(event => (
              <EventCard
                key={event.id}
                event={event}
                isRegistered={registeredEvents.includes(event.id)}
                isBookmarked={bookmarks.includes(event.id)}
                onRegister={toggleRegister}
                onBookmark={toggleBookmark}
              />
            ))}
          </div>
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,255,106,0.2), transparent)', margin: '32px 0' }} />
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              padding: '7px 16px', borderRadius: 3,
              border: `1px solid ${activeFilter === f ? 'var(--neon)' : 'var(--border)'}`,
              background: activeFilter === f ? 'rgba(0,255,106,0.1)' : 'transparent',
              color: activeFilter === f ? 'var(--neon)' : 'var(--text-muted)',
              cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            event={event}
            isRegistered={registeredEvents.includes(event.id)}
            isBookmarked={bookmarks.includes(event.id)}
            onRegister={toggleRegister}
            onBookmark={toggleBookmark}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          No events found for "{searchQuery}"
        </div>
      )}

      {bookmarks.length > 0 && (
        <div style={{ marginTop: 48, padding: '24px', background: 'rgba(255,170,0,0.04)', border: '1px solid rgba(255,170,0,0.2)', borderRadius: 8 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--warning)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            ⭐ Bookmarked Events
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {EVENTS.filter(e => bookmarks.includes(e.id)).map(e => (
              <span key={e.id} style={{
                padding: '4px 12px',
                background: 'rgba(255,170,0,0.06)', border: '1px solid rgba(255,170,0,0.3)',
                borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--warning)',
              }}>
                ⭐ {e.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}