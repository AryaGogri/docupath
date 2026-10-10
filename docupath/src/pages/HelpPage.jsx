import { useState } from 'react';
import { faqs } from '../data/faqs';

export default function HelpPage() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const q = search.toLowerCase();
    return faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q);
  });

  return (
    <div className="page-enter container">
      <div className="help-layout">
        <h1>Help & Learn</h1>
        <p>Everything you need to know about using DocuPath.</p>

        <div className="help-search-wrap">
          <span className="help-search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            className="help-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions…"
            aria-label="Search frequently asked questions"
          />
        </div>

        <div id="faqList" aria-label="Frequently Asked Questions list">
          {filteredFaqs.length === 0 ? (
            <div className="empty-state">
              <p>No results found for "{search}".</p>
            </div>
          ) : (
            filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-q"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    aria-label={`Toggle answer for: ${faq.q}`}
                  >
                    {faq.q} <span className="faq-chevron" aria-hidden="true">▾</span>
                  </button>
                  <div
                    className="faq-a"
                    style={{
                      maxHeight: isOpen ? '240px' : '0',
                      paddingBottom: isOpen ? '20px' : '0',
                    }}
                    role="region"
                    aria-hidden={!isOpen}
                  >
                    {faq.a}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
