import { useState } from 'react';
import { useJurisdiction } from '../../context/JurisdictionContext';
import { countries, statesByCountry } from '../../data/jurisdictions';

export default function JurisdictionModal({ isOpen, onClose }) {
  const { jurisdiction, setJurisdiction } = useJurisdiction();
  const [country, setCountry] = useState(jurisdiction.country);
  const [state, setState] = useState(jurisdiction.state);

  const currentStates = statesByCountry[country] || [];

  const handleSave = () => {
    setJurisdiction({ country, state });
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        <h3>Select Jurisdiction</h3>
        <p className="modal-sub">
          Select your location to apply relevant local laws, legal notices, and statutory rules.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <label>Country</label>
            <select
              value={country}
              onChange={(e) => {
                const newCountry = e.target.value;
                setCountry(newCountry);
                const firstState = statesByCountry[newCountry]?.[0]?.value || '';
                setState(firstState);
              }}
            >
              {countries.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.flag} {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>State / Region</label>
            <select value={state} onChange={(e) => setState(e.target.value)}>
              {currentStates.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              Save Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
