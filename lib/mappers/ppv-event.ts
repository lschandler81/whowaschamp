import { PPVEvent } from '@/lib/types/ppv-card';

export function mapUfcEvent(rawUfc: any): PPVEvent {
  return {
    org: 'UFC',
    title: rawUfc.name || '',
    date: rawUfc.date || '',
    venue: rawUfc.venue || null,
    city: rawUfc.city || null,
    country: rawUfc.country || null,
    attendance: rawUfc.attendance || null,
    buyrate: rawUfc.buyrate || null,
    mainEvent: rawUfc.headliners?.length > 0 ? rawUfc.headliners.join(' vs ') : null,
    slug: rawUfc.id || ''
  };
}

export function mapWweEvent(rawWwe: any): PPVEvent {
  return {
    org: 'WWE',
    title: rawWwe.name || '',
    date: rawWwe.date || '',
    venue: rawWwe.venue || null,
    city: rawWwe.city || null,
    country: rawWwe.country || null,
    attendance: rawWwe.attendance || null,
    buyrate: rawWwe.buyrate || null,
    mainEvent: rawWwe.headliners?.length > 0 ? rawWwe.headliners.join(' vs ') : null,
    slug: rawWwe.id || ''
  };
}