import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import MobileNav from './MobileNav';

export default function Navbar({ onOpenLangModal, onOpenJurisdictionModal }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isLoggedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <span className="dot" aria-hidden="true" />
          <span>DocuPath</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
          <Link to="/problems" className={isActive('/problems') ? 'active' : ''}>Situations</Link>
          <Link to="/start" className={isActive('/start') ? 'active' : ''}>Create Doc</Link>
          <Link to="/documents" className={isActive('/documents') ? 'active' : ''}>My Documents</Link>
          <Link to="/deadlines" className={isActive('/deadlines') ? 'active' : ''}>Deadlines</Link>
          <Link to="/help" className={isActive('/help') ? 'active' : ''}>Help</Link>
        </div>

        <div className="nav-right">
          <button
            onClick={toggleTheme}
            className="theme-btn"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{user.name || user.email}</span>
              <button onClick={logout} className="btn-sm">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="nav-cta">Sign In</Link>
          )}

          <button
            className="nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenLangModal={onOpenLangModal}
      />
    </nav>
  );
}
