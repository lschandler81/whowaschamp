'use client';

import Image from 'next/image';
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
  context?: any;
  loading?: boolean;
  error?: string | null;
}

export function PPVFlashbackCard({ org, heading, event, context, loading = false, error = null }: PPVFlashbackCardProps) {
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

  const getOrgAccentColor = (promotion: 'UFC' | 'WWE') => {
    switch (promotion) {
      case 'UFC':
        return 'border-l-red-400';
      case 'WWE': 
        return 'border-l-yellow-400';
      default: 
        return 'border-l-gray-200';
    }
  };

  const getOrgImage = (promotion: 'UFC' | 'WWE') => {
    switch (promotion) {
      case 'UFC':
        return {
          src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im9jdGFnb24iIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmQ3MDA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIzMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmIzMDA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTExMTE1O3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjb2N0YWdvbikiLz48cG9seWdvbiBwb2ludHM9IjIwMCw3MCAzMDAsMTAwIDMwMCwyMDAgMjAwLDIzMCAxMDAsMjAwIDEwMCwxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNCIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSIxNSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuNiIvPjwvc3ZnPg==',
          alt: 'UFC Octagon with dramatic lighting pattern'
        };
      case 'WWE':
        return {
          src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9IndyZXN0bGluZ1JpbmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZjAwMDA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIzMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNiYjAwMDA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMzMxMTExO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjd3Jlc3RsaW5nUmluZykiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjgwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+',
          alt: 'Wrestling ring ropes detail shot'
        };
      default:
        return {
          src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNwb3RsaWdodCIgY3g9IjUwJSIgY3k9IjIwJSIgcj0iODAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmO3N0b3Atb3BhY2l0eTowLjgiIC8+PHN0b3Agb2Zmc2V0PSI0MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4ODU1ZGQ7c3RvcC1vcGFjaXR5OjAuNiIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxMTExMjI7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzcG90bGlnaHQpIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iNjAiIHI9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuOCIvPjxyZWN0IHg9IjEwMCIgeT0iMjAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuNiIvPjwvc3ZnPg==',
          alt: 'Wrestling arena with dramatic spotlight'
        };
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

  const { src: imageSrc, alt: imageAlt } = getOrgImage(org);

  return (
    <Card className={`bg-white shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 ${getOrgAccentColor(org)}`}>
      {/* Event Image */}
      <div className="relative h-32 overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <CardHeader className="pb-4">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-gray-700">
            <Star className="h-5 w-5 text-yellow-500" />
            {heading}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Event Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="outline" 
              className={`${getPromotionColor(org)} font-semibold`}
            >
              {org}
            </Badge>
            <Badge 
              variant="outline" 
              className="bg-purple-100 text-purple-800 border-purple-300 font-semibold"
            >
              PPV
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{event.title}</h3>
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
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center gap-1 text-blue-700 mb-2">
              <Users className="h-4 w-4" />
              <span className="text-sm font-semibold">Attendance</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {event.attendance ? formatNumber(event.attendance) : '—'}
            </p>
          </div>
          
          {/* Buyrate - always show */}
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-1 text-green-700 mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold">PPV Buys</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {event.buyrate ? `${formatNumber(event.buyrate)}k` : '—'}
            </p>
          </div>
        </div>

        {/* Other Events This Week in History */}
        {context && (
          <div className="border-t pt-4">
            <div className="text-center p-3 bg-purple-50 rounded-lg mb-4">
              <div className="text-sm text-purple-600 font-medium">This happened</div>
              <div className="text-2xl font-bold text-purple-900">
                {context.yearsAgo} year{context.yearsAgo !== 1 ? 's' : ''} ago
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Other Events This Week in History
              </h4>
              {context.alternativeEvents && context.alternativeEvents.length > 0 ? (
                <div className="space-y-2">
                  {context.alternativeEvents.map((altEvent: any, index: number) => (
                    <div key={index} className="text-sm bg-gray-50 p-3 rounded">
                      <div className="font-medium">{altEvent.name}</div>
                      <div className="text-gray-600">
                        {typeof altEvent.promotion === 'string'
                          ? altEvent.promotion
                          : altEvent.promotion?.name || org} • {new Date(altEvent.date).getFullYear()}
                        {altEvent.attendance && (
                          <span> • {formatNumber(altEvent.attendance)} attendance</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  {context.totalMatchingEvents ? context.totalMatchingEvents - 1 : 0} other events happened this week in history.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <Link href={`/ppv-flashback?org=${org}&slug=${event.slug}`}>
            <Button variant="outline" className="w-full font-semibold border-2 hover:shadow-md transition-all duration-200">
              View Full Event Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}