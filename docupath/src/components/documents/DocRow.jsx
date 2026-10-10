import { useState } from 'react';
import { generatePDF } from '../../services/pdfExport';
import { useToast } from '../../context/ToastContext';
import { useJurisdiction } from '../../context/JurisdictionContext';
import { formatStateLabel } from '../../utils/formatters';
import DocumentModal from '../modals/DocumentModal';

export default function DocRow({ doc, onDelete, onUpdate }) {
  const showToast = useToast();
  const { jurisdiction } = useJurisdiction();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDownload = (e) => {
    e.stopPropagation();
    if (doc.docText) {
      generatePDF(doc.docText, doc.title);
      showToast('⬇️ PDF download started!');
    } else {
      showToast('⚠️ No document content found.');
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(doc.id);
  };

  const statusLabel = doc.status === 'ready' ? 'Ready' : doc.status === 'submitted' ? 'Submitted' : 'Pending';

  return (
    <>
      <div
        className="doc-row"
        role="listitem"
        onClick={() => setModalOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        <div className="dr-icon" aria-hidden="true">📄</div>
        <div className="dr-info">
          <div className="dr-title">
            {doc.title}
            <span className={`status-badge ${doc.status}`}>{statusLabel}</span>
          </div>
          <div className="dr-meta">
            Created {doc.date} · {formatStateLabel(jurisdiction.state)}, {jurisdiction.country.toUpperCase()}
          </div>
        </div>
        <div className="dr-actions">
          <button className="btn-sm primary" onClick={handleDownload} aria-label={`Download ${doc.title} as PDF`}>
            Download
          </button>
          <button className="btn-sm" onClick={() => setModalOpen(true)} aria-label={`View ${doc.title}`}>
            View & Edit
          </button>
          <button className="btn-sm" style={{ color: '#ef4444' }} onClick={handleDelete} aria-label={`Delete ${doc.title}`}>
            Delete
          </button>
        </div>
      </div>

      <DocumentModal
        doc={doc}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(updatedDoc) => {
          if (onUpdate) onUpdate(updatedDoc);
        }}
      />
    </>
  );
}
