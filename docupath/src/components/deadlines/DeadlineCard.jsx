import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { isOverdue, daysRemaining, downloadICS, googleCalendarUrl } from '../../utils/dateHelpers';

export default function DeadlineCard({ item, index }) {
  const showToast = useToast();
  const [reminderOn, setReminderOn] = useState(index % 2 === 0);

  const dueDate = new Date(item.due);
  const day = dueDate.getDate();
  const mon = dueDate.toLocaleDateString('en-IN', { month: 'short' });
  const overdue = isOverdue(item.due);

  const toggleReminder = () => {
    setReminderOn(!reminderOn);
    showToast(reminderOn ? '🔔 Reminder turned off' : '🔔 Reminder turned on!');
  };

  const handleExportICS = () => {
    downloadICS(item.label, `Deadline for: ${item.docTitle}`, item.due);
    showToast('📅 iCal file downloaded successfully!');
  };

  const handleGoogleSync = () => {
    const url = googleCalendarUrl(item.label, `Deadline for: ${item.docTitle}`, item.due);
    window.open(url, '_blank');
    showToast('📅 Opening Google Calendar…');
  };

  return (
    <div className="deadline-card" role="listitem">
      <div className={`dl-card-date ${overdue ? 'overdue' : ''}`}>
        <div className="dl-day">{isNaN(day) ? '📅' : day}</div>
        <div className="dl-mon">{isNaN(day) ? 'Due' : mon}</div>
      </div>
      <div className="dl-card-info">
        <div className="dl-card-title">{item.label}</div>
        <div className="dl-card-desc">From: {item.docTitle}</div>
        {!overdue && !isNaN(day) && (
          <div style={{ fontSize: '.8rem', color: 'var(--success)', marginTop: 2 }}>
            {daysRemaining(item.due)} days remaining
          </div>
        )}
        <div className="dl-card-actions">
          <button className="btn-sm primary" onClick={handleGoogleSync} aria-label="Sync with Google Calendar">
            Google Sync
          </button>
          <button className="btn-sm" onClick={handleExportICS} aria-label="Export deadline as iCal">
            Export iCal
          </button>
        </div>
      </div>
      <div className="dl-card-right">
        <button
          className="reminder-toggle"
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          onClick={toggleReminder}
          aria-pressed={reminderOn}
          aria-label={`Toggle reminder for ${item.label}`}
        >
          <div className={`toggle-switch ${reminderOn ? 'on' : ''}`} aria-hidden="true" />
          <span>Remind</span>
        </button>
      </div>
    </div>
  );
}
