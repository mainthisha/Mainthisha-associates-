import { useState } from 'react';
import { useApp } from '../App';
import { EVENTS } from '../data/events';

function QRPattern({ data }) {
  const seed = data.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const size = 21;
  const cells = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const isFinderTL = (r < 7 && c < 7);
      const isFinderTR = (r < 7 && c >= size - 7);
      const isFinderBL = (r >= size - 7 && c < 7);
      const isBorderFinder =
        (isFinderTL && (r === 0 || r === 6 || c === 0 || c === 6)) ||
        (isFinderTR && (r === 0 || r === 6 || c === size - 7 || c === size - 1)) ||
        (isFinderBL && (r === size - 7 || r === size - 1 || c === 0 || c === 6));
      const isInnerFinder =
        (isFinderTL && r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
        (isFinderTR && r >= 2 && r <= 4 && c >= size - 5 && c <= size - 3) ||
        (isFinderBL && r >= size - 5 && r <= size - 3 && c >= 2 && c <= 4);
      let filled;
      if (isBorderFinder || isInnerFinder) {
        filled = true;
      } else if (isFinderTL || isFinderTR || isFinderBL) {
        filled = false;
      } else {
        const val = (seed * (r + 1) * (c + 1) * 31337) % 100;
        filled = val < 45;
      }
      cells.push({ r, c, filled });
    }
  }
  return (
    <svg viewBox={`0 0 ${size * 5} ${size * 5}`} style={{ width: '100%', height: '100%' }}>
      <rect width="100%" height="100%" fill="#080c0a" />
      {cells.map(({ r, c, filled }) => filled ? (
        <rect key={`${r}-${c}`} x={c * 5} y={r * 5} width={4} height={4} fill="#00ff6a" opacity={0.9} />
      ) : null)}
    </svg>
  );
}

export default function DigitalPass() {
  const { user, registeredEvents } = useApp();
  const [generated, setGenerated] = useState(false);
  const passId = `AURX26-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  const myEvents = EVENTS.filter(e => registeredEvents.includes(e.id));

  if (!user) {
    return (
      <section id="pass" className="section">
        <span className="section-label">// digital pass</span>
        <h2 className="section-title" style={{ marginBottom: 32 }}>
          Digital <span className="neon-text">Fest Pass</span>
        </h2>
        <div style={{ padding: '50px', textAlign: 'center', background: 'rgba(0,255,106,0.02)', border: '1px dashed rgba(0,255,106,0.2)', borderRadius: 8, maxWidth: 500 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Complete onboarding to generate your digital fest pass.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="pass" className="section">
      <span className="section-label">// digital pass</span>
      <h2 className="section-title" style={{ marginBottom: 12 }}>
        Digital <span className="neon-text">Fest Pass</span>
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 32, maxWidth: 600 }}>
        Your official AuraX'26 participation pass. Show this QR code at the venue for instant check-in.
      </p>

      {!generated ? (
        <button className="btn-neon-solid" onClick={() => setGenerated(true)} style={{ fontSize: '0.75rem' }}>
          Generate My Pass
        </button>
      ) : (
        <div style={{ maxWidth: 480 }}>
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #0a1a0d 0%, #08120a 50%, #0a1a0d 100%)',
            border: '1px solid rgba(0,255,106,0.3)', borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 0 60px rgba(0,255,106,0.15), 0 0 120px rgba(0,255,106,0.05)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, var(--neon), transparent)' }} />
            <div style={{
              position: 'absolute', left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(0,255,106,0.6), transparent)',
              animation: 'scan 3s linear infinite', pointerEvents: 'none', zIndex: 2,
            }} />

            <div style={{ padding: '24px 28px 16px', borderBottom: '1px solid rgba(0,255,106,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--neon)', textShadow: '0 0 20px rgba(0,255,106,0.5)', letterSpacing: '0.02em', lineHeight: 1 }}>
                    AURAX'26
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em', marginTop: 4 }}>
                    APRIL 1, 2026 · KGIST
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Pass ID</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--neon)', letterSpacing: '0.1em' }}>{passId}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '20px 28px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>Participant</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>{user.name}</div>
                </div>
                {user.college && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>Institution</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{user.college}</div>
                  </div>
                )}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Registered Events ({myEvents.length})
                  </div>
                  {myEvents.length === 0 ? (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)' }}>No events registered</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {myEvents.map(e => (
                        <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 6, height: 6, borderRadius: 1, background: e.color, flexShrink: 0 }} />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                            {e.name} <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>({e.startTime})</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ width: 110, flexShrink: 0 }}>
                <div style={{ width: 110, height: 110, padding: 4, background: '#080c0a', border: '1px solid rgba(0,255,106,0.3)', borderRadius: 6 }}>
                  <QRPattern data={`AURAX26-${user.name}-${passId}`} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 4, letterSpacing: '0.1em' }}>
                  SCAN TO VERIFY
                </div>
              </div>
            </div>

            <div style={{ padding: '12px 28px', borderTop: '1px solid rgba(0,255,106,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                KGiSL Institute of Technology
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--neon)', boxShadow: '0 0 6px var(--neon)' }} className="pulse-glow" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--neon)' }}>VALID PASS</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className="btn-neon-solid" onClick={() => window.print()} style={{ flex: 1, fontSize: '0.7rem' }}>Download Pass</button>
            <button className="btn-neon" onClick={() => setGenerated(false)} style={{ flex: 1, fontSize: '0.7rem' }}><span>Regenerate</span></button>
          </div>
        </div>
      )}
    </section>
  );
}