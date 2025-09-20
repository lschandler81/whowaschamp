import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Flame, ArrowRight } from 'lucide-react';
import { Rivalry } from '@/lib/types/profiles';
import Link from 'next/link';

interface RivalriesProps {
  rivalries: Rivalry[];
}

function getIntensityColor(intensity: number): string {
  if (intensity >= 9) return 'bg-red-600 text-white';
  if (intensity >= 7) return 'bg-orange-500 text-white';
  if (intensity >= 5) return 'bg-yellow-500 text-black';
  return 'bg-gray-500 text-white';
}

function getIntensityText(intensity: number): string {
  if (intensity >= 9) return 'Legendary';
  if (intensity >= 7) return 'Intense';
  if (intensity >= 5) return 'Heated';
  return 'Mild';
}

function formatDateRange(startDate?: string, endDate?: string): string {
  if (!startDate && !endDate) return '';
  
  const formatYear = (dateStr: string) => {
    try {
      return new Date(dateStr).getFullYear().toString();
    } catch {
      return dateStr;
    }
  };
  
  if (startDate && endDate) {
    return `${formatYear(startDate)} - ${formatYear(endDate)}`;
  } else if (startDate) {
    return `${formatYear(startDate)} - Present`;
  } else if (endDate) {
    return `Until ${formatYear(endDate)}`;
  }
  
  return '';
}

export default function RivalriesSection({ rivalries }: RivalriesProps) {
  if (!rivalries || rivalries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Rivalries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No rivalries data available yet. Check back for updates on famous feuds and storylines.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Dedupe rivalries by opponent + name to avoid visual duplicates
  const seen = new Set<string>();
  const deduped: Rivalry[] = [];
  for (const r of rivalries) {
    const key = `${r.opponentSlug || r.opponentName}::${r.rivalryName || ''}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(r);
    }
  }

  // Sort by feud intensity
  const sortedRivalries = deduped.sort((a, b) => b.feudIntensity - a.feudIntensity);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Rivalries & Feuds
          <Badge variant="secondary" className="ml-2">
            {rivalries.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedRivalries.map((rivalry) => (
            <div
              key={rivalry.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 break-words">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <h3 className="font-semibold text-lg break-words">
                      {rivalry.rivalryName}
                    </h3>
                    <Badge
                      className={getIntensityColor(rivalry.feudIntensity)}
                    >
                      {getIntensityText(rivalry.feudIntensity)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-muted-foreground">vs.</span>
                    <Link 
                      href={`/profiles/${rivalry.opponentSlug}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {rivalry.opponentName}
                    </Link>
                  </div>
                  
                  <p className="text-muted-foreground mb-3 leading-relaxed break-words">
                    {rivalry.description}
                  </p>
                  
                  {rivalry.notableMatches && (
                    <div className="mb-3">
                      <h4 className="font-medium mb-2 text-sm">Notable Matches:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {rivalry.notableMatches.split('•').map((item, idx) => (
                          <li key={idx} className="break-words">{item.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {(rivalry.startDate || rivalry.endDate) && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDateRange(rivalry.startDate, rivalry.endDate)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 md:self-start">
                  <Badge variant="outline" className="text-xs">
                    Intensity: {rivalry.feudIntensity}/10
                  </Badge>
                  
                  <Button variant="outline" size="sm" asChild className="w-full md:w-auto">
                    <Link href={`/profiles/${rivalry.opponentSlug}`}>
                      View Opponent
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
