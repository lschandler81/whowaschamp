import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { TitleChangeEvent } from '@/lib/types/on-this-day';
import { toSlug } from '@/lib/slug';

export const revalidate = 60 * 60 * 24 * 7; // 7 days

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/on-this-week`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch on-this-week');
  return res.json() as Promise<{ weekStart: string; weekEnd: string; itemsByDate: Record<string, TitleChangeEvent[]> }>;
}

function prettyDate(d: string) {
  const [y, m, day] = d.split('-').map((x) => Number(x));
  return new Date(Date.UTC(y, m - 1, day)).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

export default async function OnThisWeekPage() {
  const { weekStart, weekEnd, itemsByDate } = await getData();
  const days = Object.keys(itemsByDate).sort();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">This Week in Wrestling</h1>
        <p className="text-gray-600 mb-8">Week Range: {prettyDate(weekStart)} – {prettyDate(weekEnd)}</p>

        {days.length === 0 && (
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-700">No title changes recorded for this ISO week across years.</p>
          </div>
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
          ))}
        </div>
      </div>
    </div>
  );
}

