const STORAGE_KEYS = {
  DOCUMENTS: 'docupath_documents',
  PREFERENCES: 'docupath_preferences',
  WORKFLOW_PROGRESS: 'docupath_workflow_progress',
  DEADLINE_REMINDERS: 'docupath_deadline_reminders',
  AUTH: 'docupath_auth',
};

function safeGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/* ── Documents ── */
export function saveDocuments(docs) {
  return safeSet(STORAGE_KEYS.DOCUMENTS, docs);
}

export function loadDocuments() {
  return safeGet(STORAGE_KEYS.DOCUMENTS, []);
}

/* ── Preferences (theme, language, jurisdiction) ── */
export function savePreferences(prefs) {
  return safeSet(STORAGE_KEYS.PREFERENCES, prefs);
}

export function loadPreferences() {
  return safeGet(STORAGE_KEYS.PREFERENCES, {
    theme: 'light',
    language: 'en',
    jurisdiction: { country: 'india', state: 'maharashtra' },
  });
}

/* ── Workflow Progress ── */
export function saveWorkflowProgress(progress) {
  return safeSet(STORAGE_KEYS.WORKFLOW_PROGRESS, progress);
}

export function loadWorkflowProgress() {
  return safeGet(STORAGE_KEYS.WORKFLOW_PROGRESS, null);
}

export function clearWorkflowProgress() {
  localStorage.removeItem(STORAGE_KEYS.WORKFLOW_PROGRESS);
}

/* ── Deadline Reminders ── */
export function saveDeadlineReminders(reminders) {
  return safeSet(STORAGE_KEYS.DEADLINE_REMINDERS, reminders);
}

export function loadDeadlineReminders() {
  return safeGet(STORAGE_KEYS.DEADLINE_REMINDERS, {});
}

/* ── Auth ── */
export function saveAuth(user) {
  return safeSet(STORAGE_KEYS.AUTH, user);
}

export function loadAuth() {
  return safeGet(STORAGE_KEYS.AUTH, null);
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
}
