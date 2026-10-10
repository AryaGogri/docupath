import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const showToast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('⚠️ Please fill in all fields.');
      return;
    }

    login({ email, name: email.split('@')[0] });
    showToast(`🎉 ${isSignUp ? 'Account created' : 'Logged in'} successfully!`);
    navigate('/documents');
  };

  return (
    <div className="page-enter container" style={{ maxWidth: '440px', padding: '60px 20px' }}>
      <div
        className="login-card"
        style={{
          background: 'var(--card, #1e293b)',
          border: '1px solid var(--border, #334155)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', marginBottom: '8px', textAlign: 'center' }}>
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '24px' }}>
          {isSignUp ? 'Save and track all your legal documents in one place.' : 'Sign in to access your saved documents.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                color: 'var(--fg)',
                fontSize: '0.95rem',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                color: 'var(--fg)',
                fontSize: '0.95rem',
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--muted)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ background: 'none', border: 'none', color: 'var(--primary, #3b82f6)', cursor: 'pointer', fontWeight: 600 }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
