export default function TermsPage() {
  return (
    <div className="page-enter container" style={{ padding: '60px 20px', maxWidth: '800px', lineHeight: 1.7 }}>
      <h1>Terms of Service & Disclaimer</h1>
      <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Last updated: January 2026</p>

      <section style={{ marginTop: '24px' }}>
        <h2>1. Disclaimer — Not Legal Advice</h2>
        <p>
          DocuPath provides automated self-help legal document templates and guidance based on user input. DocuPath is not a law firm and does not provide legal advice, representation, or legal opinions. Using DocuPath does not create an attorney-client relationship.
        </p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>2. Use of Templates</h2>
        <p>
          All generated documents are provided for informational and self-representation purposes only. Users are encouraged to verify jurisdiction-specific requirements or consult a qualified attorney for complex legal disputes.
        </p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>3. Data & Privacy</h2>
        <p>
          DocuPath processes user inputs locally within your web browser. Saved documents are stored in local storage on your device unless explicit cloud synchronization features are authorized.
        </p>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>4. Limitation of Liability</h2>
        <p>
          In no event shall DocuPath or its operators be liable for any direct, indirect, incidental, or consequential damages arising from the use of or inability to use documents generated through this service.
        </p>
      </section>
    </div>
  );
}
