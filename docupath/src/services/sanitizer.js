import DOMPurify from 'dompurify';

/**
 * Sanitize user input to prevent XSS attacks.
 * Strips all HTML tags and dangerous content.
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

/**
 * Sanitize HTML content (allows safe tags).
 */
export function sanitizeHTML(html) {
  if (typeof html !== 'string') return '';
  return DOMPurify.sanitize(html);
}
