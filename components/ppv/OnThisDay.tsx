'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, MapPin, Users, TrendingUp, Trophy, Info } from 'lucide-react';
import { OnThisDayEvent } from '@/lib/types/ppv';
import { useState, useEffect } from 'react';

interface OnThisDayProps {
  month?: number;
  day?: number;
}

export function OnThisDay({ month, day }: OnThisDayProps) {
  const [events, setEvents] = useState<OnThisDayEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default to today if no date provided
  const today = new Date();
  const targetMonth = month ?? today.getMonth() + 1;
  const targetDay = day ?? today.getDate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/events/on-this-day?month=${targetMonth}&day=${targetDay}`);

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data.events || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [targetMonth, targetDay]);

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getPromotionColor = (promotion: string) => {
    switch (promotion.toUpperCase()) {
      case 'WWE': return 'bg-yellow-100 text-yellow-800';
      case 'UFC': return 'bg-red-100 text-red-800';
      case 'WCW': return 'bg-blue-100 text-blue-800';
      case 'AEW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            On This Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            On This Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Unable to load events</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5" />
          On This Day ({targetMonth}/{targetDay})
        </CardTitle>
        <p className="text-sm text-gray-600">
          Major wrestling and MMA events that happened on this date
        </p>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-8">
            <CalendarClock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">No events found</p>
            <p className="text-sm text-gray-500">
              No major events occurred on {targetMonth}/{targetDay} in our database
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div 
                key={event.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getPromotionColor(event.promotion)}>
                        {event.promotion}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatDate(event.date)}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {event.name}
                    </h3>
                    
                    {event.venue && (
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        {event.venue}
                        {event.city && `, ${event.city}`}
                        {event.country && `, ${event.country}`}
                      </div>
                    )}

                    {event.headliners.length > 0 && (
                      <div className="mb-2">
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                          <Trophy className="h-4 w-4" />
                          Main Event
                        </div>
                        <p className="text-sm text-gray-600 pl-5">
                          {event.headliners[0]}
                        </p>
                      </div>
                    )}

                    {event.titleChanges.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                          <TrendingUp className="h-4 w-4" />
                          Title Changes
                        </div>
                        <div className="pl-5 space-y-1">
                          {event.titleChanges.map((title, index) => (
                            <p key={index} className="text-sm text-gray-600">
                              {title}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
