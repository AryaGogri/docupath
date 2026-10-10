import { useState, useEffect } from 'react';
import { loadDocuments, saveDocuments } from '../services/storage';
import DeadlineCard from '../components/deadlines/DeadlineCard';
import { useToast } from '../context/ToastContext';

export default function DeadlinesPage() {
  const showToast = useToast();
  const [deadlines, setDeadlines] = useState([]);

  const loadAllDeadlines = () => {
    const savedDocs = loadDocuments();
    const list = [];

    // Extract deadlines from saved documents
    savedDocs.forEach((doc) => {
      if (doc.deadlines) {
        doc.deadlines.forEach((dl) => {
          list.push({
            id: `${doc.id}-${dl.label}`,
            docTitle: doc.title,
            label: dl.label,
            due: dl.due,
            docId: doc.id,
          });
        });
      }
    });

    // Seed some initial demo deadlines if empty
    if (list.length === 0) {
      const demoList = [
        { id: '3-respond', docTitle: 'Legal Notice — Payment', label: 'Respond to demand notice', due: 'Feb 14, 2026', docId: 3 },
        { id: '2-portal', docTitle: 'Artist Grant Cover Letter', label: 'Grant application portal deadline', due: 'Feb 15, 2026', docId: 2 },
        { id: '1-landlord', docTitle: 'Tenant Repair Request Letter', label: 'Landlord must respond by', due: 'Feb 11, 2026', docId: 1 },
      ];
      setDeadlines(demoList);
    } else {
      setDeadlines(list);
    }
  };

  useEffect(() => {
    loadAllDeadlines();
  }, []);

  const handleAddPersonalTask = () => {
    const title = prompt('Enter task name:');
    if (!title) return;

    const date = prompt('Enter due date (YYYY-MM-DD):');
    if (!date) return;

    const savedDocs = loadDocuments();
    const personalTaskDoc = {
      id: Date.now(),
      title: 'Personal Task',
      type: 'task',
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'pending',
      deadlines: [
        {
          label: title,
          due: new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        },
      ],
    };

    saveDocuments([personalTaskDoc, ...savedDocs]);
    loadAllDeadlines();
    showToast('✅ Task added successfully!');
  };

  return (
    <div className="page-enter container">
      <div className="deadlines-layout">
        <h1>Deadlines & Reminders</h1>
        <p>Track every deadline — set reminders so nothing slips through.</p>

        <button
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
          onClick={handleAddPersonalTask}
          aria-label="Add a personal deadline task"
        >
          + Add Personal Task
        </button>

        {deadlines.length === 0 ? (
          <div className="empty-state">
            <div className="es-icon" aria-hidden="true">📅</div>
            <p>
              No deadlines yet.
              <br />
              Generate a document to see its deadlines here.
            </p>
          </div>
        ) : (
          <div role="list" aria-label="Deadlines list">
            {deadlines.map((item, idx) => (
              <DeadlineCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
