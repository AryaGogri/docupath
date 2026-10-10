export const countries = [
  { value: 'india', label: 'India', flag: '🇮🇳' },
  { value: 'usa', label: 'United States', flag: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'australia', label: 'Australia', flag: '🇦🇺' },
  { value: 'canada', label: 'Canada', flag: '🇨🇦' },
];

export const statesByCountry = {
  india: [
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'tamil_nadu', label: 'Tamil Nadu' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'west_bengal', label: 'West Bengal' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
    { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
  ],
  usa: [
    { value: 'california', label: 'California' },
    { value: 'new_york', label: 'New York' },
    { value: 'texas', label: 'Texas' },
    { value: 'florida', label: 'Florida' },
    { value: 'illinois', label: 'Illinois' },
  ],
  uk: [
    { value: 'england', label: 'England' },
    { value: 'scotland', label: 'Scotland' },
    { value: 'wales', label: 'Wales' },
    { value: 'northern_ireland', label: 'Northern Ireland' },
  ],
  australia: [
    { value: 'nsw', label: 'New South Wales' },
    { value: 'victoria', label: 'Victoria' },
    { value: 'queensland', label: 'Queensland' },
    { value: 'wa', label: 'Western Australia' },
  ],
  canada: [
    { value: 'ontario', label: 'Ontario' },
    { value: 'quebec', label: 'Quebec' },
    { value: 'british_columbia', label: 'British Columbia' },
    { value: 'alberta', label: 'Alberta' },
  ],
};

/** Jurisdiction-specific law references for enhanced document templates */
export const jurisdictionLaws = {
  maharashtra: {
    tenant: 'Maharashtra Rent Control Act, 1999',
    notice_period: '30 days',
    tenant_rights: 'Section 23 — Right to essential services',
    escalation: 'District Rent Court',
  },
  karnataka: {
    tenant: 'Karnataka Rent Control Act, 2001',
    notice_period: '15 days',
    tenant_rights: 'Section 21 — Right to necessary repairs',
    escalation: 'Rent Controller',
  },
  delhi: {
    tenant: 'Delhi Rent Control Act, 1958',
    notice_period: '15 days',
    tenant_rights: 'Section 14 — Protection from eviction',
    escalation: 'Rent Control Tribunal',
  },
  california: {
    tenant: 'California Civil Code §1942',
    notice_period: '30 days',
    tenant_rights: 'Implied warranty of habitability',
    escalation: 'Small Claims Court',
  },
  new_york: {
    tenant: 'New York Real Property Law §235-b',
    notice_period: '30 days',
    tenant_rights: 'Warranty of habitability',
    escalation: 'Housing Court',
  },
  england: {
    tenant: 'Landlord and Tenant Act 1985',
    notice_period: '14 days',
    tenant_rights: 'Section 11 — Landlord repair obligations',
    escalation: 'First-tier Tribunal (Property Chamber)',
  },
};
