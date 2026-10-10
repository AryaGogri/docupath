/**
 * Validate email format.
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate required string (non-empty after trim).
 */
export function isNotEmpty(str) {
  return typeof str === 'string' && str.trim().length > 0;
}

/**
 * Validate date string (YYYY-MM-DD).
 */
export function isValidDate(str) {
  return /^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(new Date(str).getTime());
}
