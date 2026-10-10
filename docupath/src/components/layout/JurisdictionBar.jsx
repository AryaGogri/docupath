import { useJurisdiction } from '../../context/JurisdictionContext';
import { languages } from '../../data/languages';

export default function JurisdictionBar({ onOpenJurisdiction, onOpenLanguage }) {
  const { getCountryFlag, getStateLabel, language } = useJurisdiction();

  const currentLangObj = languages.find((l) => l.code === language);
  const currentLangDisplay = currentLangObj ? `${currentLangObj.flag} ${currentLangObj.name}` : `🌐 ${language.toUpperCase()}`;

  return (
    <div className="jurisdiction-bar" role="banner" aria-label="Location and language settings">
      <span aria-hidden="true">📍</span>
      <span>Location:</span>
      <button onClick={onOpenJurisdiction} aria-label="Change jurisdiction">
        {getCountryFlag()} {getStateLabel()}
      </button>
      <span style={{ color: 'var(--ink-ghost)', fontSize: '.8rem' }} aria-hidden="true">|</span>
      <button onClick={onOpenLanguage} aria-label="Change language">
        {currentLangDisplay}
      </button>
    </div>
  );
}
