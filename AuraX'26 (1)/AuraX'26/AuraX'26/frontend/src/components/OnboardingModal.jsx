import { useState } from 'react';
import { INTEREST_CATEGORIES } from '../data/events';

const STEPS = ['welcome', 'interests', 'profile'];

export default function OnboardingModal({ onComplete, onSkip }) {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [profile, setProfile] = useState({ name: '', college: '' });
  const [error, setError] = useState('');

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedInterests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    if (step === 2) {
      if (!profile.name.trim()) {
        setError('Please enter your name.');
        return;
      }
      onComplete(
        { name: profile.name, college: profile.college, interests: selectedInterests },
        selectedInterests
      );
      return;
    }
    setError('');
    setStep(s => s + 1);
  };

  const INTEREST_ICONS = {
    Coding: '💻',
    AI: '🧠',
    Gaming: '🎮',
    Design: '🎨',
    Robotics: '🤖',
  };

  const EVENT_SUGGESTIONS = {
    Coding: ['Hackathon', 'Coding Contest', 'Paper Presentation'],
    AI: ['AI Workshop', 'Hackathon', 'Paper Presentation'],
    Gaming: ['Gaming Arena'],
    Design: ['UI Design Challenge', 'Hackathon'],
    Robotics: ['Robotics Challenge', 'IoT Workshop'],
  };

  const suggestedEvents = [...new Set(
    selectedInterests.flatMap(i => EVENT_SUGGESTIONS[i] || [])
  )];

  return (
    <div className="modal-overlay" style={{ zIndex: 3000 }}>
      <div className="modal-content" style={{ maxWidth: 520 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--neon)', letterSpacing: '0.04em', marginBottom: 4, textShadow: '0 0 20px rgba(0,255,106,0.4)' }}>
            AURAX'26
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            KGiSL Institute of Technology · April 1, 2026
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{
              height: 3, flex: 1, borderRadius: 2,
              background: i <= step ? 'var(--neon)' : 'rgba(0,255,106,0.15)',
              boxShadow: i <= step ? '0 0 6px rgba(0,255,106,0.4)' : 'none',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>

        {step === 0 && (
          <div>
            <div style={{ fontSize: '2.5rem', marginBottom: 16, textAlign: 'center' }}>⚡</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-primary)', letterSpacing: '0.05em', marginBottom: 12, textAlign: 'center' }}>
              Welcome to AuraX'26
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9rem', textAlign: 'center', marginBottom: 24 }}>
              Coimbatore's most electrifying tech festival is here. 8 events, 500+ participants, ₹1.5 lakh in prizes.
              <br /><br />
              Let's set up your personalized experience in 2 quick steps.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-neon-solid" onClick={() => setStep(1)} style={{ flex: 1 }}>Get Started →</button>
              <button onClick={onSkip} style={{
                padding: '12px 20px', background: 'none',
                border: '1px solid var(--border)', borderRadius: 4,
                color: 'var(--text-muted)', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.2s',
              }}>Skip</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '0.05em', marginBottom: 6 }}>
              Choose Your Interests
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 20, lineHeight: 1.6 }}>
              We'll recommend events tailored to your interests.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {INTEREST_CATEGORIES.map(interest => {
                const selected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => { toggleInterest(interest); setError(''); }}
                    style={{
                      padding: '16px 20px',
                      border: `1px solid ${selected ? 'var(--neon)' : 'var(--border)'}`,
                      borderRadius: 6,
                      background: selected ? 'rgba(0,255,106,0.1)' : 'rgba(0,255,106,0.02)',
                      color: selected ? 'var(--neon)' : 'var(--text-secondary)',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                      boxShadow: selected ? '0 0 15px rgba(0,255,106,0.15)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{INTEREST_ICONS[interest]}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>{interest}</div>
                  </button>
                );
              })}
            </div>

            {suggestedEvents.length > 0 && (
              <div style={{ padding: '12px 16px', background: 'rgba(0,255,106,0.04)', border: '1px solid rgba(0,255,106,0.15)', borderRadius: 6, marginBottom: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--neon)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Recommended events for you:
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {suggestedEvents.map(e => <span key={e} className="tag">{e}</span>)}
                </div>
              </div>
            )}

            {error && <div style={{ color: 'var(--danger)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', marginBottom: 12 }}>{error}</div>}

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-neon-solid" onClick={handleNext} style={{ flex: 1 }}>Continue →</button>
              <button onClick={() => setStep(0)} style={{
                padding: '12px 16px', background: 'none',
                border: '1px solid var(--border)', borderRadius: 4,
                color: 'var(--text-muted)', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase',
              }}>Back</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '0.05em', marginBottom: 6 }}>
              Your Profile
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 20, lineHeight: 1.6 }}>
              This powers your personalized dashboard and digital pass.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              <div>
                <label>Full Name *</label>
                <input
                  value={profile.name}
                  onChange={e => { setProfile(p => ({ ...p, name: e.target.value })); setError(''); }}
                  placeholder="e.g. Harini Rajkumar"
                  autoFocus
                />
              </div>
              <div>
                <label>College / Institution</label>
                <input
                  value={profile.college}
                  onChange={e => setProfile(p => ({ ...p, college: e.target.value }))}
                  placeholder="e.g. KGiSL Institute of Technology"
                />
              </div>
            </div>

            <div style={{ padding: '12px 16px', background: 'rgba(0,255,106,0.04)', border: '1px solid rgba(0,255,106,0.15)', borderRadius: 6, marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--neon)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
                Your Interests:
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {selectedInterests.map(i => (
                  <span key={i} className="tag">{INTEREST_ICONS[i]} {i}</span>
                ))}
              </div>
            </div>

            {error && <div style={{ color: 'var(--danger)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', marginBottom: 12 }}>{error}</div>}

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-neon-solid" onClick={handleNext} style={{ flex: 1 }}>Enter AuraX'26 ⚡</button>
              <button onClick={() => setStep(1)} style={{
                padding: '12px 16px', background: 'none',
                border: '1px solid var(--border)', borderRadius: 4,
                color: 'var(--text-muted)', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase',
              }}>Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}