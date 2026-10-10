import { useNavigate } from 'react-router-dom';
import { situations } from '../data/situations';

export default function ProblemsPage() {
  const navigate = useNavigate();

  const handleStart = (key) => {
    navigate(`/start?flow=${key}`);
  };

  return (
    <div className="page-enter">
      <section className="section-pad">
        <div className="container">
          <div className="situations-header">
            <div className="section-label">Use Cases</div>
            <h2>Problems we actually solve</h2>
            <p>Pick a situation — each one is a guided flow ready to go.</p>
          </div>
          <div className="situations-grid">
            {situations.map((s) => (
              <button
                key={s.key}
                className="situation-card"
                onClick={() => handleStart(s.key)}
                style={{ textAlign: 'left', display: 'block', width: '100%' }}
                aria-label={`Start flow for ${s.label}`}
              >
                <div className="card-icon" style={{ background: s.bg }} aria-hidden="true">
                  {s.icon}
                </div>
                <h3>{s.label}</h3>
                <p>{s.desc}</p>
                <span className="card-arrow" aria-hidden="true">Start this flow →</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
