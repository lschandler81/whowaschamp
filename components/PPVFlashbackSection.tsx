'use client';

import { PPVFlashbackCard } from '@/components/PPVFlashbackCard';
import { mapUfcEvent, mapWweEvent } from '@/lib/mappers/ppv-event';
import { PPVEvent } from '@/lib/types/ppv-card';
import { useState, useEffect } from 'react';

export function PPVFlashbackSection() {
  const [ufcEvent, setUfcEvent] = useState<PPVEvent | null>(null);
  const [wweEvent, setWweEvent] = useState<PPVEvent | null>(null);
  const [ufcLoading, setUfcLoading] = useState(true);
  const [wweLoading, setWweLoading] = useState(true);
  const [ufcError, setUfcError] = useState<string | null>(null);
  const [wweError, setWweError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUFCEvent() {
      try {
        setUfcLoading(true);
        setUfcError(null);
        const response = await fetch('/api/events/ufc-flashback');
        if (!response.ok) {
          throw new Error('Failed to fetch UFC event');
        }
        const data = await response.json();
        console.log('UFC API response:', data);
        setUfcEvent(data.event ? mapUfcEvent(data.event) : null);
      } catch (error) {
        console.error('UFC fetch error:', error);
        setUfcError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setUfcLoading(false);
      }
    }

    async function fetchWWEEvent() {
      try {
        setWweLoading(true);
        setWweError(null);
        const response = await fetch('/api/events/wwe-flashback');
        if (!response.ok) {
          throw new Error('Failed to fetch WWE event');
        }
        const data = await response.json();
        console.log('WWE API response:', data);
        setWweEvent(data.event ? mapWweEvent(data.event) : null);
      } catch (error) {
        console.error('WWE fetch error:', error);
        setWweError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setWweLoading(false);
      }
    }

    fetchUFCEvent();
    fetchWWEEvent();
  }, []);

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-screen-sm sm:max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pay-Per-View Flashback</h2>
          <p className="text-gray-600">Relive the greatest moments in combat sports and wrestling history</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PPVFlashbackCard
            org="UFC"
            heading="This Week in Combat Sports History"
            event={ufcEvent}
            loading={ufcLoading}
            error={ufcError}
          />
          <PPVFlashbackCard
            org="WWE"
            heading="This Week in Wrestling History"
            event={wweEvent}
            loading={wweLoading}
            error={wweError}
          />
        </div>
      </div>
    </section>
  );
}