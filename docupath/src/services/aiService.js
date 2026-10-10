/**
 * AI Service — Legal document generator, scanner, and intent assistant.
 */

const INTENT_PATTERNS = [
  { pattern: /rent|tenant|landlord|repair|leak|evict/i, flow: 'tenant', response: 'It sounds like you have a tenant issue. I can help you generate a repair request, deposit dispute letter, or eviction response.' },
  { pattern: /grant|scholarship|funding|artist|creative/i, flow: 'grant', response: 'I can help you create a compelling grant application cover letter for arts, research, or NGO projects.' },
  { pattern: /legal|notice|sue|court|lawyer/i, flow: 'legal', response: 'For legal notices, I can help you draft a formal notice for payment recovery, contract breach, or property claims.' },
  { pattern: /visa|passport|travel|immigration/i, flow: 'visa', response: 'I can help create a professional visa cover letter tailored to your destination and visa type.' },
  { pattern: /claim|refund|damage|defective|consumer/i, flow: 'smallclaims', response: 'It sounds like you need a small claims demand letter. I can guide you step by step.' },
  { pattern: /government|permit|registration|subsidy/i, flow: 'govt', response: 'For government applications, I can help you create a structured cover letter and checklist.' },
  { pattern: /hello|hi|hey|help/i, flow: null, response: 'Hello! I\'m your DocuPath AI assistant. Describe your situation and I\'ll guide you to the right document.' },
];

export function getAiResponse(message) {
  const lower = message.toLowerCase().trim();

  for (const intent of INTENT_PATTERNS) {
    if (intent.pattern.test(lower)) {
      return {
        text: intent.response,
        suggestedFlow: intent.flow,
        confidence: 0.85,
      };
    }
  }

  return {
    text: 'You can select from our guided templates or type any custom document prompt (e.g., "NDA Agreement", "Sublet Lease", "Freelance Service Contract").',
    suggestedFlow: 'custom',
    confidence: 0.5,
  };
}

/**
 * AI Document Completeness & Quality Audit
 */
export function analyzeDocument(text = '') {
  const issues = [];
  const lower = text.toLowerCase();
  let score = 100;

  // 1. Check for Date
  if (!lower.includes('date:') && !lower.includes('dated')) {
    issues.push({ type: 'warning', icon: '📅', message: 'Missing Date — Legal documents must clearly state the issue date.' });
    score -= 15;
  }

  // 2. Check for Placeholders [BRACKETS]
  const placeholderMatches = text.match(/\[[^\]]+\]/g);
  if (placeholderMatches && placeholderMatches.length > 0) {
    issues.push({
      type: 'danger',
      icon: '⚠️',
      message: `Unfilled Placeholders Detected — Found ${placeholderMatches.length} bracketed field(s) e.g., "${placeholderMatches[0]}". Fill them before sending.`,
    });
    score -= 25;
  }

  // 3. Check for Subject Line
  if (!lower.includes('subject:') && !lower.includes('re:')) {
    issues.push({ type: 'warning', icon: '📌', message: 'Missing Subject Line — Adding a clear "SUBJECT:" improves formal clarity.' });
    score -= 10;
  }

  // 4. Check for Formal Closing
  if (!lower.includes('sincerely') && !lower.includes('regards') && !lower.includes('faithfully')) {
    issues.push({ type: 'info', icon: '✍️', message: 'Missing Formal Closing — Consider ending with "Sincerely" or "Yours faithfully".' });
    score -= 10;
  }

  // 5. Check for Actionable Deadline / Timeframe
  if (!lower.includes('days') && !lower.includes('within') && !lower.includes('deadline')) {
    issues.push({ type: 'info', icon: '⏱️', message: 'No Explicit Deadline — Specifying a response timeframe (e.g., "within 14 days") adds urgency.' });
    score -= 10;
  }

  // 6. Check Word Length
  if (text.length < 180) {
    issues.push({ type: 'warning', icon: '📏', message: 'Document is quite short. Consider adding more context or evidence details.' });
    score -= 10;
  }

  const finalScore = Math.max(10, score);
  const grade = finalScore >= 90 ? 'A+ (Excellent)' : finalScore >= 75 ? 'B (Good)' : 'C (Needs Review)';

  return {
    score: finalScore,
    grade,
    issues,
    summary:
      issues.length === 0
        ? '✅ Excellent! Your document meets formal legal standards with zero missing fields.'
        : `Scanned document: Found ${issues.length} item(s) to optimize.`,
  };
}

/**
 * Custom AI Document Generator for custom prompts
 */
export function generateCustomDocument(prompt, userDetails = {}) {
  const title = prompt.length > 30 ? `${prompt.slice(0, 30)}...` : prompt;
  const dateStr = userDetails.date || new Date().toISOString().split('T')[0];
  const senderName = userDetails.name || '[Your Name]';
  const senderAddress = userDetails.address || '[Your Address]';

  const generatedText = `DATE: ${dateStr}

FROM:
${senderName}
${senderAddress}

TO:
[Recipient / Company Name]
[Recipient Address]

SUBJECT: FORMAL DOCUMENT — ${prompt.toUpperCase()}

Dear Sir/Madam,

This document is drafted in connection with: ${prompt}.

BACKGROUND & OBJECTIVE:
I am writing to formally record our understanding and request regarding the aforementioned matter. All terms shall be governed by statutory guidelines in our jurisdiction.

TERMS & CONDITIONS / REQUEST:
1. Scope & Objective: ${prompt}
2. Timeline & Compliance: Resolution or compliance requested within 14 days from receipt.
3. Next Steps: Formal acknowledgment required in writing.

Sincerely,

_________________________
${senderName}`;

  return {
    title: `Custom Doc: ${title}`,
    docText: generatedText,
  };
}
