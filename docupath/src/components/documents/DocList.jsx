import { useNavigate } from 'react-router-dom';
import DocRow from './DocRow';

export default function DocList({ documents = [], onDelete, onUpdate }) {
  const navigate = useNavigate();

  if (documents.length === 0) {
    return (
      <div className="empty-state">
        <div className="es-icon" aria-hidden="true">📄</div>
        <p>No documents found in this view.</p>
        <button
          className="btn btn-primary"
          style={{ marginTop: '16px' }}
          onClick={() => navigate('/start')}
        >
          Create Your First Document
        </button>
      </div>
    );
  }

  return (
    <div className="doc-list" role="list">
      {documents.map((doc) => (
        <DocRow key={doc.id} doc={doc} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
