export default function OptionPill({ option, isSelected, onClick }) {
  return (
    <div
      className={`option-pill ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="pill-icon" aria-hidden="true">
        {isSelected ? '✓' : '📌'}
      </div>
      <div>
        <div className="pill-text">{option.label}</div>
        {option.desc && <div className="pill-desc">{option.desc}</div>}
      </div>
    </div>
  );
}
