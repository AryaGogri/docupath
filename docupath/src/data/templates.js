import { sanitizeInput } from '../services/sanitizer';

export const resultTemplates = {
  tenant: {
    title: 'Landlord Repair Request Letter',
    sub: 'A formal letter requesting urgent repair — personalised to your situation.',
    ai: 'This letter formally asks your landlord to fix a problem in your rented home. It states what the problem is, how long it has existed, and gives them a deadline to act. If they ignore it, you can use this letter as proof that you tried to resolve the issue.',
    doc(ans, u) {
      const name = sanitizeInput(u.name || '[YOUR NAME]');
      const address = sanitizeInput(u.address || '[YOUR ADDRESS]');
      const date = sanitizeInput(u.date || '[DATE]');
      const other = sanitizeInput(u.other || '[LANDLORD NAME]');
      const urgTag = ans.t_safety === 'urgent' ? 'URGENT' : 'Standard';
      const prev = ans.t_informed !== 'first'
        ? `I have previously communicated this issue to you via ${ans.t_informed === 'written' ? 'written correspondence' : 'verbal communication'}.`
        : 'This is my first formal notice regarding this matter.';
      const dur = ans.t_duration === 'lt7' ? 'less than one week' : ans.t_duration === '1-4w' ? 'several weeks' : 'over one month';
      return `${name}\n${address}\n${date}\n\n${other}\n[LANDLORD ADDRESS]\n\nDear ${other},\n\nRe: ${urgTag} Repair Request — [BRIEF ISSUE DESCRIPTION]\n\n${prev}\n\nI am writing to formally request that the above-mentioned issue be addressed as a matter of priority. The issue has persisted for ${dur}, and ${ans.t_safety === 'urgent' ? 'it poses a direct risk to safety and health, requiring immediate attention under applicable tenant protection laws' : 'it affects the habitability and comfort of the premises'}.\n\nI kindly request that repairs be completed within 14 days of this notice. If no action is taken, I reserve the right to escalate this matter to the appropriate authority.\n\nThank you for your prompt attention.\n\nSincerely,\n${name}`;
    },
    deadlines: [
      { icon: '📅', label: 'Send this letter', val: 'Within 2 days' },
      { icon: '⏳', label: 'Landlord response expected', val: 'Within 14 days' },
      { icon: '📬', label: 'Follow up if no response', val: 'Day 15' },
    ],
    checklist: [
      'Write your name and address on top',
      'Include the date you send it',
      'Send by email AND post if possible',
      'Keep a copy for your records',
      'Note the date of sending',
    ],
    whatIf: 'If your landlord does not respond within 14 days, you can file a complaint with your local housing authority or seek legal advice. For urgent / safety issues, you may be able to arrange repairs yourself and claim costs back.',
  },
  grant: {
    title: 'Grant Application Cover Letter',
    sub: 'A compelling cover letter tailored to your grant type and situation.',
    ai: 'This cover letter introduces you and your project to the grant committee. It highlights why you are a good fit, what your project will achieve, and how the money will be used. A strong cover letter is often the deciding factor in grant applications.',
    doc(ans, u) {
      const name = sanitizeInput(u.name || '[YOUR NAME]');
      const date = sanitizeInput(u.date || '[DATE]');
      const gtype = ans.g_type === 'artist' ? 'Artist / Cultural' : ans.g_type === 'scholarship' ? 'Academic Scholarship' : 'Business Development';
      const exp = ans.g_status === 'won'
        ? 'Having previously received funding support, I have demonstrated my ability to deliver on project goals.'
        : ans.g_status === 'prev'
          ? 'Having previously applied for similar opportunities, I have refined my approach and project planning.'
          : 'As a first-time applicant, I bring fresh perspective and strong commitment to this endeavour.';
      return `${name}\n[EMAIL]\n${date}\n\n[GRANT COMMITTEE NAME]\n[ORGANISATION ADDRESS]\n\nDear Grant Committee,\n\nRe: Application for ${gtype} Grant\n\nI am writing to express my keen interest in applying for the above-mentioned grant. ${exp}\n\nMy project, [PROJECT NAME], aims to [BRIEF PROJECT DESCRIPTION]. The requested amount of ₹[AMOUNT] will be used for [HOW FUNDS WILL BE USED].\n\nI look forward to discussing this application further.\n\nWarm regards,\n${name}`;
    },
    deadlines: [
      { icon: '📅', label: 'Submit application', val: 'Check grant portal' },
      { icon: '⏳', label: 'Prepare portfolio / references', val: '1 week before deadline' },
      { icon: '📬', label: 'Follow up after submission', val: '2 weeks after' },
    ],
    checklist: [
      'Personalise the letter with your name and project',
      'Attach your portfolio or resume',
      'Include references if required',
      'Double-check the grant criteria',
      'Submit before the deadline',
    ],
    whatIf: 'If you do not act before the deadline, you will miss this grant cycle. Most grants run annually — missing one means waiting another year. Start early and apply to multiple grants to maximise your chances.',
  },
  legal: {
    title: 'Legal Notice Letter',
    sub: 'A formal legal notice — properly structured with the right language.',
    ai: 'This is an official notice that tells the other person about a problem and gives them a set number of days to fix it. It is written in a way that courts and authorities recognise. Keeping a copy is important — it proves you tried to resolve things before taking further action.',
    doc(ans, u) {
      const name = sanitizeInput(u.name || '[YOUR NAME]');
      const address = sanitizeInput(u.address || '[YOUR ADDRESS]');
      const date = sanitizeInput(u.date || '[DATE]');
      const other = sanitizeInput(u.other || '[RECIPIENT NAME]');
      const topic = ans.l_topic === 'payment' ? 'Outstanding Payment' : ans.l_topic === 'property' ? 'Property / Possession Dispute' : 'Breach of Contract';
      const dir = ans.l_direction === 'send'
        ? 'You are hereby required to respond to and resolve this matter within 30 days of receiving this notice.'
        : 'I am responding to your notice dated [DATE OF THEIR NOTICE] and wish to state my position clearly.';
      const ev = ans.l_evidence === 'yes'
        ? 'I have attached all relevant supporting documents as proof.'
        : ans.l_evidence === 'some'
          ? 'I have attached available supporting documents; further evidence may follow.'
          : 'I will provide supporting documentation upon request.';
      return `${name}\n${address}\n${date}\n\n${other}\n[RECIPIENT ADDRESS]\n\nTo Whom It May Concern,\n\nRe: Legal Notice — ${topic}\n\nI hereby serve you this notice regarding the matter described above. ${dir}\n\n${ev}\n\nFailure to respond or take appropriate action within the stipulated period may result in further legal proceedings.\n\nPlease treat this as a matter of urgency.\n\nSincerely,\n${name}`;
    },
    deadlines: [
      { icon: '📅', label: 'Send the notice', val: 'Today' },
      { icon: '⏳', label: 'Response deadline', val: '30 days from delivery' },
      { icon: '📬', label: 'Escalate if no response', val: 'Day 31' },
    ],
    checklist: [
      'Sign the letter',
      'Send via registered post (keep receipt)',
      'Send a copy via email as well',
      'Keep original copy safely',
      'Note the exact delivery date',
    ],
    whatIf: 'If you do not send this notice, you may lose the right to claim or respond formally. In many cases, a legal notice is a prerequisite before filing a court case. Ignoring this step can weaken your legal standing.',
  },
  visa: {
    title: 'Visa Application Cover Letter',
    sub: 'A professional cover letter for your visa application.',
    ai: 'This cover letter supports your visa application by clearly stating who you are, why you want to visit or move to the country, and that you meet all the requirements. Embassies read hundreds of applications — a clear, honest letter makes yours stand out.',
    doc(ans, u) {
      const name = sanitizeInput(u.name || '[YOUR NAME]');
      const date = sanitizeInput(u.date || '[DATE]');
      const vtype = ans.v_type === 'tourist' ? 'Tourist' : ans.v_type === 'work' ? 'Work' : ans.v_type === 'student' ? 'Student' : 'Family Reunification';
      const dest = ans.v_country === 'us' ? 'the United States' : ans.v_country === 'uk' ? 'the United Kingdom' : ans.v_country === 'au' ? 'Australia' : '[COUNTRY NAME]';
      const prev = ans.v_previous === 'rejected'
        ? 'I wish to transparently address that a previous application was not successful. I have since addressed the concerns raised and am reapplying with updated documentation.'
        : 'I have a clean immigration record with no previous visa issues.';
      return `${name}\n[PASSPORT NUMBER]\n${date}\n\nThe Visa Officer\nEmbassy / Consulate of ${dest}\n\nDear Visa Officer,\n\nRe: ${vtype} Visa Application\n\nI am writing to support my application for a ${vtype} visa to ${dest}. ${prev}\n\nI am employed at [EMPLOYER] and will be visiting for [PURPOSE / DURATION]. I have attached all supporting documents including proof of funds, accommodation, and travel itinerary.\n\nI kindly request your favourable consideration of my application.\n\nYours faithfully,\n${name}`;
    },
    deadlines: [
      { icon: '📅', label: 'Submit application', val: 'Check embassy portal' },
      { icon: '⏳', label: 'Processing time', val: '2–6 weeks typical' },
      { icon: '📬', label: 'Follow up if no response', val: 'After 6 weeks' },
    ],
    checklist: [
      'Attach passport copy',
      'Include proof of funds',
      'Add accommodation details',
      'Include travel itinerary',
      'Double-check form entries',
    ],
    whatIf: 'Missing your visa application deadline can delay your trip by weeks or months. Some visa categories have limited slots — applying late may mean waiting for the next cycle.',
  },
  smallclaims: {
    title: 'Small Claims Court Filing',
    sub: 'A structured claim document ready for tribunal submission.',
    ai: 'This document outlines your claim for the court or tribunal. It clearly states what happened, how much is owed, and what evidence you have. Courts expect a specific format — this document follows that format so your claim is taken seriously.',
    doc(ans, u) {
      const name = sanitizeInput(u.name || '[YOUR NAME]');
      const address = sanitizeInput(u.address || '[YOUR ADDRESS]');
      const date = sanitizeInput(u.date || '[DATE]');
      const other = sanitizeInput(u.other || '[DEFENDANT NAME]');
      const claimType = ans.sc_type === 'debt' ? 'Outstanding Debt / Unpaid Amount' : ans.sc_type === 'product' ? 'Defective Product Claim' : 'Property Damage Claim';
      const amount = ans.sc_amount === 'small' ? 'under ₹50,000' : ans.sc_amount === 'medium' ? 'between ₹50,000 and ₹2,00,000' : 'above ₹2,00,000';
      const notice = ans.sc_notice === 'sent'
        ? 'A demand notice was sent on [DATE OF NOTICE] and no satisfactory response was received.'
        : 'A formal demand notice will be sent prior to filing this claim.';
      return `${name}\n${address}\n${date}\n\nBefore the [TRIBUNAL / COURT NAME]\n\nClaimant: ${name}\nDefendant: ${other}\n\nSubject: ${claimType}\n\nI, ${name}, hereby file this claim against ${other} for an amount of ${amount}.\n\n${notice}\n\nFacts of the case:\n1. [DESCRIBE WHAT HAPPENED]\n2. [DESCRIBE THE LOSS / DAMAGE]\n3. [STATE THE AMOUNT CLAIMED]\n\nRelief sought: Payment of the claimed amount plus applicable interest and costs.\n\nSincerely,\n${name}`;
    },
    deadlines: [
      { icon: '📅', label: 'Send demand notice', val: 'Immediately' },
      { icon: '⏳', label: 'Wait period after notice', val: '30 days' },
      { icon: '📬', label: 'File at tribunal', val: 'After 30 days' },
    ],
    checklist: [
      'Gather all evidence (receipts, photos, contracts)',
      'Send demand notice first',
      'Wait for the mandatory response period',
      'File at the correct tribunal for your amount',
      'Keep copies of everything',
    ],
    whatIf: 'If you do not file your claim within the limitation period (typically 3 years for most civil claims), you may lose the right to claim entirely. Acting promptly is important.',
  },
  govt: {
    title: 'Government Application Cover Letter',
    sub: 'A formal application letter for government processes.',
    ai: 'This cover letter accompanies your government application. It summarizes who you are, what you are applying for, and lists all attached documents. Government offices process thousands of applications — a well-structured cover letter helps yours get processed faster.',
    doc(ans, u) {
      const name = sanitizeInput(u.name || '[YOUR NAME]');
      const address = sanitizeInput(u.address || '[YOUR ADDRESS]');
      const date = sanitizeInput(u.date || '[DATE]');
      const appType = ans.go_type === 'biz' ? 'Business Registration' : ans.go_type === 'permit' ? 'Building Permit' : 'Government Subsidy';
      const status = ans.go_status === 'new'
        ? 'This is a new application.'
        : ans.go_status === 'renew'
          ? 'This is a renewal application. My existing registration number is [REG NUMBER].'
          : 'This is a correction / amendment to a previously submitted application (Ref: [REF NUMBER]).';
      const docs = ans.go_docs === 'ready'
        ? 'All required documents are enclosed herewith.'
        : ans.go_docs === 'partial'
          ? 'Most documents are enclosed. Remaining documents will be submitted within [X] days.'
          : 'I request guidance on the complete list of documents required.';
      return `${name}\n${address}\n${date}\n\nTo,\nThe [AUTHORITY NAME]\n[DEPARTMENT]\n[ADDRESS]\n\nSubject: Application for ${appType}\n\nRespected Sir/Madam,\n\n${status}\n\nI am writing to formally apply for ${appType.toLowerCase()}. ${docs}\n\nI request your kind consideration and timely processing of this application.\n\nThanking you,\n${name}`;
    },
    deadlines: [
      { icon: '📅', label: 'Submit application', val: 'Check govt portal' },
      { icon: '⏳', label: 'Processing time', val: '15–45 days typical' },
      { icon: '📬', label: 'Follow up', val: 'After 30 days' },
    ],
    checklist: [
      'Verify all required documents',
      'Make photocopies of everything',
      'Get documents notarized if required',
      'Pay applicable fees',
      'Keep the acknowledgment receipt',
    ],
    whatIf: 'Government applications often have fixed deadlines. Missing them may mean waiting for the next cycle (quarterly or annually). Some subsidies are first-come-first-served — early submission is advantageous.',
  },
};
