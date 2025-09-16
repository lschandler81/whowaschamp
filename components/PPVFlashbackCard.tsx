'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Users, 
  TrendingUp, 
  Info, 
  Star
} from 'lucide-react';
import { PPVEvent } from '@/lib/types/ppv-card';
import Link from 'next/link';

interface PPVFlashbackCardProps {
  org: 'UFC' | 'WWE';
  heading: string;
  event: PPVEvent | null;
  loading?: boolean;
  error?: string | null;
}

export function PPVFlashbackCard({ org, heading, event, loading = false, error = null }: PPVFlashbackCardProps) {
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

  const getPromotionColor = (promotion: 'UFC' | 'WWE') => {
    switch (promotion) {
      case 'UFC':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'WWE': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
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
            {heading}
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
            {heading}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Unable to load this week's {org} event</p>
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
            {heading}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No {org} event found for this week</p>
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
            {heading}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Event Header */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="outline" 
              className={getPromotionColor(org)}
            >
              {org}
            </Badge>
            <Badge 
              variant="outline" 
              className="bg-purple-100 text-purple-800 border-purple-300"
            >
              PPV
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
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

        {/* Key Stats - Always show both slots */}
        <div className="grid grid-cols-2 gap-4">
          {/* Attendance - always show */}
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Attendance</span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {event.attendance ? formatNumber(event.attendance) : '—'}
            </p>
          </div>
          
          {/* Buyrate - always show */}
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">PPV Buys</span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {event.buyrate ? `${formatNumber(event.buyrate)}k` : '—'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link href={`/ppv-flashback?org=${org}&slug=${event.slug}`}>
            <Button variant="outline" className="w-full">
              View Full Event Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}