/**
 * Capitalize first letter.
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Replace underscores with spaces and capitalize.
 */
export function formatStateLabel(str) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(str, max = 100) {
  if (!str || str.length <= max) return str;
  return str.slice(0, max).trim() + '…';
}
