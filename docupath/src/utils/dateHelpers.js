/**
 * Add N days to a date and return formatted string.
 */
export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Format a date object to a locale string.
 */
export function formatDate(date, locale = 'en-IN') {
  return new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Get today's date in YYYY-MM-DD format.
 */
export function todayISO() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Check if a date is in the past (overdue).
 */
export function isOverdue(dateStr) {
  return new Date(dateStr) < new Date();
}

/**
 * Get days remaining until a date.
 */
export function daysRemaining(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Generate iCal (.ics) content for calendar export.
 */
export function generateICS(title, description, dueDate) {
  const dt = new Date(dueDate);
  const pad = (n) => String(n).padStart(2, '0');
  const dtStr = `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DocuPath//EN',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${dtStr}`,
    `DTEND;VALUE=DATE:${dtStr}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Download an ICS file.
 */
export function downloadICS(title, description, dueDate) {
  const ics = generateICS(title, description, dueDate);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Generate Google Calendar URL.
 */
export function googleCalendarUrl(title, description, dueDate) {
  const dt = new Date(dueDate);
  const pad = (n) => String(n).padStart(2, '0');
  const dtStr = `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dtStr}/${dtStr}&details=${encodeURIComponent(description)}`;
}
