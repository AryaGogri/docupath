import { useState } from 'react';
import { generatePDF, copyToClipboard } from '../../services/pdfExport';
import { useToast } from '../../context/ToastContext';

export default function DocumentModal({ doc, isOpen, onClose, onSave }) {
  const showToast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(doc?.title || '');
  const [docText, setDocText] = useState(doc?.docText || '');
  const [status, setStatus] = useState(doc?.status || 'ready');

  if (!isOpen || !doc) return null;

  const handleCopy = async () => {
    const success = await copyToClipboard(docText);
    if (success) showToast('📋 Document copied to clipboard!');
  };

  const handleDownload = () => {
    generatePDF(docText, title);
    showToast('📥 Downloading PDF document...');
  };

  const handleSave = () => {
    onSave({
      ...doc,
      title,
      docText,
      status,
    });
    setIsEditing(false);
    showToast('💾 Document saved successfully!');
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '720px', width: '94%', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--accent)',
                  background: 'var(--bg)',
                  color: 'var(--ink)',
                  width: '100%',
                }}
              />
            ) : (
              <h3 style={{ margin: 0, fontSize: '1.35rem', fontFamily: 'var(--font-head)' }}>{title}</h3>
            )}
            <div style={{ fontSize: '0.82rem', color: 'var(--ink-ghost)', marginTop: '4px' }}>
              Created: {doc.date}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--ink-soft)' }}>Status:</label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                onSave({ ...doc, title, docText, status: e.target.value });
                showToast(`Status updated to ${e.target.value.toUpperCase()}`);
              }}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                background: 'var(--card)',
                color: 'var(--ink)',
                fontSize: '0.84rem',
                fontWeight: 600,
              }}
            >
              <option value="ready">Ready</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
            </select>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
          {isEditing ? (
            <textarea
              value={docText}
              onChange={(e) => setDocText(e.target.value)}
              style={{
                width: '100%',
                minHeight: '340px',
                padding: '16px',
                fontFamily: 'var(--font-code)',
                fontSize: '0.92rem',
                lineHeight: '1.6',
                background: 'var(--cream)',
                color: 'var(--ink)',
                border: '1.5px solid var(--accent)',
                borderRadius: '10px',
                outline: 'none',
              }}
            />
          ) : (
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                fontFamily: 'var(--font-code)',
                fontSize: '0.9rem',
                lineHeight: '1.7',
                background: 'var(--cream)',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                color: 'var(--ink)',
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              {docText}
            </pre>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-ghost btn-sm" onClick={handleCopy}>
              📋 Copy Text
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleDownload}>
              📥 Export PDF
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {isEditing ? (
              <button className="btn btn-primary btn-sm" onClick={handleSave}>
                💾 Save Changes
              </button>
            ) : (
              <button className="btn btn-ghost btn-sm" onClick={() => setIsEditing(true)}>
                ✏️ Edit Document
              </button>
            )}
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
