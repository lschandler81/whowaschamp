'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Users, 
  TrendingUp, 
  Trophy, 
  Info, 
  RefreshCw,
  Star,
  DollarSign
} from 'lucide-react';
import { PPVFlashbackEvent } from '@/lib/types/ppv';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PPVFlashbackProps {
  compact?: boolean; // For homepage vs dedicated page
}

export function PPVFlashback({ compact = false }: PPVFlashbackProps) {
  const [event, setEvent] = useState<PPVFlashbackEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [context, setContext] = useState<any>(null);
  const [fallbackEvents, setFallbackEvents] = useState<any[]>([]);
  const [debug, setDebug] = useState<any>(null);

  useEffect(() => {
    fetchWeeklyPPV();
  }, []);

  const fetchWeeklyPPV = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/events/ppv-flashback');
      
      if (!response.ok) {
        throw new Error('Failed to fetch PPV event');
      }
      
  const data = await response.json();
  setEvent(data.event || null);
  setCurrentWeek(data.currentWeek || null);
  setContext(data.context || null);
  setFallbackEvents(data.fallbackEvents || []);
  setDebug(data.debug || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getPromotionColor = (promotion: string) => {
    switch (promotion.toUpperCase()) {
      case 'WWE':
      case 'WORLD WRESTLING ENTERTAINMENT': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'UFC':
      case 'ULTIMATE FIGHTING CHAMPIONSHIP': 
        return 'bg-red-100 text-red-800 border-red-300';
      case 'WCW': 
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'AEW': 
        return 'bg-green-100 text-green-800 border-green-300';
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            PPV Flashback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
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
            <Star className="h-5 w-5" />
            PPV Flashback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Unable to load this week's PPV</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!event) {
    return (
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            PPV Flashback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">No major PPVs this week in history</p>
            <p className="text-sm text-gray-500">
              No legendary events happened during this week in wrestling history.
            </p>
            {fallbackEvents.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Most Recent PPVs:</h3>
                <ul className="space-y-2">
                  {fallbackEvents.map((ev, idx) => (
                    <li key={ev.id} className="border rounded p-3 bg-gray-50">
                      <div className="font-bold">{ev.name}</div>
                      <div className="text-sm text-gray-600">{formatDate(ev.date)} &middot; {ev.promotion}</div>
                      {ev.attendance && <div className="text-xs text-gray-500">Attendance: {formatNumber(ev.attendance)}</div>}
                      {ev.buyrate && <div className="text-xs text-gray-500">Buyrate: {formatNumber(ev.buyrate)}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {debug && (
              <div className="mt-6 text-left text-xs text-gray-400">
                <div>Debug Info:</div>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(debug, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            PPV Flashback
          </CardTitle>
          <p className="text-sm text-gray-600">
            This week in wrestling history
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Event Header */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="outline" 
              className={getPromotionColor(event.promotion)}
            >
              {event.promotion}
            </Badge>
            <Badge 
              variant="outline" 
              className="bg-purple-100 text-purple-800 border-purple-300"
            >
              PPV
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
        </div>

        {/* Date and Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          {event.venue && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{event.venue}</span>
            </div>
          )}
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          {event.attendance && (
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Attendance</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {formatNumber(event.attendance)}
              </div>
            </div>
          )}
          
          {event.buyrate && (
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm font-medium">Buyrate</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {formatNumber(event.buyrate)}K
              </div>
            </div>
          )}
        </div>

        {/* Headliners */}
        {event.headliners && event.headliners.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Main Event
            </h4>
            <div className="flex flex-wrap gap-1">
              {event.headliners.map((headliner, index) => (
                <span key={index} className="text-sm">
                  {headliner}
                  {index < event.headliners.length - 1 && (
                    <span className="text-gray-400 mx-2">vs</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Title Changes */}
        {event.titleChanges && event.titleChanges.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Title Changes
            </h4>
            <div className="space-y-2">
              {event.titleChanges.map((change, index) => (
                <div key={index} className="text-sm bg-yellow-50 p-2 rounded">
                  {change}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Context (non-compact mode) */}
        {!compact && context && (
          <div className="border-t pt-4 space-y-4">
            {/* Years Ago */}
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-purple-600 font-medium">This happened</div>
              <div className="text-2xl font-bold text-purple-900">
                {context.yearsAgo} year{context.yearsAgo !== 1 ? 's' : ''} ago
              </div>
            </div>

            {/* Other Events This Week */}
            {context.alternativeEvents && context.alternativeEvents.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Other Events This Week in History
                </h4>
                <div className="space-y-2">
                  {context.alternativeEvents.map((altEvent: any, index: number) => (
                    <div key={index} className="text-sm bg-gray-50 p-3 rounded">
                      <div className="font-medium">{altEvent.name}</div>
                      <div className="text-gray-600">
                        {altEvent.promotion} • {new Date(altEvent.date).getFullYear()}
                        {altEvent.attendance && (
                          <span> • {formatNumber(altEvent.attendance)} attendance</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {context.totalMatchingEvents > context.alternativeEvents.length + 1 && (
                  <div className="text-xs text-gray-500 mt-2">
                    ...and {context.totalMatchingEvents - context.alternativeEvents.length - 1} more events happened this week in history
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* View Full Event Link (for compact version) */}
        {compact && (
          <div className="border-t pt-4">
            {context && (
              <div className="mb-3 text-xs text-gray-600">
                This happened {context.yearsAgo} year{context.yearsAgo !== 1 ? 's' : ''} ago
                {context.totalMatchingEvents > 1 && (
                  <span> • {context.totalMatchingEvents - 1} other events this week in history</span>
                )}
              </div>
            )}
            <Link 
              href="/ppv-flashback" 
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              View Full Event Details
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
