export default function AiExplanation({ explanation }) {
  return (
    <div className="sidebar-card" style={{ background: 'var(--accent-dim)', borderColor: 'rgba(29,92,255,.2)' }}>
      <h4 style={{ color: 'var(--accent)' }}>🤖 AI Explanation</h4>
      <p style={{ fontSize: '.87rem', color: 'var(--ink)', lineHeight: '1.6' }}>
        {explanation}
      </p>
    </div>
  );
}
