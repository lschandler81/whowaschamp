import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { TitleChangeEvent } from '@/lib/types/on-this-day';
import { toSlug } from '@/lib/slug';
import { uniqueEvents } from 'lib/events';
import { formatDateGB } from 'lib/date';
import { CalendarClock, ArrowLeft, Home } from 'lucide-react';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const revalidate = 60 * 60 * 24; // 24 hours

async function getData(): Promise<{ date: string; items: TitleChangeEvent[] }> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'on_this_day_events.min.json');
  let events: TitleChangeEvent[] = [];
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    events = JSON.parse(raw);
  } catch {
    events = [];
  }
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const today = `${y}-${m}-${day}`;
  const md = today.slice(5, 10);
  const items = events.filter((e) => e.date.slice(5, 10) === md);
  return { date: today, items };
}

export default async function OnThisDayPage() {
  const { date, items } = await getData();
  const deduped = uniqueEvents(items);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-red-600">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <CalendarClock className="h-6 w-6 text-red-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">This Day in Wrestling</h1>
        </div>
        <p className="text-sm text-gray-600 mb-8">{formatDateGB(date)}</p>

        {deduped.length === 0 && (
          <Card className="border rounded-xl bg-white shadow-sm">
            <CardContent className="p-6">
              <p className="text-gray-700">A quiet day — no title changes on record.</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {deduped.map((e) => {
            const beltHref = `/belts/${e.belt_key}`;
            const newHref = `/wrestlers/${toSlug(e.new_champion)}`;
            const prevHref = e.previous_champion ? `/wrestlers/${toSlug(e.previous_champion)}` : undefined;
            return (
              <Card key={e.slug} className="border rounded-xl bg-white shadow-sm">
                <CardContent className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-semibold text-gray-900">{formatDateGB(e.date)}</div>
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
        <Breadcrumbs
          className="mt-8"
          items={[
            { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
            { label: 'This Day in Wrestling' },
          ]}
        />
      </div>
    </div>
  );
}
