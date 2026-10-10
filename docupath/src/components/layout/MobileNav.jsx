import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function MobileNav({ isOpen, onClose, onOpenLangModal }) {
  const { toggleTheme } = useTheme();

  return (
    <div
      className={`mobile-nav-overlay ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <button className="mobile-nav-close" onClick={onClose} aria-label="Close menu">✕</button>
      <Link to="/" onClick={onClose}>Home</Link>
      <Link to="/problems" onClick={onClose}>Problems We Solve</Link>
      <Link to="/start" onClick={onClose}>Start Now</Link>
      <Link to="/documents" onClick={onClose}>My Documents</Link>
      <Link to="/deadlines" onClick={onClose}>Deadlines</Link>
      <Link to="/help" onClick={onClose}>Help & Learn</Link>
      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <button
          className="theme-btn"
          onClick={() => { toggleTheme(); onClose(); }}
          style={{ width: 44, height: 44 }}
          aria-label="Toggle theme"
        >
          🌙
        </button>
        <button
          onClick={() => { onOpenLangModal?.(); onClose(); }}
          className="btn btn-ghost"
          style={{ flex: 1, justifyContent: 'center', padding: 10 }}
        >
          🌐 Language
        </button>
      </div>
    </div>
  );
}
