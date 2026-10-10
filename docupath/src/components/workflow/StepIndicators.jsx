export default function StepIndicators({ steps = [], currentStep = 0 }) {
  return (
    <div className="step-indicators" style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '20px 0' }}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        return (
          <div
            key={idx}
            className={`step-indicator-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            style={{
              flex: 1,
              height: '6px',
              borderRadius: '3px',
              background: isCompleted || isCurrent ? 'var(--primary, #3b82f6)' : 'var(--border, #334155)',
              opacity: isCurrent ? 1 : isCompleted ? 0.7 : 0.3,
              transition: 'all 0.3s ease',
            }}
            title={`Step ${idx + 1}: ${step.title || ''}`}
          />
        );
      })}
    </div>
  );
}
