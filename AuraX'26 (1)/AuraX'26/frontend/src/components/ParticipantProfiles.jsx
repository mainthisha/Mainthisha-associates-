import { useState } from 'react';
import { useApp } from '../App';

const DEMO_PROFILES = [
  { id: 1, name: "Harini R", college: "KGiSL Institute of Technology", skills: ["Python", "Web Dev", "ML"], events: ["Hackathon", "Coding Contest"], avatar: "HR", online: true },
  { id: 2, name: "Arjun M", college: "PSG College of Technology", skills: ["C++", "DSA", "IoT"], events: ["Coding Contest", "Robotics"], avatar: "AM", online: true },
  { id: 3, name: "Divya K", college: "CIT Coimbatore", skills: ["Figma", "React", "CSS"], events: ["UI Design", "Hackathon"], avatar: "DK", online: false },
  { id: 4, name: "Karthik S", college: "KGiSL Institute of Technology", skills: ["TensorFlow", "NLP", "FastAPI"], events: ["AI Workshop", "Hackathon"], avatar: "KS", online: true },
  { id: 5, name: "Priya B", college: "SKCET", skills: ["Arduino", "Python", "ROS"], events: ["Robotics", "IoT Workshop"], avatar: "PB", online: false },
  { id: 6, name: "Ravi T", college: "Amrita Coimbatore", skills: ["React Native", "Firebase", "Node"], events: ["Hackathon", "UI Design"], avatar: "RT", online: true },
];

function ProfileCard({ profile, highlight }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  return (
    <div className="glass-card" style={{ padding: 20, borderColor: highlight ? 'rgba(0,255,106,0.4)' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(0,255,106,0.1)', border: '2px solid rgba(0,255,106,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700,
          color: 'var(--neon)', position: 'relative',
        }}>
          {profile.avatar}
          {profile.online && (
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 10, height: 10, borderRadius: '50%',
              background: 'var(--neon)', border: '2px solid var(--bg-primary)',
            }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>{profile.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile.college}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
        {profile.skills.map(s => (
          <span key={s} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            padding: '2px 8px', borderRadius: 2,
            background: 'rgba(0,255,106,0.06)', border: '1px solid rgba(0,255,106,0.2)',
            color: 'var(--neon)',
          }}>{s}</span>
        ))}
      </div>

      {profile.events.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
          {profile.events.map(e => (
            <span key={e} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              padding: '2px 8px', borderRadius: 2,
              background: 'rgba(0,200,255,0.06)', border: '1px solid rgba(0,200,255,0.2)',
              color: '#00ccff',
            }}>📅 {e}</span>
          ))}
        </div>
      )}

      {!highlight && (
        <button
          onClick={() => { setConnecting(true); setTimeout(() => { setConnected(true); setConnecting(false); }, 800); }}
          disabled={connected}
          style={{
            width: '100%', padding: '7px',
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            border: `1px solid ${connected ? 'rgba(0,255,106,0.3)' : 'var(--border-bright)'}`,
            background: connected ? 'rgba(0,255,106,0.06)' : 'transparent',
            color: connected ? 'var(--neon)' : 'var(--text-secondary)',
            borderRadius: 4, cursor: connected ? 'default' : 'pointer',
            letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.2s',
          }}
        >
          {connecting ? '...' : connected ? '✓ Connected' : 'Connect'}
        </button>
      )}
    </div>
  );
}

export default function ParticipantProfiles() {
  const { user } = useApp();
  const [myProfile, setMyProfile] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ skills: '', bio: '' });

  const createProfile = () => {
    if (!user) return;
    setMyProfile({
      name: user.name,
      college: user.college || 'KGiSL Institute of Technology',
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      bio: form.bio,
      events: [],
      avatar: user.name?.substring(0, 2).toUpperCase(),
      online: true,
    });
    setShowCreate(false);
  };

  return (
    <section id="profiles" className="section">
      <span className="section-label">// networking</span>
      <h2 className="section-title" style={{ marginBottom: 12 }}>
        Participant <span className="neon-text">Profiles</span>
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 32, maxWidth: 600 }}>
        Connect with fellow participants. Find teammates, share skills, and network with the tech community.
      </p>

      {user && !myProfile && !showCreate && (
        <div style={{ marginBottom: 32, padding: '20px 24px', background: 'rgba(0,255,106,0.03)', border: '1px dashed rgba(0,255,106,0.25)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Hey {user.name?.split(' ')[0]}! Create your profile to connect with others.
          </span>
          <button className="btn-neon" onClick={() => setShowCreate(true)} style={{ padding: '8px 20px', fontSize: '0.65rem' }}>
            <span>Create Profile</span>
          </button>
        </div>
      )}

      {showCreate && (
        <div className="glass-card" style={{ padding: 24, marginBottom: 32, maxWidth: 500 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--neon)', marginBottom: 20 }}>Create Your Profile</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label>Skills (comma separated)</label>
              <input value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="Python, React, Machine Learning..." />
            </div>
            <div>
              <label>Bio (optional)</label>
              <textarea rows={3} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Tell others about yourself..." style={{ resize: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-neon-solid" onClick={createProfile} style={{ flex: 1 }}>Create</button>
              <button className="btn-neon" onClick={() => setShowCreate(false)} style={{ flex: 1 }}><span>Cancel</span></button>
            </div>
          </div>
        </div>
      )}

      {myProfile && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--neon)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Your Profile</div>
          <ProfileCard profile={myProfile} highlight />
        </div>
      )}

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
        Other Participants ({DEMO_PROFILES.length})
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {DEMO_PROFILES.map(p => <ProfileCard key={p.id} profile={p} />)}
      </div>
    </section>
  );
}