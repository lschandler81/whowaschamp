export function formatDateGB(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map((x) => Number(x));
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatRangeGB(startIso: string, endIso: string): string {
  return `${formatDateGB(startIso)} – ${formatDateGB(endIso)}`;
}

