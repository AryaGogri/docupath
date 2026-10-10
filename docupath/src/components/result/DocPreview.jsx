import { useState } from 'react';
import { generatePDF, generateDOCX, copyToClipboard, shareViaWhatsApp, sendEmailReminder } from '../../services/pdfExport';
import { analyzeDocument } from '../../services/aiService';
import { useToast } from '../../context/ToastContext';
import SignaturePad from '../ui/SignaturePad';

export default function DocPreview({ title, content, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(content);
  const [signatureUrl, setSignatureUrl] = useState(null);
  const [showSigPad, setShowSigPad] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const showToast = useToast();

  const handleCopy = async () => {
    const success = await copyToClipboard(editableText);
    if (success) showToast('📋 Document text copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    generatePDF(editableText, title, signatureUrl);
    showToast('📥 Downloading PDF document...');
  };

  const handleDownloadDOCX = () => {
    generateDOCX(editableText, title);
    showToast('📄 Downloading Word (.doc) document...');
  };

  const handleWhatsAppShare = () => {
    const summary = editableText.slice(0, 150) + '...';
    shareViaWhatsApp(title, summary);
    showToast('💬 Opening WhatsApp...');
  };

  const handleEmailReminder = () => {
    sendEmailReminder(`Document Notice: ${title}`, editableText);
    showToast('✉️ Opening Email app...');
  };

  const handleRunAudit = () => {
    const res = analyzeDocument(editableText);
    setAuditResult(res);
    showToast(`🤖 AI Quality Score: ${res.score}/100 (${res.grade})`);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    if (onSave) onSave(editableText);
    showToast('💾 Edits saved!');
  };

  return (
    <div className="result-main">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="result-badge">Generated & Verified</span>
          <h2 style={{ marginTop: '6px' }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn btn-ghost btn-sm" onClick={handleRunAudit}>
            🤖 AI Audit Score
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowSigPad(true)}>
            ✍️ Add Signature
          </button>
          {isEditing ? (
            <button className="btn btn-primary btn-sm" onClick={handleSaveEdit}>
              💾 Done Editing
            </button>
          ) : (
            <button className="btn btn-ghost btn-sm" onClick={() => setIsEditing(true)}>
              ✏️ Edit Text
            </button>
          )}
        </div>
      </div>

      {/* AI Audit Result Box */}
      {auditResult && (
        <div
          style={{
            background: auditResult.score >= 80 ? 'var(--success-bg)' : 'var(--warn-bg)',
            border: `1px solid ${auditResult.score >= 80 ? 'var(--success)' : 'var(--warn)'}`,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
            <span>🤖 AI Document Quality Audit</span>
            <span style={{ fontSize: '1.1rem', color: auditResult.score >= 80 ? 'var(--success)' : 'var(--warn)' }}>
              Score: {auditResult.score}/100 ({auditResult.grade})
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', margin: '8px 0' }}>{auditResult.summary}</p>
          {auditResult.issues.length > 0 && (
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem' }}>
              {auditResult.issues.map((iss, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>
                  {iss.icon} {iss.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Digital Signature Modal */}
      {showSigPad && (
        <div className="modal-overlay open" onClick={() => setShowSigPad(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <SignaturePad
              onSave={(sigData) => {
                setSignatureUrl(sigData);
                showToast('✍️ Signature attached!');
              }}
              onClose={() => setShowSigPad(false)}
            />
          </div>
        </div>
      )}

      {/* Document View or Edit */}
      {isEditing ? (
        <textarea
          value={editableText}
          onChange={(e) => setEditableText(e.target.value)}
          style={{
            width: '100%',
            minHeight: '380px',
            padding: '20px',
            fontFamily: 'var(--font-code)',
            fontSize: '0.92rem',
            lineHeight: '1.7',
            background: 'var(--cream)',
            color: 'var(--ink)',
            border: '1.5px solid var(--accent)',
            borderRadius: '10px',
            outline: 'none',
          }}
        />
      ) : (
        <div className="doc-preview">
          <div className="doc-header-line">{title}</div>
          <div className="doc-date">Generated on {new Date().toLocaleDateString()}</div>
          <div className="doc-body">{editableText}</div>

          {signatureUrl && (
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px dashed var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-ghost)', fontWeight: 600, marginBottom: '6px' }}>
                ATTACHED DIGITAL SIGNATURE:
              </div>
              <img src={signatureUrl} alt="Digital Signature" style={{ height: '50px', background: '#fff', padding: '4px', borderRadius: '4px', border: '1px solid var(--border)' }} />
            </div>
          )}
        </div>
      )}

      {/* Export & Sharing Action Bar */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
        <button className="btn btn-primary btn-sm" onClick={handleDownloadPDF}>
          📥 Download PDF
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleDownloadDOCX}>
          📄 Export Word (.doc)
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleCopy}>
          📋 Copy Text
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleWhatsAppShare}>
          💬 Share WhatsApp
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleEmailReminder}>
          ✉️ Email Notice
        </button>
      </div>
    </div>
  );
}
