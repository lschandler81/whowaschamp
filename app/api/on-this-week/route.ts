import { NextRequest, NextResponse } from 'next/server';
import { TitleChangeEvent } from '@/lib/types/on-this-day';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export const revalidate = 60 * 60; // 1 hour

function getTodayUTC(): string {
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// ISO week helpers
function toDateUTC(str: string): Date {
  const [y, m, d] = str.split('-').map((x) => Number(x));
  return new Date(Date.UTC(y, m - 1, d));
}

function getISOWeek(date: Date): { week: number; year: number; weekStart: Date; weekEnd: Date } {
  // Copy date, set to Thursday in current week
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = (d.getUTCDay() + 6) % 7; // Monday=0
  d.setUTCDate(d.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const diff = d.getTime() - firstThursday.getTime();
  const week = 1 + Math.round(diff / (7 * 24 * 3600 * 1000));
  // Week start (Monday) and end (Sunday)
  const weekStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - dayNum));
  const weekEnd = new Date(Date.UTC(weekStart.getUTCFullYear(), weekStart.getUTCMonth(), weekStart.getUTCDate() + 6));
  return { week, year: d.getUTCFullYear(), weekStart, weekEnd };
}

function isoWeekKey(y: number, w: number) {
  return `${y}-W${String(w).padStart(2, '0')}`;
}

function getEventISOWeekKey(dateStr: string): string {
  const d = toDateUTC(dateStr);
  const { week, year } = getISOWeek(d);
  return isoWeekKey(year, week);
}

function fmt(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const dateParam = url.searchParams.get('date');
  const dateStr = (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) ? dateParam : getTodayUTC();
  const baseDate = toDateUTC(dateStr);
  const { week, year, weekStart, weekEnd } = getISOWeek(baseDate);
  const targetKey = isoWeekKey(year, week);

  const filePath = path.join(process.cwd(), 'public', 'data', 'on_this_day_events.min.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const events: TitleChangeEvent[] = JSON.parse(raw);

  const itemsByDate: Record<string, TitleChangeEvent[]> = {};
  for (const e of events) {
    if (getEventISOWeekKey(e.date) === targetKey) {
      if (!itemsByDate[e.date]) itemsByDate[e.date] = [];
      itemsByDate[e.date].push(e);
    }
  }

  return NextResponse.json({ weekStart: fmt(weekStart), weekEnd: fmt(weekEnd), itemsByDate });
}

