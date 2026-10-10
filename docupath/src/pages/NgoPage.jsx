import { useNavigate } from 'react-router-dom';

export default function NgoPage() {
  const navigate = useNavigate();

  return (
    <div className="page-enter container">
      <div className="content-page-layout">
        <h1>NGO Program</h1>
        <p>Empowering organizations to serve their communities better.</p>
        <h2>For Non-Profits</h2>
        <p>DocuPath provides free and discounted access to legal automation tools for registered NGOs. Help your
          beneficiaries generate rent agreements, affidavits, and government applications instantly.</p>
        <ul>
          <li>Bulk document generation</li>
          <li>Custom workflows for your community</li>
          <li>Dedicated support channel</li>
        </ul>
        <button className="btn btn-primary" onClick={() => navigate('/contact')} style={{ marginTop: 20 }}>
          Apply for NGO Partner Status
        </button>
      </div>
    </div>
  );
}
