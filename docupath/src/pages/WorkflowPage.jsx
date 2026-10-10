import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { flows } from '../data/flows';
import StepIndicators from '../components/workflow/StepIndicators';
import OptionPill from '../components/workflow/OptionPill';
import UserInfoForm from '../components/workflow/UserInfoForm';
import { saveWorkflowProgress, loadWorkflowProgress, clearWorkflowProgress } from '../services/storage';
import { generateCustomDocument } from '../services/aiService';

export default function WorkflowPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const flowKey = searchParams.get('flow') || 'tenant';

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [customPrompt, setCustomPrompt] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
    other: '',
  });

  // Load saved workflow progress if it exists and matches current flow
  useEffect(() => {
    const saved = loadWorkflowProgress();
    if (saved && saved.flowKey === flowKey) {
      setCurrentStep(saved.currentStep);
      setAnswers(saved.answers);
      setUserInfo(saved.userInfo);
    } else {
      setCurrentStep(0);
      setAnswers({});
      setUserInfo({
        name: '',
        address: '',
        date: new Date().toISOString().split('T')[0],
        other: '',
      });
    }
  }, [flowKey]);

  if (flowKey === 'custom') {
    const handleCustomSubmit = (e) => {
      e.preventDefault();
      if (!customPrompt.trim()) return;

      const doc = generateCustomDocument(customPrompt, userInfo);
      sessionStorage.setItem('docupath_result_answers', JSON.stringify({ issue: customPrompt }));
      sessionStorage.setItem('docupath_result_user', JSON.stringify(userInfo));
      sessionStorage.setItem('docupath_result_flow', 'custom');
      sessionStorage.setItem('docupath_custom_doc', JSON.stringify(doc));
      navigate('/result');
    };

    return (
      <div className="page-enter container">
        <div className="workflow-shell">
          <div className="workflow-header">
            <h1>🤖 Custom AI Document Generator</h1>
            <p>Describe your custom legal document or situation in plain English</p>
          </div>

          <form onSubmit={handleCustomSubmit} className="q-card">
            <div className="input-group">
              <label>What document do you need?</label>
              <textarea
                rows={4}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Example: Non-Disclosure Agreement for a freelance software project, or Sublet Agreement for a 3-month summer term..."
                required
                style={{ width: '100%', fontSize: '1rem', padding: '14px' }}
              />
            </div>

            <UserInfoForm data={userInfo} onChange={setUserInfo} />

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">
                Generate Custom Document →
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const flow = flows[flowKey] || flows.tenant;
  const q = flow[currentStep];
  const isLast = q?.isLast;

  const saveProgress = (step, ans, user) => {
    saveWorkflowProgress({ flowKey, currentStep: step, answers: ans, userInfo: user });
  };

  const handleSelectOption = (val) => {
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);
    saveProgress(currentStep, newAnswers, userInfo);
  };

  const handleGoNext = () => {
    if (!answers[q.id]) return;

    if (currentStep >= flow.length - 1) {
      // Complete workflow and clear temporary progress
      clearWorkflowProgress();
      // Store session data temporarily to read in result page
      sessionStorage.setItem('docupath_result_answers', JSON.stringify(answers));
      sessionStorage.setItem('docupath_result_user', JSON.stringify(userInfo));
      sessionStorage.setItem('docupath_result_flow', flowKey);
      navigate('/result');
    } else {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveProgress(nextStep, answers, userInfo);
    }
  };

  const handleGoBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      saveProgress(prevStep, answers, userInfo);
    }
  };

  const progressPercent = (currentStep / flow.length) * 100;

  return (
    <div className="page-enter container">
      <div className="workflow-shell">
        <div className="workflow-header">
          <h1>Let us find your document</h1>
          <p>Answer a few quick questions — no typing needed</p>
        </div>

        <StepIndicators steps={flow} currentStep={currentStep} />

        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        {q && (
          <div className="q-card">
            <h2>{q.title}</h2>
            <p className="q-sub">{q.sub}</p>

            <div className="options-list">
              {q.options.map((opt) => (
                <OptionPill
                  key={opt.value}
                  option={opt}
                  isSelected={answers[q.id] === opt.value}
                  onClick={() => handleSelectOption(opt.value)}
                />
              ))}
            </div>

            {q.info && (
              <div className="info-callout" style={{ display: 'flex' }}>
                <span className="ic-icon" aria-hidden="true">💡</span>
                <p>{q.info}</p>
              </div>
            )}

            {isLast && (
              <UserInfoForm
                data={userInfo}
                onChange={(newData) => {
                  setUserInfo(newData);
                  saveProgress(currentStep, answers, newData);
                }}
              />
            )}

            <div className="q-nav">
              <button
                className="btn-back"
                onClick={handleGoBack}
                style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
              >
                ← Back
              </button>
              {answers[q.id] && (
                <button className="btn btn-primary" onClick={handleGoNext}>
                  {isLast ? 'Generate Document →' : 'Continue →'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
