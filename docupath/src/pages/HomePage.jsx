import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HomePage() {
  useScrollReveal();

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="hero">
        <div className="hero-blob hero-blob--1" aria-hidden="true" />
        <div className="hero-blob hero-blob--2" aria-hidden="true" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse" aria-hidden="true" />
              No lawyers needed · Plain English
            </div>
            <h1>
              Paperwork is confusing.
              <br />
              <em>We made it simple.</em>
            </h1>
            <p className="hero-sub">
              Answer a few questions. Get the exact legal document you need — correctly filled,
              deadline-aware, and ready to submit.
            </p>
            <div className="hero-actions">
              <Link to="/start" className="btn btn-primary">
                Get Started Free →
              </Link>
              <Link to="/problems" className="btn btn-ghost">
                See What We Solve
              </Link>
            </div>
            <div className="hero-trust">
              {[
                'Free basic documents',
                'PDF & DOCX export',
                '5 min avg. completion',
                'No account required',
              ].map((text, i) => (
                <div key={i} className="trust-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="#16a050" strokeWidth="1.5" />
                    <path
                      d="M5 8.5L7 10.5L11 6"
                      stroke="#16a050"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{' '}
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-strip">
        <div className="container">
          <div className="situations-header" style={{ marginBottom: 44 }}>
            <div className="section-label">How It Works</div>
            <h2>Four steps to your document</h2>
          </div>
          <div className="how-steps">
            {[
              { num: '01', title: 'Pick Your Situation', desc: 'Choose from common scenarios — tenant issues, grants, legal notices, and more.' },
              { num: '02', title: 'Answer Quick Questions', desc: 'Simple clicks. No essays. Each answer shapes your exact outcome.' },
              { num: '03', title: 'Document Generated', desc: 'Correctly worded, auto-filled with your details, jurisdiction-aware.' },
              { num: '04', title: 'Submit With Confidence', desc: 'Know exactly what to do next — deadlines, submission methods, escalation paths.' },
            ].map((step, idx) => (
              <div key={idx} className="how-step reveal visible">
                <div className="step-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="section-pad">
        <div className="container">
          <div className="situations-header reveal visible">
            <div className="section-label">The Difference</div>
            <h2>Not another form site</h2>
          </div>
          <div className="compare-wrap reveal visible">
            <div className="compare-grid">
              <div className="compare-col">
                <div className="compare-head">Ordinary Site</div>
                <div className="compare-cell"><span className="cross" aria-hidden="true">✕</span> Static, generic forms</div>
                <div className="compare-cell"><span className="cross" aria-hidden="true">✕</span> Dense legal language</div>
                <div className="compare-cell"><span className="cross" aria-hidden="true">✕</span> One-size-fits-all</div>
                <div className="compare-cell"><span className="cross" aria-hidden="true">✕</span> No submission guidance</div>
                <div className="compare-cell"><span className="cross" aria-hidden="true">✕</span> Fear-based experience</div>
              </div>
              <div className="compare-col highlight highlight-col">
                <div className="compare-head highlight">
                  <span className="ch-label">DocuPath</span>
                  <br />
                  Your experience
                </div>
                <div className="compare-cell highlight"><span className="tick" aria-hidden="true">✓</span> Smart decision-based flow</div>
                <div className="compare-cell highlight"><span className="tick" aria-hidden="true">✓</span> Plain, clear English</div>
                <div className="compare-cell highlight"><span className="tick" aria-hidden="true">✓</span> Personalized outcome</div>
                <div className="compare-cell highlight"><span className="tick" aria-hidden="true">✓</span> Step-by-step confidence</div>
                <div className="compare-cell highlight"><span className="tick" aria-hidden="true">✓</span> Empowering & calm</div>
              </div>
              <div className="compare-col">
                <div className="compare-head">What You Get</div>
                <div className="compare-cell">Fill it yourself</div>
                <div className="compare-cell">Figure it out</div>
                <div className="compare-cell">Hope for the best</div>
                <div className="compare-cell">Google it</div>
                <div className="compare-cell">Anxious</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section-pad" style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', transition: 'background .4s' }}>
        <div className="container">
          <div className="situations-header reveal visible">
            <div className="section-label">Pricing</div>
            <h2>Honest, simple pricing</h2>
            <p>Start free. Upgrade only when you need it.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card reveal visible">
              <h3>Free</h3>
              <div className="price">₹0</div>
              <div className="price-note">Forever free tier</div>
              <ul aria-label="Free plan features">
                <li><span className="tick" aria-hidden="true">✓</span> 2 basic documents / month</li>
                <li><span className="tick" aria-hidden="true">✓</span> Guided questionnaire</li>
                <li><span className="tick" aria-hidden="true">✓</span> PDF download</li>
                <li><span className="tick" aria-hidden="true">✓</span> Deadline guidance</li>
              </ul>
              <Link to="/start" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Get Started
              </Link>
            </div>
            <div className="pricing-card featured reveal visible">
              <h3>Pro</h3>
              <div className="price">
                ₹299 <span>/ month</span>
              </div>
              <div className="price-note">Most popular · Cancel anytime</div>
              <ul aria-label="Pro plan features">
                <li><span className="tick" aria-hidden="true">✓</span> Unlimited documents</li>
                <li><span className="tick" aria-hidden="true">✓</span> PDF + DOCX export</li>
                <li><span className="tick" aria-hidden="true">✓</span> Deadline reminders (email)</li>
                <li><span className="tick" aria-hidden="true">✓</span> Save & resume later</li>
                <li><span className="tick" aria-hidden="true">✓</span> "What if I don't act?" guides</li>
                <li><span className="tick" aria-hidden="true">✓</span> Multi-language (Hindi + EN)</li>
                <li><span className="tick" aria-hidden="true">✓</span> AI plain-English explanations</li>
              </ul>
              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => alert('✨ Pro plan — coming soon!')}
              >
                Choose Pro
              </button>
            </div>
            <div className="pricing-card reveal visible">
              <h3>Team / NGO</h3>
              <div className="price">Custom</div>
              <div className="price-note">For organisations</div>
              <ul aria-label="Team/NGO plan features">
                <li><span className="tick" aria-hidden="true">✓</span> Everything in Pro</li>
                <li><span className="tick" aria-hidden="true">✓</span> Lawyer-reviewed templates</li>
                <li><span className="tick" aria-hidden="true">✓</span> Bulk document generation</li>
                <li><span className="tick" aria-hidden="true">✓</span> Govt portal auto-submission</li>
                <li><span className="tick" aria-hidden="true">✓</span> White-label option</li>
              </ul>
              <button
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => alert('📧 Contact us — feature coming soon')}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section-pad" style={{ background: 'var(--cream-dark)', textAlign: 'center' }}>
        <div className="container">
          <div className="hero-content">
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '2.5rem', marginBottom: '16px' }}>
              Ready to resolve your paperwork?
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1.1rem', marginBottom: '32px' }}>
              Select a situation, answer simple questions, and get your custom legal document in under 5 minutes.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/start" className="btn btn-primary btn-lg">
                Create Document Now →
              </Link>
              <Link to="/help" className="btn btn-ghost">
                Frequently Asked Questions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
