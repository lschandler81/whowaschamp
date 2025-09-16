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

interface UFCFlashbackProps {
  compact?: boolean; // For homepage vs dedicated page
}

export function UFCFlashback({ compact = false }: UFCFlashbackProps) {
  const [event, setEvent] = useState<PPVFlashbackEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Always reset state and fetch fresh data on mount and when navigating
  useEffect(() => {
    setEvent(null);
    setError(null);
    setLoading(true);
    fetchWeeklyPPV();
  }, []);

  const fetchWeeklyPPV = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/events/ufc-flashback');
      
      if (!response.ok) {
        throw new Error('Failed to fetch UFC event');
      }
      
      const data = await response.json();
      console.log('[UFC Flashback] API response:', data);
      setEvent(data.event || null);
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

  if (loading) {
    return (
      <Card className="bg-white shadow-sm h-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-red-600" />
            This Week in Combat Sports History
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
      <Card className="bg-white shadow-sm h-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-red-600" />
            This Week in Combat Sports History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Unable to load this week's UFC event</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!event) {
    return (
      <Card className="bg-white shadow-sm h-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-red-600" />
            This Week in Combat Sports History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No UFC event found for this week</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-red-600" />
          This Week in Combat Sports History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Event Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-red-100 text-red-800 border-red-300">
              UFC
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {event.name}
          </h3>
        </div>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          {event.venue && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>
                {event.venue}
                {event.city && `, ${event.city}`}
                {event.country && event.country !== 'USA' && `, ${event.country}`}
              </span>
            </div>
          )}

          {event.attendance && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span>{formatNumber(event.attendance)} in attendance</span>
            </div>
          )}

          {event.buyrate && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 flex-shrink-0" />
              <span>{formatNumber(event.buyrate)}k PPV buys</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link href={`/events/ufc/${event.id}`}>
            <Button variant="outline" className="w-full bg-red-50 border-red-200 text-red-700 hover:bg-red-100">
              View Full Event Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}