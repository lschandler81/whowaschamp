import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { TitleChangeEvent } from '@/lib/types/on-this-day';
import { toSlug } from '@/lib/slug';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export const revalidate = 60 * 60 * 24; // 24 hours

async function getData(): Promise<{ date: string; items: TitleChangeEvent[] }> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'on_this_day_events.min.json');
  const raw = await fs.readFile(filePath, 'utf8');
  const events: TitleChangeEvent[] = JSON.parse(raw);
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const today = `${y}-${m}-${day}`;
  const md = today.slice(5, 10);
  const items = events.filter((e) => e.date.slice(5, 10) === md);
  return { date: today, items };
}

function prettyDate(d: string) {
  const [y, m, day] = d.split('-').map((x) => Number(x));
  return new Date(Date.UTC(y, m - 1, day)).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

export default async function OnThisDayPage() {
  const { date, items } = await getData();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">On This Day in Wrestling</h1>
        <p className="text-gray-600 mb-8">Date: {prettyDate(date)}</p>

        {items.length === 0 && (
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-700">No title changes recorded for this date across years.</p>
          </div>
        )}

        <div className="space-y-4">
          {items.map((e) => {
            const beltHref = `/belts/${e.belt_key}`;
            const newHref = `/wrestlers/${toSlug(e.new_champion)}`;
            const prevHref = e.previous_champion ? `/wrestlers/${toSlug(e.previous_champion)}` : undefined;
            return (
              <div key={e.slug} className="p-6 bg-white rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500">{e.date}</div>
                  <Badge className="bg-blue-100 text-blue-800">{e.promotion}</Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Link href={beltHref} className="text-blue-600 hover:underline font-medium">
                    {e.belt_name}
                  </Link>
                </div>
                <div className="text-gray-800 mb-2">
                  {prevHref ? (
                    <>
                      <Link href={prevHref} className="text-gray-900 font-semibold hover:underline">
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
                  <Link href={newHref} className="text-gray-900 font-semibold hover:underline">
                    {e.new_champion}
                  </Link>
                </div>
                {(e.event || e.location) && (
                  <div className="text-sm text-gray-600 mb-1">
                    {e.event && <span className="font-medium">{e.event}</span>} {e.location && <span>• {e.location}</span>}
                  </div>
                )}
                {e.notes && <div className="text-sm text-gray-600">{e.notes}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
