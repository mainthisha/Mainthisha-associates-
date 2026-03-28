import { useState } from 'react';
import { RESOURCES, FAQS, MENTORS, INTEREST_CATEGORIES } from '../data/events';
import { useApp } from '../App';

export function ResourceHub() {
  const [activeTag, setActiveTag] = useState('All');
  const tags = ['All', ...INTEREST_CATEGORIES.filter(c => c !== 'Gaming')];
  const filtered = activeTag === 'All' ? RESOURCES : RESOURCES.filter(r => r.tags.includes(activeTag));

  return (
    <section id="resources" className="section">
      <span className="section-label">// resource hub</span>
      <h2 className="section-title" style={{ marginBottom: 12 }}>
        Preparation <span className="neon-text">Resources</span>
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 32, maxWidth: 600 }}>
        Everything you need to ace your events — guides, templates, and APIs curated by our team.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {tags.map(t => (
          <button key={t} onClick={() => setActiveTag(t)} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '6px 14px',
            border: `1px solid ${activeTag === t ? 'var(--neon)' : 'var(--border)'}`,
            background: activeTag === t ? 'rgba(0,255,106,0.1)' : 'transparent',
            color: activeTag === t ? 'var(--neon)' : 'var(--text-muted)',
            borderRadius: 3, cursor: 'pointer', letterSpacing: '0.1em',
            textTransform: 'uppercase', transition: 'all 0.2s',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.map(res => (
          <div key={res.id} className="glass-card" style={{ padding: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--neon)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>
                {res.type}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
                {res.title}
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>
              {res.description}
            </p>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
              {res.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <a href={res.link} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: 'var(--neon)', textDecoration: 'none',
              borderBottom: '1px solid rgba(0,255,106,0.3)',
              paddingBottom: 2, transition: 'border-color 0.2s',
            }}>
              Access Resource →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MentorSupport() {
  const { setMentorRequests } = useApp();
  const [requestSent, setRequestSent] = useState({});
  const [formData, setFormData] = useState({ team: '', issue: '', mentorId: null });
  const [showForm, setShowForm] = useState(false);

  const handleRequest = (mentorId) => {
    setFormData(f => ({ ...f, mentorId }));
    setShowForm(true);
  };

  const submitRequest = () => {
    if (!formData.team || !formData.issue) return;
    setMentorRequests(prev => [...prev, { ...formData, id: Date.now() }]);
    setRequestSent(prev => ({ ...prev, [formData.mentorId]: true }));
    setShowForm(false);
    setFormData({ team: '', issue: '', mentorId: null });
  };

  return (
    <section id="mentors" className="section">
      <span className="section-label">// mentor support</span>
      <h2 className="section-title" style={{ marginBottom: 12 }}>
        Mentor <span className="neon-text">Help System</span>
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 32, maxWidth: 600 }}>
        Stuck on a problem? Request a mentor. Our domain experts will assist your team on-site.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {MENTORS.map(mentor => (
          <div key={mentor.id} className="glass-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                background: mentor.available ? 'rgba(0,255,106,0.15)' : 'rgba(100,100,100,0.15)',
                border: `2px solid ${mentor.available ? 'var(--neon)' : 'rgba(100,100,100,0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700,
                color: mentor.available ? 'var(--neon)' : 'var(--text-muted)',
              }}>
                {mentor.avatar}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
                  {mentor.name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  {mentor.domain}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: mentor.available ? 'var(--neon)' : 'var(--text-muted)',
                boxShadow: mentor.available ? '0 0 6px var(--neon)' : 'none',
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: mentor.available ? 'var(--neon)' : 'var(--text-muted)' }}>
                {mentor.available ? 'Available Now' : 'Busy / In Session'}
              </span>
            </div>

            <button
              onClick={() => mentor.available && !requestSent[mentor.id] && handleRequest(mentor.id)}
              disabled={!mentor.available || requestSent[mentor.id]}
              style={{
                padding: '8px 14px',
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                border: `1px solid ${requestSent[mentor.id] ? 'rgba(0,255,106,0.3)' : mentor.available ? 'var(--border-bright)' : 'var(--border)'}`,
                background: requestSent[mentor.id] ? 'rgba(0,255,106,0.08)' : 'transparent',
                color: requestSent[mentor.id] ? 'var(--neon)' : mentor.available ? 'var(--text-secondary)' : 'var(--text-muted)',
                borderRadius: 4, cursor: mentor.available && !requestSent[mentor.id] ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.2s',
              }}
            >
              {requestSent[mentor.id] ? '✓ Request Sent' : 'Request Mentor Help'}
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--neon)', letterSpacing: '0.05em', marginBottom: 24 }}>
              Request Mentor Help
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label>Team Name</label>
                <input
                  value={formData.team}
                  onChange={e => setFormData(f => ({ ...f, team: e.target.value }))}
                  placeholder="e.g. CodeStorm"
                />
              </div>
              <div>
                <label>Describe the Issue</label>
                <textarea
                  rows={4}
                  value={formData.issue}
                  onChange={e => setFormData(f => ({ ...f, issue: e.target.value }))}
                  placeholder="e.g. Having trouble with deployment on Docker..."
                  style={{ resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-neon-solid" onClick={submitRequest} style={{ flex: 1 }}>Send Request</button>
                <button className="btn-neon" onClick={() => setShowForm(false)} style={{ flex: 1 }}><span>Cancel</span></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function FAQCenter() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(null);

  const results = query.length < 2
    ? FAQS
    : FAQS.filter(faq =>
        faq.question.toLowerCase().includes(query.toLowerCase()) ||
        faq.answer.toLowerCase().includes(query.toLowerCase()) ||
        faq.tags.some(t => t.includes(query.toLowerCase()))
      );

  return (
    <section id="faq" className="section">
      <span className="section-label">// help center</span>
      <h2 className="section-title" style={{ marginBottom: 12 }}>
        Smart <span className="neon-text">FAQ Search</span>
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 32 }}>
        Search for anything — venue, registration, food, certificates…
      </p>

      <div style={{ maxWidth: 600, marginBottom: 32 }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--neon)', fontSize: '1rem' }}>🔍</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search: "How to reach venue", "registration fee"...'
            style={{ paddingLeft: 40, fontSize: '0.9rem' }}
          />
        </div>
        {query.length >= 2 && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 8 }}>
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 800 }}>
        {results.map(faq => (
          <div
            key={faq.id}
            className="glass-card"
            style={{ padding: '16px 20px', cursor: 'pointer' }}
            onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                {faq.question}
              </div>
              <span style={{ color: 'var(--neon)', fontFamily: 'var(--font-display)', fontSize: '0.8rem', marginLeft: 12 }}>
                {expanded === faq.id ? '−' : '+'}
              </span>
            </div>
            {expanded === faq.id && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        {results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            No results found. Try different keywords or contact us directly.
          </div>
        )}
      </div>
    </section>
  );
}