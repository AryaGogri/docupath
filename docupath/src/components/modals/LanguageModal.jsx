import { useState } from 'react';
import { useJurisdiction } from '../../context/JurisdictionContext';
import { languages, triggerGoogleTranslate } from '../../data/languages';

export default function LanguageModal({ isOpen, onClose }) {
  const { language, setLanguage } = useJurisdiction();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredLanguages = languages.filter((l) => {
    const q = searchTerm.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
    );
  });

  const handleSelectLanguage = (code) => {
    setLanguage(code);
    triggerGoogleTranslate(code);
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px', width: '92%', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        <h3>Select Website Language</h3>
        <p className="modal-sub">
          Translate the entire DocuPath website and documents instantly into your preferred language.
        </p>

        <div className="input-group" style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search language (e.g., Hindi, Spanish, Marathi)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <div
          className="lang-grid"
          style={{
            overflowY: 'auto',
            maxHeight: '400px',
            paddingRight: '4px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          }}
        >
          {filteredLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleSelectLanguage(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <div>
                <div className="lang-name">{lang.name}</div>
                <div className="lang-native">{lang.nativeName}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
