export default function DeadlineSidebar({ deadlines }) {
  return (
    <div className="sidebar-card">
      <h4>📅 Deadlines</h4>
      <div id="deadlineList">
        {deadlines.map((d, i) => (
          <div key={i} className="deadline-item">
            <span className="deadline-icon" aria-hidden="true">{d.icon}</span>
            <div>
              <div className="dl-label">{d.label}</div>
              <div className="dl-val">{d.val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
