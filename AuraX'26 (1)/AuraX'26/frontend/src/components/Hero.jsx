import { useState, useEffect, useRef } from 'react';

function CountdownUnit({ value, label }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 80 }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 900,
        color: 'var(--neon)',
        textShadow: '0 0 20px rgba(0,255,106,0.6)',
        lineHeight: 1,
        letterSpacing: '0.05em',
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        marginTop: 6,
      }}>
        {label}
      </div>
    </div>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(0, 255, 106, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.02;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const opacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 106, ${opacity})`;
        ctx.fill();
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(0, 255, 106, 0.5)';

        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 106, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        });
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7,
    }} />
  );
}

export default function Hero() {
  const targetDate = new Date('2026-04-01T09:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '80px 20px 40px',
    }}>
      <ParticleCanvas />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,255,106,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {['tl', 'tr', 'bl', 'br'].map(pos => (
        <div key={pos} style={{
          position: 'absolute',
          top: pos.startsWith('t') ? 80 : undefined,
          bottom: pos.startsWith('b') ? 20 : undefined,
          left: pos.endsWith('l') ? 20 : undefined,
          right: pos.endsWith('r') ? 20 : undefined,
          width: 60, height: 60,
          borderTop: pos.startsWith('t') ? '2px solid rgba(0,255,106,0.3)' : 'none',
          borderBottom: pos.startsWith('b') ? '2px solid rgba(0,255,106,0.3)' : 'none',
          borderLeft: pos.endsWith('l') ? '2px solid rgba(0,255,106,0.3)' : 'none',
          borderRight: pos.endsWith('r') ? '2px solid rgba(0,255,106,0.3)' : 'none',
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 900 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          marginBottom: 24, padding: '6px 16px',
          border: '1px solid rgba(0,255,106,0.3)', borderRadius: 2,
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          color: 'var(--neon)', letterSpacing: '0.3em', textTransform: 'uppercase',
          background: 'rgba(0,255,106,0.04)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--neon)', boxShadow: '0 0 8px var(--neon)' }} className="pulse-glow" />
          KGiSL Institute of Technology presents
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 15vw, 10rem)',
          fontWeight: 900, lineHeight: 0.9,
          letterSpacing: '-0.02em', marginBottom: 16,
          color: 'var(--neon)',
          textShadow: '0 0 30px rgba(0,255,106,0.5), 0 0 80px rgba(0,255,106,0.2)',
        }} className="flicker">
          AURAX<span style={{ color: '#ffffff', textShadow: 'none' }}>'26</span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          fontWeight: 300, letterSpacing: '0.3em',
          color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 8,
        }}>
          Innovation Ignites the Future
        </p>

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
          color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 48,
        }}>
          April 1, 2026 &nbsp;·&nbsp; KGiSL Institute of Technology, Coimbatore
        </p>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 32px)',
          padding: '24px 40px',
          background: 'rgba(0,255,106,0.03)',
          border: '1px solid rgba(0,255,106,0.15)',
          borderRadius: 8, marginBottom: 48, backdropFilter: 'blur(10px)',
        }}>
          <CountdownUnit value={timeLeft.days} label="Days" />
          <div style={{ color: 'var(--neon)', fontFamily: 'var(--font-display)', fontSize: '2rem', opacity: 0.4 }}>:</div>
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <div style={{ color: 'var(--neon)', fontFamily: 'var(--font-display)', fontSize: '2rem', opacity: 0.4 }}>:</div>
          <CountdownUnit value={timeLeft.minutes} label="Min" />
          <div style={{ color: 'var(--neon)', fontFamily: 'var(--font-display)', fontSize: '2rem', opacity: 0.4 }}>:</div>
          <CountdownUnit value={timeLeft.seconds} label="Sec" />
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#events" className="btn-neon-solid" style={{ textDecoration: 'none' }}>Explore Events</a>
          <a href="#dashboard" className="btn-neon" style={{ textDecoration: 'none' }}><span>Register Now</span></a>
        </div>

        <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 64, flexWrap: 'wrap' }}>
          {[
            { value: '8+', label: 'Events' },
            { value: '500+', label: 'Participants' },
            { value: '₹1.5L', label: 'Prize Pool' },
            { value: '20+', label: 'Mentors' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800,
                color: 'var(--neon)', textShadow: '0 0 15px rgba(0,255,106,0.4)',
              }}>{stat.value}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.4,
      }} className="float">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>SCROLL</span>
        <div style={{ width: 1, height: 30, background: 'linear-gradient(to bottom, var(--neon), transparent)' }} />
      </div>
    </section>
  );
}