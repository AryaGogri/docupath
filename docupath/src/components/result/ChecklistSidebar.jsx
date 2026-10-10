import { useState } from 'react';

export default function ChecklistSidebar({ checklist }) {
  const [checked, setChecked] = useState({});

  const toggleCheck = (idx) => {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="sidebar-card">
      <h4>✅ Submission Checklist</h4>
      <div id="checklistList">
        {checklist.map((item, idx) => (
          <button
            key={idx}
            className="checklist-item"
            style={{ border: 'none', background: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
            onClick={() => toggleCheck(idx)}
            aria-pressed={!!checked[idx]}
          >
            <div className={`check-box ${checked[idx] ? 'checked' : ''}`} aria-hidden="true" />
            <span>{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
