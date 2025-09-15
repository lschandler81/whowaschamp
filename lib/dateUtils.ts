// Date formatting utility
export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', { 
    day: 'numeric',
    month: 'short', 
    year: 'numeric' 
  });
}
