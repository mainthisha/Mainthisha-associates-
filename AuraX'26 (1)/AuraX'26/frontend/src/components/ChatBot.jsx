import { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm AuraX Assistant. Ask me anything about the events, schedule, registration, or venue!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.2:1b',
          messages: [
            {
              role: 'system',
              content: `You are AuraX Assistant, a helpful chatbot for AuraX'26 tech fest organized by KGiSL Institute of Technology. 
You help participants with information about 8 events: Hackathon (₹10,000 prize, Block A), AI Workshop (Certification, Block D), Robotics Challenge (₹5,000, Block C), UI Design Challenge (₹3,000, Block B), Coding Contest (₹2,000, Block A), Gaming Arena (₹3,000, Block E), Paper Presentation (₹2,000, Block B), IoT Workshop (Certification, Block C).
Registration is free. Participants need a valid college ID. Food is provided. Winners announced at closing ceremony.
Keep answers short, friendly and helpful.`,
            },
            ...updated.map(m => ({ role: m.role, content: m.content })),
          ],
          stream: false,
        }),
      });

      const data = await response.json();
      const reply = data.message?.content || 'Sorry, I could not get a response.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Could not connect to Ollama. Make sure it is running with CORS enabled.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 2000,
          width: 56, height: 56, borderRadius: '50%',
          background: open ? '#050a0e' : '#00FF88',
          border: '2px solid #00FF88',
          color: open ? '#00FF88' : '#050a0e',
          fontSize: 24, cursor: 'pointer',
          boxShadow: '0 0 20px rgba(0,255,136,0.5)',
          transition: 'all 0.25s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 96, right: 28, zIndex: 1999,
          width: 340, height: 480,
          background: '#050a0e',
          border: '1px solid rgba(0,255,136,0.3)',
          boxShadow: '0 0 40px rgba(0,255,136,0.15)',
          display: 'flex', flexDirection: 'column',
          animation: 'chatIn 0.25s ease',
        }}>
          <style>{`
            @keyframes chatIn {
              from { opacity: 0; transform: translateY(16px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .chat-msg-user {
              align-self: flex-end;
              background: rgba(0,255,136,0.12);
              border: 1px solid rgba(0,255,136,0.3);
              color: #e0ffe8;
              border-radius: 12px 12px 2px 12px;
            }
            .chat-msg-assistant {
              align-self: flex-start;
              background: #0a1520;
              border: 1px solid rgba(0,255,136,0.12);
              color: #7ab8a0;
              border-radius: 12px 12px 12px 2px;
            }
          `}</style>

          {/* Header */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid rgba(0,255,136,0.15)',
            background: 'rgba(0,255,136,0.04)',
          }}>
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: 13,
              fontWeight: 700, color: '#00FF88', letterSpacing: 1,
            }}>
              ⚡ AuraX Assistant
            </div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
              color: '#3a6a52', marginTop: 2,
            }}>
              Powered by Llama 3.2 · KGiSL
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '14px 12px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === 'user' ? 'chat-msg-user' : 'chat-msg-assistant'}
                style={{
                  padding: '8px 12px', fontSize: 13, lineHeight: 1.55,
                  maxWidth: '85%', wordBreak: 'break-word',
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="chat-msg-assistant" style={{
                padding: '8px 12px', fontSize: 13, color: '#3a6a52',
                fontFamily: "'Share Tech Mono', monospace",
              }}>
                thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '10px 12px',
            borderTop: '1px solid rgba(0,255,136,0.15)',
            display: 'flex', gap: 8,
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about events..."
              disabled={loading}
              style={{
                flex: 1, background: '#0a1520',
                border: '1px solid rgba(0,255,136,0.2)',
                color: '#e0ffe8', padding: '8px 10px',
                fontFamily: "'Rajdhani', sans-serif", fontSize: 14,
                outline: 'none', borderRadius: 4,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim() ? 'transparent' : '#00FF88',
                border: '1px solid #00FF88',
                color: loading || !input.trim() ? '#00FF88' : '#050a0e',
                width: 36, height: 36, cursor: 'pointer',
                fontFamily: "'Orbitron', monospace", fontSize: 14,
                borderRadius: 4, transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}