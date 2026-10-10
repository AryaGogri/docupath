export default function DashboardStats({ documents = [] }) {
  const total = documents.length;
  const ready = documents.filter((d) => d.status === 'ready').length;
  const pending = documents.filter((d) => d.status === 'pending').length;
  const submitted = documents.filter((d) => d.status === 'submitted').length;

  const stats = [
    { label: 'Total Documents', count: total, icon: '📄', color: '#3b82f6' },
    { label: 'Ready to Send', count: ready, icon: '✅', color: '#10b981' },
    { label: 'Pending Action', count: pending, icon: '⏳', color: '#f59e0b' },
    { label: 'Submitted', count: submitted, icon: '📤', color: '#8b5cf6' },
  ];

  return (
    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      {stats.map((stat, i) => (
        <div
          key={i}
          className="stat-card"
          style={{
            background: 'var(--card, #1e293b)',
            border: '1px solid var(--border, #334155)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: `${stat.color}15`,
              color: stat.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            {stat.icon}
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--fg)' }}>{stat.count}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--muted, #94a3b8)' }}>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
