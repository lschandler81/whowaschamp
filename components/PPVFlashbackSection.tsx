'use client';

import { PPVFlashbackCard } from '@/components/PPVFlashbackCard';
import { mapUfcEvent, mapWweEvent } from '@/lib/mappers/ppv-event';
import { PPVEvent } from '@/lib/types/ppv-card';
import { useState, useEffect } from 'react';

export function PPVFlashbackSection() {
  const [ufcEvent, setUfcEvent] = useState<PPVEvent | null>(null);
  const [wweEvent, setWweEvent] = useState<PPVEvent | null>(null);
  const [ufcContext, setUfcContext] = useState<any>(null);
  const [wweContext, setWweContext] = useState<any>(null);
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
          console.log('UFC API not available, using fallback');
          // Fallback data when API is not available
          const fallbackEvent = {
            org: 'UFC' as const,
            title: 'UFC 266: Volkanovski vs. Ortega',
            date: '2021-09-25',
            venue: 'T-Mobile Arena, Las Vegas, Nevada',
            attendance: 19029,
            buyrate: null,
            mainEvent: 'Alexander Volkanovski vs. Brian Ortega',
            slug: 'ufc-266-volkanovski-ortega'
          };
          
          const fallbackContext = {
            totalMatchingEvents: 11,
            yearsAgo: 3,
            alternativeEvents: [
              {
                name: 'UFC 165: Jones vs. Gustafsson',
                promotion: { name: 'Ultimate Fighting Championship' },
                date: '2013-09-21',
                attendance: 15525
              },
              {
                name: 'UFC 152: Jones vs. Belfort', 
                promotion: { name: 'Ultimate Fighting Championship' },
                date: '2012-09-22',
                attendance: 15725
              },
              {
                name: 'UFC 135: Jones vs. Rampage',
                promotion: { name: 'Ultimate Fighting Championship' },
                date: '2011-09-24',
                attendance: 14816
              }
            ]
          };
          
          setUfcEvent(fallbackEvent);
          setUfcContext(fallbackContext);
          return;
        }
        const data = await response.json();
        console.log('UFC API response:', data);
        setUfcEvent(data.event ? mapUfcEvent(data.event) : null);
        setUfcContext(data.context || null);
      } catch (error) {
        console.error('UFC fetch error:', error);
        setUfcError(error instanceof Error ? error.message : 'Unknown error');
        // Use fallback data on error too
        const fallbackEvent = {
          org: 'UFC' as const,
          title: 'UFC 266: Volkanovski vs. Ortega',
          date: '2021-09-25',
          venue: 'T-Mobile Arena, Las Vegas, Nevada',
          attendance: 19029,
          buyrate: null,
          mainEvent: 'Alexander Volkanovski vs. Brian Ortega',
          slug: 'ufc-266-volkanovski-ortega'
        };
        
        const fallbackContext = {
          totalMatchingEvents: 11,
          yearsAgo: 3,
          alternativeEvents: [
            {
              name: 'UFC 165: Jones vs. Gustafsson',
              promotion: { name: 'Ultimate Fighting Championship' },
              date: '2013-09-21',
              attendance: 15525
            },
            {
              name: 'UFC 152: Jones vs. Belfort', 
              promotion: { name: 'Ultimate Fighting Championship' },
              date: '2012-09-22',
              attendance: 15725
            },
            {
              name: 'UFC 135: Jones vs. Rampage',
              promotion: { name: 'Ultimate Fighting Championship' },
              date: '2011-09-24',
              attendance: 14816
            }
          ]
        };
        
        setUfcEvent(fallbackEvent);
        setUfcContext(fallbackContext);
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
          console.log('WWE API not available, using fallback');
          // Fallback data when API is not available
          const fallbackEvent = {
            org: 'WWE' as const,
            title: 'Unforgiven 2002',
            date: '2002-09-22',
            venue: 'Staples Center, Los Angeles, California',
            attendance: 14000,
            buyrate: 375,
            mainEvent: 'The Undertaker vs. Brock Lesnar',
            slug: 'unforgiven-2002'
          };
          
          const fallbackContext = {
            totalMatchingEvents: 8,
            yearsAgo: 22,
            alternativeEvents: [
              {
                name: 'In Your House: Ground Zero',
                promotion: { name: 'World Wrestling Federation' },
                date: '1997-09-07',
                attendance: 6635
              },
              {
                name: 'In Your House: Final Four',
                promotion: { name: 'World Wrestling Federation' },
                date: '1997-02-16',
                attendance: 8110
              },
              {
                name: 'Clash of the Champions XXXII',
                promotion: { name: 'World Championship Wrestling' },
                date: '1996-01-23',
                attendance: 5412
              }
            ]
          };
          
          setWweEvent(fallbackEvent);
          setWweContext(fallbackContext);
          return;
        }
        const data = await response.json();
        console.log('WWE API response:', data);
        setWweEvent(data.event ? mapWweEvent(data.event) : null);
        setWweContext(data.context || null);
      } catch (error) {
        console.error('WWE fetch error:', error);
        setWweError(error instanceof Error ? error.message : 'Unknown error');
        // Use fallback data on error too
        const fallbackEvent = {
          org: 'WWE' as const,
          title: 'Unforgiven 2002',
          date: '2002-09-22',
          venue: 'Staples Center, Los Angeles, California',
          attendance: 14000,
          buyrate: 375,
          mainEvent: 'The Undertaker vs. Brock Lesnar',
          slug: 'unforgiven-2002'
        };
        
        const fallbackContext = {
          totalMatchingEvents: 8,
          yearsAgo: 22,
          alternativeEvents: [
            {
              name: 'In Your House: Ground Zero',
              promotion: { name: 'World Wrestling Federation' },
              date: '1997-09-07',
              attendance: 6635
            },
            {
              name: 'In Your House: Final Four',
              promotion: { name: 'World Wrestling Federation' },
              date: '1997-02-16',
              attendance: 8110
            },
            {
              name: 'Clash of the Champions XXXII',
              promotion: { name: 'World Championship Wrestling' },
              date: '1996-01-23',
              attendance: 5412
            }
          ]
        };
        
        setWweEvent(fallbackEvent);
        setWweContext(fallbackContext);
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
            context={ufcContext}
            loading={ufcLoading}
            error={ufcError}
          />
          <PPVFlashbackCard
            org="WWE"
            heading="This Week in Wrestling History"
            event={wweEvent}
            context={wweContext}
            loading={wweLoading}
            error={wweError}
          />
        </div>
      </div>
    </section>
  );
}