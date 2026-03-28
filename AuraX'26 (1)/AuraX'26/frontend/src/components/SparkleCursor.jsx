import { useEffect, useRef } from 'react';

const COLORS = ['#00ff6a', '#00ffaa', '#aaffcc', '#ffffff', '#00cc55', '#88ffbb'];

class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - Math.random() * 2;
    this.life = 1;
    this.decay = Math.random() * 0.03 + 0.02;
    this.size = Math.random() * 3 + 1;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.type = Math.random() > 0.5 ? 'star' : 'dot';
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.vx *= 0.99;
    this.life -= this.decay;
    this.rotation += this.rotSpeed;
    this.size *= 0.97;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    if (this.type === 'star') {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      const s = this.size;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const ix = Math.cos(angle) * s * 2.5;
        const iy = Math.sin(angle) * s * 2.5;
        const ox = Math.cos(angle + Math.PI / 4) * s * 0.8;
        const oy = Math.sin(angle + Math.PI / 4) * s * 0.8;
        if (i === 0) ctx.moveTo(ix, iy);
        else ctx.lineTo(ix, iy);
        ctx.lineTo(ox, oy);
      }
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

class TrailDot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 0.6;
    this.decay = 0.05;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.life -= this.decay;
    this.size *= 0.9;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = '#00ff6a';
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#00ff6a';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function SparkleCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let trail = [];
    let lastX = 0;
    let lastY = 0;
    let animId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3) {
        const count = Math.min(Math.floor(dist / 5) + 1, 4);
        for (let i = 0; i < count; i++) {
          particles.push(new Sparkle(
            x + (Math.random() - 0.5) * 6,
            y + (Math.random() - 0.5) * 6
          ));
        }
        trail.push(new TrailDot(x, y));
        lastX = x;
        lastY = y;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail = trail.filter(t => t.life > 0);
      trail.forEach(t => { t.update(); t.draw(ctx); });

      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => { p.update(); p.draw(ctx); });

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
}