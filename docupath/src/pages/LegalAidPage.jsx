import { Link } from 'react-router-dom';

export default function LegalAidPage() {
  const resources = [
    {
      title: 'National Legal Services Authority (NALSA)',
      desc: 'Provides free legal services to eligible citizens and organizes Lok Adalats for speedy dispute resolution.',
      link: 'https://nalsa.gov.in',
      tag: 'India',
    },
    {
      title: 'Legal Aid Society',
      desc: 'Free legal advice and representation for low-income tenants and individuals facing civil legal issues.',
      link: '#',
      tag: 'Global',
    },
    {
      title: 'State Consumer Disputes Redressal Commission',
      desc: 'Official portal for filing consumer complaints regarding defective goods and unfulfilled services.',
      link: '#',
      tag: 'Consumer Protection',
    },
  ];

  return (
    <div className="page-enter container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
      <h1>Legal Aid & Resources</h1>
      <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
        If your situation requires formal representation or free legal assistance, explore these trusted legal aid organizations.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {resources.map((res, i) => (
          <div
            key={i}
            style={{
              background: 'var(--card, #1e293b)',
              border: '1px solid var(--border, #334155)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{res.title}</h3>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: 'var(--bg-subtle, #334155)',
                  color: 'var(--primary, #3b82f6)',
                  fontWeight: 600,
                }}
              >
                {res.tag}
              </span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '16px', lineHeight: 1.5 }}>
              {res.desc}
            </p>
            <a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              style={{ display: 'inline-flex' }}
            >
              Visit Official Website →
            </a>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', padding: '24px', background: 'var(--bg-subtle)', borderRadius: '16px', textAlign: 'center' }}>
        <h3>Need to draft your notice first?</h3>
        <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>Generate your formal notice in 5 minutes before seeking legal counsel.</p>
        <Link to="/start" className="btn btn-primary">
          Start Document Flow →
        </Link>
      </div>
    </div>
  );
}
