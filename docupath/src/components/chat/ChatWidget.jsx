import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAiResponse } from '../../services/aiService';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hi! I am your DocuPath assistant. How can I help you with your legal documents today?',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');

    setTimeout(() => {
      const response = getAiResponse(currentInput);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: response.text,
          flow: response.suggestedFlow,
        },
      ]);
    }, 400);
  };

  return (
    <div className="chat-widget-shell" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9000 }}>
      {!isOpen && (
        <button
          className="chat-toggle-btn btn btn-primary"
          onClick={() => setIsOpen(true)}
          style={{
            borderRadius: '50px',
            padding: '12px 20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          aria-label="Open AI Assistant"
        >
          <span>💬</span>
          <span>Ask AI Assistant</span>
        </button>
      )}

      {isOpen && (
        <div
          className="chat-popup"
          style={{
            width: '360px',
            height: '480px',
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, #334155)',
            borderRadius: '16px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 16px',
              background: 'var(--primary, #3b82f6)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 600,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🤖</span>
              <span>DocuPath AI Helper</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px' }}
              aria-label="Close Chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '82%',
                  background: m.sender === 'user' ? 'var(--primary, #3b82f6)' : 'var(--bg-subtle, #334155)',
                  color: m.sender === 'user' ? '#fff' : 'var(--fg, #f8fafc)',
                  padding: '10px 14px',
                  borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  fontSize: '14px',
                  lineHeight: '1.4',
                }}
              >
                <p style={{ margin: 0 }}>{m.text}</p>
                {m.flow && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate(`/start?flow=${m.flow}`);
                    }}
                    className="btn btn-sm btn-ghost"
                    style={{ marginTop: '8px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none' }}
                  >
                    Start Flow →
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid var(--border)', padding: '8px' }}>
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                border: 'none',
                background: 'transparent',
                color: 'var(--fg)',
                outline: 'none',
              }}
            />
            <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '8px 16px' }}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
