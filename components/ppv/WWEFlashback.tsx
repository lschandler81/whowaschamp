'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { PPVFlashbackEvent } from '@/lib/types/ppv';

export default function WWEFlashback() {
  const [event, setEvent] = useState<PPVFlashbackEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [context, setContext] = useState<any>(null);

  const getPromotionColor = (promotionName: string): string => {
    const colors: { [key: string]: string } = {
      'world wrestling entertainment': '#CE302C',
      'wwe': '#CE302C',
    };
    return colors[promotionName.toLowerCase()] || '#888888';
  };

  useEffect(() => {
    const fetchFlashbackEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/events/wwe-flashback');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setEvent(data.event || null);
        setContext(data.context || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFlashbackEvent();
  }, []);

  const LoadingSkeleton = () => (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-6 w-16 mt-4 md:mt-0" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) return <LoadingSkeleton />;
  
  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-lg border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <p className="text-red-600 mb-2 font-semibold">Error Loading WWE Event</p>
          <p className="text-red-500 text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!event) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-lg border-gray-200">
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">No WWE event found for this week.</p>
        </CardContent>
      </Card>
    );
  }

  const eventDate = new Date(event.date);
  const currentDate = new Date();
  const yearsAgo = context?.yearsAgo || (currentDate.getFullYear() - eventDate.getFullYear());
  const promotionName = typeof event.promotion === 'string' 
    ? event.promotion 
    : event.promotion?.name ?? 'WWE';
  const promotionColor = getPromotionColor(promotionName);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg border-2" style={{ borderColor: promotionColor }}>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Event Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="space-y-2 flex-1">
                <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                  {event.name}
                </h2>
                <p className="text-gray-600 text-lg">
                  {eventDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • {yearsAgo} years ago
                </p>
              </div>
              <Badge 
                variant="secondary" 
                className="mt-4 md:mt-0 text-white font-semibold px-3 py-1"
                style={{ backgroundColor: promotionColor }}
              >
                {promotionName}
              </Badge>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Calendar className="mx-auto mb-2 text-gray-600" size={24} />
                <p className="text-sm text-gray-600 mb-1">Date</p>
                <p className="font-semibold text-gray-900">
                  {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <MapPin className="mx-auto mb-2 text-gray-600" size={24} />
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="font-semibold text-gray-900 text-sm leading-tight">
                  {event.city}, {event.country}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Venue</p>
                <p className="font-semibold text-gray-900 text-sm leading-tight">
                  {event.venue}
                </p>
              </div>
              
              {event.attendance && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Users className="mx-auto mb-2 text-gray-600" size={24} />
                  <p className="text-sm text-gray-600 mb-1">Attendance</p>
                  <p className="font-semibold text-gray-900">
                    {event.attendance.toLocaleString()}
                  </p>
                </div>
              )}
              
              {!event.attendance && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <TrendingUp className="mx-auto mb-2 text-gray-600" size={24} />
                  <p className="text-sm text-gray-600 mb-1">Score</p>
                  <p className="font-semibold text-gray-900">
                    {event.score || 'N/A'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Events This Week */}
      {context?.alternativeEvents && Array.isArray(context.alternativeEvents) && context.alternativeEvents.length > 0 && (
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Other Events This Week in History
            </h3>
            <div className="space-y-3">
              {context.alternativeEvents.map((altEvent: any, index: number) => (
                <div key={altEvent.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{altEvent.name || 'Unknown Event'}</p>
                    <p className="text-sm text-gray-600">
                      {altEvent.venue && altEvent.city ? `${altEvent.venue}, ${altEvent.city}` : 'Location TBA'}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {altEvent.date ? new Date(altEvent.date).getFullYear() : 'Unknown Year'}
                  </p>
                </div>
              ))}
            </div>
            {(context.totalMatchingEvents || 0) > context.alternativeEvents.length + 1 && (
              <p className="text-sm text-gray-500 mt-3 text-center">
                ...and {(context.totalMatchingEvents || 0) - context.alternativeEvents.length - 1} more events happened this week in history
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
