export function truncateText(text: string, wordLimit: number): string {
  if (text.split(' ').length > wordLimit) {
    return text.split(' ').slice(0, wordLimit).join(' ') + '...';
  }
  return text;
}
