import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DocPreview from '../components/result/DocPreview';
import AiExplanation from '../components/result/AiExplanation';
import ChecklistSidebar from '../components/result/ChecklistSidebar';
import DeadlineSidebar from '../components/result/DeadlineSidebar';
import { loadDocuments, saveDocuments } from '../services/storage';
import { useToast } from '../context/ToastContext';

export default function ResultPage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [docData, setDocData] = useState(null);

  useEffect(() => {
    const rawAnswers = sessionStorage.getItem('docupath_result_answers');
    const rawUser = sessionStorage.getItem('docupath_result_user');
    const flowKey = sessionStorage.getItem('docupath_result_flow') || 'tenant';

    const answers = rawAnswers ? JSON.parse(rawAnswers) : {};
    const user = rawUser ? JSON.parse(rawUser) : { name: 'Applicant Name', address: '123 Main St', date: new Date().toISOString().split('T')[0] };

    const titleMap = {
      tenant: 'Formal Tenant Repair Request & Notice',
      grant: 'Grant Application Cover Letter',
      legal: 'Formal Legal Notice for Claim / Recovery',
      visa: 'Visa Application Cover Letter',
      smallclaims: 'Demand Letter — Small Claims Pre-litigation',
      govt: 'Official Government Application Request',
    };

    const docTitle = titleMap[flowKey] || 'Official Document';

    const docText = `DATE: ${user.date || new Date().toLocaleDateString()}

FROM:
${user.name || '[Your Name]'}
${user.address || '[Your Address]'}

TO:
[Recipient / Landlord / Authority Name]
[Recipient Address]

SUBJECT: ${docTitle.toUpperCase()}

Dear Sir/Madam,

I am writing this formal letter to bring to your immediate attention the matter regarding ${answers.issue || answers.grantType || answers.type || answers.visaType || answers.claimReason || answers.govtAppType || 'our ongoing request'}.

DETAILS & CLAUSES:
- Category / Intent: ${answers.issue || answers.grantType || answers.type || answers.visaType || answers.claimReason || answers.govtAppType || 'Standard request'}
- Communication Stage: ${answers.noticePeriod || answers.stage || answers.duration || answers.amountCategory || 'Initial Notice'}
- Priority Level: ${answers.severity || answers.deadline || answers.urgency || 'Standard Timeframe'}

${user.other ? `ADDITIONAL DETAILS:\n${user.other}\n` : ''}
REMEDY / REQUESTED ACTION:
Please treat this document as formal notice to resolve the specified request within the statutory timeframe from receipt of this letter.

Sincerely,

_________________________
${user.name || '[Your Name]'}`;

    const explanation = `This document uses clear, plain-English legal language designed to meet standard notification requirements while remaining formal and binding in your jurisdiction.`;

    const checklist = [
      'Print 2 physical copies of this document',
      'Sign and date both copies clearly',
      'Send via Registered Mail or Courier for delivery proof',
      'Keep tracking receipt in your record file',
    ];

    const deadlines = [
      { icon: '📅', label: 'Send Notice', val: 'Within 3 days' },
      { icon: '⏱️', label: 'Response Deadline', val: '14 days after receipt' },
      { icon: '⚖️', label: 'Escalation Window', val: 'After 15 days if unanswered' },
    ];

    setDocData({
      title: docTitle,
      text: docText,
      flowKey,
      explanation,
      checklist,
      deadlines,
    });
  }, []);

  const handleSaveToAccount = () => {
    if (!docData) return;
    const existing = loadDocuments();
    const newDoc = {
      id: Date.now(),
      title: docData.title,
      type: docData.flowKey,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'ready',
      docText: docData.text,
      deadlines: docData.deadlines.map((d) => ({ label: d.label, due: d.val })),
    };
    saveDocuments([newDoc, ...existing]);
    showToast('💾 Saved to My Documents!');
    navigate('/documents');
  };

  if (!docData) {
    return (
      <div className="container" style={{ padding: '80px', textAlign: 'center' }}>
        <div className="skeleton" style={{ height: '300px', maxWidth: '600px', margin: '0 auto' }} />
      </div>
    );
  }

  return (
    <div className="page-enter container">
      <div style={{ margin: '40px 0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '2.2rem', margin: 0 }}>Your Document is Ready</h1>
          <p style={{ color: 'var(--ink-soft)', margin: '4px 0 0 0' }}>Review, edit, export, or save to your account.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSaveToAccount}>
          💾 Save to My Documents
        </button>
      </div>

      <div className="result-layout" style={{ padding: 0 }}>
        <DocPreview
          title={docData.title}
          content={docData.text}
          onSave={(updatedText) => setDocData((prev) => ({ ...prev, text: updatedText }))}
        />

        <div className="result-sidebar">
          <AiExplanation explanation={docData.explanation} />
          <ChecklistSidebar checklist={docData.checklist} />
          <DeadlineSidebar deadlines={docData.deadlines} />
        </div>
      </div>
    </div>
  );
}
