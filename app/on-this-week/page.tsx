import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { TitleChangeEvent } from '@/lib/types/on-this-day';
import { toSlug } from '@/lib/slug';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { CalendarRange, ArrowLeft, Home } from 'lucide-react';

export const revalidate = 60 * 60 * 24 * 7; // 7 days

function toDateUTC(str: string): Date {
  const [y, m, d] = str.split('-').map((x) => Number(x));
  return new Date(Date.UTC(y, m - 1, d));
}

function getISOWeek(date: Date): { week: number; year: number; weekStart: Date; weekEnd: Date } {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = (d.getUTCDay() + 6) % 7; // Monday=0
  d.setUTCDate(d.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const diff = d.getTime() - firstThursday.getTime();
  const week = 1 + Math.round(diff / (7 * 24 * 3600 * 1000));
  const weekStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - dayNum));
  const weekEnd = new Date(Date.UTC(weekStart.getUTCFullYear(), weekStart.getUTCMonth(), weekStart.getUTCDate() + 6));
  return { week, year: d.getUTCFullYear(), weekStart, weekEnd };
}

function fmt(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

async function getData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'on_this_day_events.min.json');
  let events: TitleChangeEvent[] = [];
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    events = JSON.parse(raw);
  } catch {
    events = [];
  }
  const now = new Date();
  const { week, year, weekStart, weekEnd } = getISOWeek(now);

  const itemsByDate: Record<string, TitleChangeEvent[]> = {};
  for (const e of events) {
    const d = toDateUTC(e.date);
    const { week: ew, year: ey } = getISOWeek(d);
    if (ew === week && ey === year) {
      if (!itemsByDate[e.date]) itemsByDate[e.date] = [];
      itemsByDate[e.date].push(e);
    }
  }
  return { weekStart: fmt(weekStart), weekEnd: fmt(weekEnd), itemsByDate };
}

function prettyDate(d: string) {
  const [y, m, day] = d.split('-').map((x) => Number(x));
  return new Date(Date.UTC(y, m - 1, day)).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

export default async function OnThisWeekPage() {
  const { weekStart, weekEnd, itemsByDate } = await getData();
  const days = Object.keys(itemsByDate).sort();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-red-600">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <CalendarRange className="h-6 w-6 text-red-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">On This Week in Wrestling</h1>
        </div>
        <p className="text-sm text-gray-600 mb-8">{prettyDate(weekStart)} – {prettyDate(weekEnd)}</p>

        {days.length === 0 && (
          <Card className="border rounded-xl bg-white shadow-sm">
            <CardContent className="p-6">
              <p className="text-gray-700">No title changes recorded for this ISO week across years.</p>
              <div className="mt-3 flex items-center gap-4">
                <Link href="/on-this-day" className="text-gray-900 hover:text-red-600 text-sm font-medium">On This Day</Link>
                <Link href="/" className="text-gray-900 hover:text-red-600 text-sm font-medium">Home</Link>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-8">
          {days.map((date) => (
            <div key={date}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{prettyDate(date)} ({date})</h2>
              <div className="space-y-4">
                {itemsByDate[date].map((e) => {
                  const beltHref = `/belts/${e.belt_key}`;
                  const newHref = `/wrestlers/${toSlug(e.new_champion)}`;
                  const prevHref = e.previous_champion ? `/wrestlers/${toSlug(e.previous_champion)}` : undefined;
                  return (
                    <Card key={e.slug} className="border rounded-xl bg-white shadow-sm">
                      <CardContent className="p-6 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-base font-semibold text-gray-900">{e.date}</div>
                          <Badge className="bg-blue-100 text-blue-800">{e.promotion}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={beltHref} className="text-gray-900 hover:text-red-600 font-medium">
                            {e.belt_name}
                          </Link>
                        </div>
                        <div className="text-gray-800">
                          {prevHref ? (
                            <>
                              <Link href={prevHref} className="text-gray-900 font-semibold hover:text-red-600">
                                {e.previous_champion}
                              </Link>
                              <span className="mx-2">→</span>
                            </>
                          ) : (
                            <>
                              <span className="font-semibold">New Champion:</span>
                              <span className="mx-2" />
                            </>
                          )}
                          <Link href={newHref} className="text-gray-900 font-semibold hover:text-red-600">
                            {e.new_champion}
                          </Link>
                        </div>
                        {(e.event || e.location) && (
                          <div className="text-sm text-gray-600">
                            {e.event && <span className="font-medium">{e.event}</span>} {e.location && <span>• {e.location}</span>}
                          </div>
                        )}
                        {e.notes && <div className="text-sm text-gray-600">{e.notes}</div>}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-700 hover:text-red-600 inline-flex items-center gap-1">
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link href="/on-this-day" className="text-sm text-gray-700 hover:text-red-600">On This Day</Link>
        </div>
      </div>
    </div>
  );
}
