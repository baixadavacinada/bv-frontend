/**
 * Convert a string to a URL-friendly slug format
 * Example: "UBS Guandu" -> "ubs-guandu"
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with dashes
    .replace(/[^\w-]/g, '')         // Remove special characters
    .replace(/-+/g, '-')            // Replace multiple dashes with single dash
    .replace(/^-+|-+$/g, '')        // Remove leading/trailing dashes
}

/**
 * Convert a slug back to readable text
 * Example: "ubs-guandu" -> "UBS Guandu"
 */
export function fromSlug(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
