import { useNavigate } from 'react-router-dom';

export default function PartnerPage() {
  const navigate = useNavigate();

  return (
    <div className="page-enter container">
      <div className="content-page-layout">
        <h1>Partnerships</h1>
        <p>Collaborate with DocuPath to simplify legal compliance.</p>
        <h2>Who we partner with</h2>
        <p>We work with universities, startup incubators, and housing societies to bring automated legal aid to their
          members.</p>
        <button className="btn btn-primary" onClick={() => navigate('/contact')} style={{ marginTop: 20 }}>
          Contact Partnerships Team
        </button>
      </div>
    </div>
  );
}
