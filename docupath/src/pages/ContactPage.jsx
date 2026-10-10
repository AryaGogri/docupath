import { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function ContactPage() {
  const showToast = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('✉️ Thank you! Your message has been sent.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="page-enter container" style={{ maxWidth: '600px', padding: '60px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '8px' }}>Contact Us</h1>
      <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '32px' }}>
        Have questions, feedback, or need custom solutions for your organisation? Send us a message.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, #334155)',
          borderRadius: '16px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 500 }}>Your Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            required
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--fg)',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            required
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--fg)',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 500 }}>Message</label>
          <textarea
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="How can we help you?"
            required
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--fg)',
              resize: 'vertical',
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
          Send Message
        </button>
      </form>
    </div>
  );
}
