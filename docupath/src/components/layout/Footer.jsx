import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">DocuPath</div>
            <p>Navigate paperwork. Own your rights.<br />Built to make legal & government processes accessible to everyone.</p>
          </div>
          <div>
            <h5>Product</h5>
            <Link to="/">Home</Link><br />
            <Link to="/problems">Problems We Solve</Link><br />
            <Link to="/start">Start Now</Link><br />
            <Link to="/documents">My Documents</Link>
          </div>
          <div>
            <h5>Support</h5>
            <Link to="/help">Help Center</Link><br />
            <Link to="/contact">Contact Us</Link><br />
            <Link to="/terms">Terms of Service</Link><br />
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <div>
            <h5>For Organisations</h5>
            <Link to="/ngo">NGO Program</Link><br />
            <Link to="/partners">Partnerships</Link><br />
            <Link to="/legal-aid">Legal Aid Orgs</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DocuPath. All rights reserved.</span>
          <span>Made with care for people, not paperwork.</span>
        </div>
      </div>
    </footer>
  );
}
