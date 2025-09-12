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

function monthDay(dateStr: string): string {
  return dateStr.slice(5, 10);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const dateParam = url.searchParams.get('date');
  const date = (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) ? dateParam : getTodayUTC();

  const filePath = path.join(process.cwd(), 'public', 'data', 'on_this_day_events.min.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const events: TitleChangeEvent[] = JSON.parse(raw);

  const md = monthDay(date);
  const items = events.filter((e) => monthDay(e.date) === md);

  return NextResponse.json({ date, items });
}

