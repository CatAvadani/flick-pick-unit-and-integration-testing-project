export function truncateText(
  text: string | null | undefined,
  limit: number
): string {
  if (!text) return ''; // Handle null or undefined inputs
  const words = text.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
}
