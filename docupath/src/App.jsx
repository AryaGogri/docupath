import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { JurisdictionProvider } from './context/JurisdictionContext';
import { ToastProvider } from './context/ToastContext';

// Styles import
import './styles/index.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/animations.css';
import './styles/responsive.css';

// Layout & UI Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import JurisdictionBar from './components/layout/JurisdictionBar';
import ChatWidget from './components/chat/ChatWidget';
import LanguageModal from './components/modals/LanguageModal';
import JurisdictionModal from './components/modals/JurisdictionModal';

// Pages
import HomePage from './pages/HomePage';
import ProblemsPage from './pages/ProblemsPage';
import WorkflowPage from './pages/WorkflowPage';
import ResultPage from './pages/ResultPage';
import DocumentsPage from './pages/DocumentsPage';
import DeadlinesPage from './pages/DeadlinesPage';
import HelpPage from './pages/HelpPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import NgoPage from './pages/NgoPage';
import PartnerPage from './pages/PartnerPage';
import LegalAidPage from './pages/LegalAidPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

export default function App() {
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [jurisdictionModalOpen, setJurisdictionModalOpen] = useState(false);

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <JurisdictionProvider>
            <ToastProvider>
              {/* Accessibility Skip Link */}
              <a href="#main-content" className="skip-link">
                Skip to content
              </a>

              {/* Jurisdiction / Location setting top-bar */}
              <JurisdictionBar
                onOpenJurisdiction={() => setJurisdictionModalOpen(true)}
                onOpenLanguage={() => setLangModalOpen(true)}
              />

              {/* Main Navigation Bar */}
              <Navbar
                onOpenLangModal={() => setLangModalOpen(true)}
                onOpenJurisdictionModal={() => setJurisdictionModalOpen(true)}
              />

              {/* App Routes */}
              <main id="main-content" tabIndex={-1}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/problems" element={<ProblemsPage />} />
                  <Route path="/start" element={<WorkflowPage />} />
                  <Route path="/result" element={<ResultPage />} />
                  <Route path="/documents" element={<DocumentsPage />} />
                  <Route path="/deadlines" element={<DeadlinesPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/ngo" element={<NgoPage />} />
                  <Route path="/partners" element={<PartnerPage />} />
                  <Route path="/legal-aid" element={<LegalAidPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                </Routes>
              </main>

              {/* Floating AI Chat Assistant */}
              <ChatWidget />

              {/* Shared Site Footer */}
              <Footer />

              {/* Modals */}
              <LanguageModal isOpen={langModalOpen} onClose={() => setLangModalOpen(false)} />
              <JurisdictionModal
                isOpen={jurisdictionModalOpen}
                onClose={() => setJurisdictionModalOpen(false)}
              />
            </ToastProvider>
          </JurisdictionProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
