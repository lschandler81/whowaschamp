import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { CalendarRange, ArrowLeft, Home } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getCurrentIsoWeekRange, getEventsForIsoWeek } from '@/lib/events';
import { formatDateGB, formatRangeGB } from '@/lib/date';

export const revalidate = 60 * 60 * 24 * 7;

export default async function UFCThisWeekPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const delta = Number(searchParams?.delta ?? 0) || 0;
  const now = new Date();
  const target = new Date(now);
  target.setUTCDate(now.getUTCDate() + delta * 7);
  const { start, end, isoWeek, isoYear } = getCurrentIsoWeekRange(target);

  const events = await getEventsForIsoWeek('ufc', isoYear, isoWeek);

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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">UFC — This Week’s Events</h1>
        </div>
        <p className="text-sm text-gray-600 mb-8">{formatRangeGB(start.toISOString().slice(0,10), end.toISOString().slice(0,10))}</p>

        <div className="mb-6 flex items-center gap-4 text-sm">
          <Link href={`/ufc/this-week?delta=${delta - 1}`} className="text-gray-700 hover:text-red-600">Last week</Link>
          <Link href={`/ufc/this-week?delta=0`} className="text-gray-700 hover:text-red-600">This week</Link>
          <Link href={`/ufc/this-week?delta=${delta + 1}`} className="text-gray-700 hover:text-red-600">Next week</Link>
        </div>

        {events.length === 0 && (
          <Card className="border rounded-xl bg-white shadow-sm">
            <CardContent className="p-6">
              <p className="text-gray-700">A quiet week — no major events on record.</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {events.map((ev, idx) => (
            <Card key={idx} className="border rounded-xl bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg font-semibold">{ev.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{formatDateGB(ev.date)}</p>
                {ev.venue || ev.city ? (
                  <p className="text-sm text-gray-600">{[ev.venue, ev.city].filter(Boolean).join(', ')}</p>
                ) : null}
                {ev.main_event && (
                  <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Main event:</span> {ev.main_event}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Breadcrumbs
          className="mt-8"
          items={[
            { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
            { label: 'UFC — This Week’s Events' },
          ]}
        />
      </div>
    </div>
  );
}

