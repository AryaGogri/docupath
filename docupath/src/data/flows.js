export const flows = {
  tenant: [
    {
      id: 'issue',
      title: 'What tenant issue are you experiencing?',
      sub: 'Select the primary concern you need to address with your landlord.',
      info: 'Your response determines the legal tone and clauses included in your document.',
      options: [
        { value: 'repairs', label: 'Unaddressed Repairs / Maintenance', desc: 'Plumbing, electrical, structural, or appliance damage' },
        { value: 'deposit', label: 'Security Deposit Refund Dispute', desc: 'Unjustified deductions or delayed refund after moving out' },
        { value: 'eviction', label: 'Unlawful Eviction Notice Response', desc: 'Improper notice period, harassment, or illegal rent hike' },
        { value: 'lease', label: 'Lease Agreement Revision / Termination', desc: 'Early termination request or lease clause dispute' },
      ],
    },
    {
      id: 'noticePeriod',
      title: 'Has formal notice already been given?',
      sub: 'Indicate whether you have previously communicated this issue in writing.',
      info: 'Prior written notices provide critical evidence if escalation to housing authority is needed.',
      options: [
        { value: 'first', label: 'No, this is my first formal notice', desc: 'Establishes a firm 7-14 day resolution window' },
        { value: 'reminder', label: 'Yes, but it was ignored', desc: 'Final demand letter warning of legal or tribunal action' },
        { value: 'response', label: 'Responding to landlord letter', desc: 'Formal reply addressing claims made by landlord' },
      ],
    },
    {
      id: 'severity',
      title: 'How urgent is this matter?',
      sub: 'Choose the level of urgency for this request.',
      isLast: true,
      options: [
        { value: 'urgent', label: 'Urgent / Health & Safety Risk', desc: 'Requires action within 48 hours' },
        { value: 'standard', label: 'Standard Notice (7-14 Days)', desc: 'Standard turnaround for non-emergency issues' },
        { value: 'final', label: 'Final Notice before escalation', desc: 'Pre-litigation warning with 7 days deadline' },
      ],
    },
  ],
  grant: [
    {
      id: 'grantType',
      title: 'What type of grant application is this?',
      sub: 'Select the funding category you are applying for.',
      info: 'Each category highlights different project objectives and milestones.',
      options: [
        { value: 'artist', label: 'Arts & Cultural Grant', desc: 'Visual arts, music, performance, or creative projects' },
        { value: 'research', label: 'Academic & Research Grant', desc: 'Scientific study, field research, or publication' },
        { value: 'community', label: 'Community / NGO Project', desc: 'Social impact, local welfare, or environmental initiative' },
      ],
    },
    {
      id: 'stage',
      title: 'What is the project stage?',
      sub: 'Choose the current state of your project.',
      isLast: true,
      options: [
        { value: 'conception', label: 'Initial Concept & Planning', desc: 'Seeking seed funding for prototype or research phase' },
        { value: 'execution', label: 'Mid-stage Implementation', desc: 'Scaling an active project with proven traction' },
      ],
    },
  ],
  legal: [
    {
      id: 'type',
      title: 'What type of legal notice do you need to draft?',
      sub: 'Select the nature of the dispute.',
      info: 'Legal notices must follow strict formatting to maintain validity in court.',
      options: [
        { value: 'payment', label: 'Recovery of Unpaid Dues / Money', desc: 'Outstanding invoices, salary dues, or loans' },
        { value: 'breach', label: 'Breach of Contract / Agreement', desc: 'Non-performance or violation of contract terms' },
        { value: 'property', label: 'Property & Possession Claim', desc: 'Unauthorized occupancy or property damage' },
      ],
    },
    {
      id: 'deadline',
      title: 'What deadline would you like to set for response?',
      sub: 'Select the statutory response period.',
      isLast: true,
      options: [
        { value: '15days', label: '15 Days Statutory Notice', desc: 'Standard statutory notice period' },
        { value: '30days', label: '30 Days Formal Notice', desc: 'Recommended for complex financial or property disputes' },
      ],
    },
  ],
  visa: [
    {
      id: 'visaType',
      title: 'What type of Visa application is this?',
      sub: 'Select your purpose of travel.',
      info: 'Your cover letter will highlight the relevant proof of funds and ties to home country.',
      options: [
        { value: 'tourist', label: 'Tourist / Visitor Visa', desc: 'Sightseeing, family visit, or short-term vacation' },
        { value: 'business', label: 'Business / Conference Visa', desc: 'Attending meetings, trade shows, or corporate events' },
        { value: 'student', label: 'Student / Academic Visa', desc: 'Enrolling in university or short training course' },
      ],
    },
    {
      id: 'duration',
      title: 'Intended duration of stay?',
      sub: 'Select the expected length of your visit.',
      isLast: true,
      options: [
        { value: 'short', label: 'Short Stay (Under 30 days)', desc: 'Single entry or short itinerary' },
        { value: 'long', label: 'Extended Stay (30-90+ days)', desc: 'Multiple entry or semester-long program' },
      ],
    },
  ],
  smallclaims: [
    {
      id: 'claimReason',
      title: 'What is the basis of your Small Claim?',
      sub: 'Select the reason for financial recovery.',
      info: 'Small claims notices must quantify the exact claim amount and date of default.',
      options: [
        { value: 'unpaidInvoice', label: 'Unpaid Freelance / Service Invoice', desc: 'Provided work or service without payment' },
        { value: 'damagedProperty', label: 'Damaged Personal Goods / Property', desc: 'Negligence or property destruction claim' },
        { value: 'deposit', label: 'Unreturned Service Deposit', desc: 'Security or vendor advance deposit' },
      ],
    },
    {
      id: 'amountCategory',
      title: 'Estimated Claim Amount?',
      sub: 'Select the claim bracket.',
      isLast: true,
      options: [
        { value: 'minor', label: 'Under ₹50,000 / $1,000', desc: 'Ideal for informal demand letter resolution' },
        { value: 'major', label: '₹50,000 - ₹5,000,000 / $1,000-$10,000', desc: 'Formal pre-litigation demand letter' },
      ],
    },
  ],
  govt: [
    {
      id: 'govtAppType',
      title: 'What type of Government Application?',
      sub: 'Select the department or scheme.',
      info: 'Structured cover letters speed up processing in administrative offices.',
      options: [
        { value: 'permit', label: 'Permit / License Registration', desc: 'Business license, municipal permission, or trade permit' },
        { value: 'subsidy', label: 'Scheme / Subsidy Benefit', desc: 'Government welfare or incentive application' },
        { value: 'correction', label: 'Record / Certificate Correction', desc: 'Address, name, or detail correction request' },
      ],
    },
    {
      id: 'urgency',
      title: 'Application Priority',
      sub: 'Select filing timeframe.',
      isLast: true,
      options: [
        { value: 'normal', label: 'Standard Processing', desc: 'Routine application queue' },
        { value: 'expedited', label: 'Urgent / Expedited Review', desc: 'Time-sensitive deadline application' },
      ],
    },
  ],
};
