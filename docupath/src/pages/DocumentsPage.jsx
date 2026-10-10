import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadDocuments, saveDocuments } from '../services/storage';
import DashboardStats from '../components/documents/DashboardStats';
import DocList from '../components/documents/DocList';
import { useToast } from '../context/ToastContext';

export default function DocumentsPage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [documents, setDocuments] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load persisted documents on mount
    const saved = loadDocuments();
    if (saved && saved.length > 0) {
      setDocuments(saved);
    } else {
      // Seed initial sample documents if storage is completely empty
      const samples = [
        {
          id: 1,
          title: 'Tenant Repair Request Letter',
          type: 'tenant',
          date: 'Jan 28, 2026',
          status: 'ready',
          docText: `DATE: Jan 28, 2026

FROM:
Alex Johnson
Flat 402, Sunshine Apartments

TO:
Landlord / Property Management

SUBJECT: FORMAL REQUEST FOR URGENT PLUMBING REPAIRS

Dear Sir/Madam,

I am writing this formal letter to bring to your immediate attention the serious water leakage issue in the kitchen sink area. Despite prior verbal notifications, the issue remains unresolved.

Please treat this as formal notice to complete the necessary repairs within 7 days of receipt of this notice.

Sincerely,
Alex Johnson`,
          deadlines: [
            { label: 'Send letter', due: 'Feb 04, 2026' },
            { label: 'Landlord response', due: 'Feb 11, 2026' },
          ],
        },
        {
          id: 2,
          title: 'Artist Grant Cover Letter',
          type: 'grant',
          date: 'Jan 20, 2026',
          status: 'submitted',
          docText: `DATE: Jan 20, 2026

TO:
Arts Foundation Grant Committee

SUBJECT: APPLICATION COVER LETTER — CREATIVE ARTS GRANT 2026

Dear Grant Committee Members,

I am pleased to submit my application for the 2026 Creative Arts Grant. My proposed project focuses on community-driven public art installations highlighting environmental sustainability.

Sincerely,
Alex Johnson`,
          deadlines: [{ label: 'Grant deadline', due: 'Feb 15, 2026' }],
        },
        {
          id: 3,
          title: 'Legal Notice — Recovery of Payment',
          type: 'legal',
          date: 'Jan 15, 2026',
          status: 'pending',
          docText: `DATE: Jan 15, 2026

TO:
XYZ Pvt Ltd

SUBJECT: FORMAL DEMAND NOTICE FOR UNPAID INVOICES

Dear Sir/Madam,

Take notice that despite multiple reminders, invoice #1042 amounting to ₹45,000 remains unpaid past the 30-day credit period.

You are hereby requested to clear the outstanding payment within 15 days of this notice.

Sincerely,
Alex Johnson`,
          deadlines: [{ label: 'Response deadline', due: 'Feb 14, 2026' }],
        },
      ];
      setDocuments(samples);
      saveDocuments(samples);
    }
  }, []);

  const handleDelete = (id) => {
    const updated = documents.filter((d) => d.id !== id);
    setDocuments(updated);
    saveDocuments(updated);
    showToast('🗑️ Document deleted successfully.');
  };

  const handleUpdate = (updatedDoc) => {
    const updated = documents.map((d) => (d.id === updatedDoc.id ? updatedDoc : d));
    setDocuments(updated);
    saveDocuments(updated);
  };

  const filteredDocs = documents.filter((d) => {
    const matchesFilter = activeFilter === 'all' || d.status === activeFilter;
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.docText && d.docText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-enter container">
      <div className="dashboard-layout">
        <div className="dash-header" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1>My Documents</h1>
            <p style={{ color: 'var(--ink-soft)', margin: '4px 0 0 0' }}>
              Manage, edit, export, and track status for all your generated documents.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/start')}>
            + New Document
          </button>
        </div>

        <DashboardStats documents={documents} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div className="dash-tabs" role="tablist" aria-label="Filter documents by status" style={{ margin: 0 }}>
            {['all', 'ready', 'submitted', 'pending'].map((filter) => (
              <button
                key={filter}
                role="tab"
                aria-selected={activeFilter === filter}
                className={`dash-tab ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ minWidth: '240px', flex: 1, maxWidth: '360px' }}>
            <input
              type="text"
              placeholder="Search documents by title or text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 16px',
                borderRadius: '8px',
                border: '1.5px solid var(--border)',
                background: 'var(--card)',
                color: 'var(--ink)',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <DocList documents={filteredDocs} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
}
