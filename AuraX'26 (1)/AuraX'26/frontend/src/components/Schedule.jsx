import { useState } from 'react';
import { EVENTS } from '../data/events';

const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

const SCHEDULE_EVENTS = EVENTS.map(e => {
  const timeStr = e.time || '09:00 – 10:00';
  const parts = timeStr.split('–').map(t => t.trim());
  const startTime = parts[0] || '09:00';
  const endTime = parts[1] || startTime;
  return {
    id: e.id,
    name: e.title,
    startTime,
    endTime,
    venue: e.venue,
    color: e.accentColor || '#00FF88',
  };
});

function toMinutes(time) {
  if (!time || typeof time !== 'string') return 0;
  const [h, m] = time.trim().split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

const startHour = 8 * 60;
const totalMins = 13 * 60;

export default function Schedule() {
  const [tooltip, setTooltip] = useState(null);

  return (
    <section id="schedule" className="section">
      <span className="section-label">// event schedule</span>
      <h2 className="section-title" style={{ marginBottom: 40 }}>
        Day <span className="neon-text">Timeline</span>
      </h2>

      <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
        <div style={{ minWidth: 800 }}>
          <div style={{ display: 'flex', marginBottom: 8, paddingLeft: 120 }}>
            {HOURS.map(h => (
              <div key={h} style={{
                flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: 'var(--text-muted)', letterSpacing: '0.1em',
              }}>{h}</div>
            ))}
          </div>

          <div style={{ display: 'flex', paddingLeft: 120, marginBottom: 12 }}>
            {HOURS.map(h => (
              <div key={h} style={{ flex: 1, borderLeft: '1px solid rgba(0,255,106,0.1)', height: 6 }} />
            ))}
          </div>

          {SCHEDULE_EVENTS.map(event => {
            const startMin = toMinutes(event.startTime) - startHour;
            const endMin = toMinutes(event.endTime) - startHour;
            const leftPct = Math.max(0, (startMin / totalMins) * 100);
            const widthPct = Math.max(2, ((endMin - startMin) / totalMins) * 100);

            return (
              <div key={event.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 10, height: 40 }}>
                <div style={{
                  width: 120, flexShrink: 0, paddingRight: 12,
                  fontFamily: 'var(--font-display)', fontSize: '0.6rem',
                  color: 'var(--text-secondary)', letterSpacing: '0.05em',
                  textAlign: 'right', whiteSpace: 'nowrap',
                  overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {event.name}
                </div>
                <div style={{ flex: 1, position: 'relative', height: 36, background: 'rgba(255,255,255,0.02)', borderRadius: 4 }}>
                  <div
                    onMouseEnter={(e) => setTooltip({ event, x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setTooltip(null)}
                    onMouseOver={e => { e.currentTarget.style.background = `${event.color}40`; }}
                    onMouseOut={e => { e.currentTarget.style.background = `${event.color}25`; }}
                    style={{
                      position: 'absolute',
                      left: `${leftPct}%`,
                      width: `${widthPct}%`,
                      top: 4, bottom: 4,
                      background: `${event.color}25`,
                      border: `1px solid ${event.color}80`,
                      borderRadius: 4, cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', paddingLeft: 8,
                      overflow: 'hidden',
                      boxShadow: `0 0 10px ${event.color}30`,
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                      color: event.color, whiteSpace: 'nowrap', letterSpacing: '0.05em',
                    }}>
                      {event.startTime}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {tooltip && (
        <div style={{
          position: 'fixed',
          top: tooltip.y - 80, left: tooltip.x + 10,
          zIndex: 999,
          background: '#0a0f0c', border: `1px solid ${tooltip.event.color}60`,
          borderRadius: 6, padding: '10px 14px',
          boxShadow: `0 0 20px ${tooltip.event.color}30`,
          pointerEvents: 'none',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: tooltip.event.color, marginBottom: 4 }}>
            {tooltip.event.name}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
            {tooltip.event.startTime} – {tooltip.event.endTime} · {tooltip.event.venue}
          </div>
        </div>
      )}

      <div style={{ marginTop: 32, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {SCHEDULE_EVENTS.map(e => (
          <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: e.color, boxShadow: `0 0 6px ${e.color}` }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>{e.name}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--neon)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>
          ◉ Real-Time Event Updates
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          {SCHEDULE_EVENTS.slice(0, 4).map(event => {
            const updates = [
              { label: 'Registration Open', done: true },
              { label: 'Round 1', done: false },
              { label: 'Final Round', done: false },
            ];
            return (
              <div key={event.id} className="glass-card" style={{ padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', color: event.color, marginBottom: 10, letterSpacing: '0.05em' }}>
                  {event.name}
                </div>
                {updates.map((u, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: '0.7rem' }}>{u.done ? '✔' : '○'}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                      color: u.done ? 'var(--neon)' : 'var(--text-muted)',
                    }}>
                      {u.label}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}