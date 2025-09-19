import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Trophy, Users, Award, Star } from 'lucide-react';
import { CareerHighlight } from '@/lib/types/profiles';

interface CareerHighlightsProps {
  highlights: CareerHighlight[];
}

function getCategoryIcon(category: string) {
  switch (category) {
    case 'championship':
      return <Trophy className="h-4 w-4" />;
    case 'debut':
      return <Star className="h-4 w-4" />;
    case 'retirement':
      return <Users className="h-4 w-4" />;
    case 'milestone':
      return <Award className="h-4 w-4" />;
    case 'feud':
      return <Users className="h-4 w-4" />;
    case 'special_match':
      return <Trophy className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'championship':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'debut':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'retirement':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    case 'milestone':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'feud':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'special_match':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

function getImportanceText(importance: number): string {
  if (importance >= 9) return 'Legendary';
  if (importance >= 8) return 'Major';
  if (importance >= 7) return 'Significant';
  if (importance >= 6) return 'Notable';
  return 'Minor';
}

export default function CareerHighlightsSection({ highlights }: CareerHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Career Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Career highlights will be displayed here once data is available.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Deduplicate highlights defensively in UI
  const seen = new Set<string>();
  const deduped: CareerHighlight[] = [];
  for (const h of highlights) {
    const key = h.category === 'championship'
      ? `${h.title}::${new Date(h.date).toISOString().slice(0,10)}`
      : `${h.title}::${h.category}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(h);
    }
  }

  // Sort by importance and then by date
  const sortedHighlights = deduped.sort((a, b) => {
    if (a.importance !== b.importance) {
      return b.importance - a.importance;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Career Highlights
          <Badge variant="secondary" className="ml-2">
            {sortedHighlights.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedHighlights.map((highlight) => (
            <div
              key={highlight.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(highlight.category)}
                    <h3 className="font-semibold text-lg">{highlight.title}</h3>
                    <Badge
                      className={getCategoryColor(highlight.category)}
                      variant="outline"
                    >
                      {highlight.category.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  {highlight.description && (
                    <p className="text-muted-foreground mb-3">
                      {highlight.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(highlight.date)}
                    </div>
                    
                    {highlight.venue && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {highlight.venue}
                      </div>
                    )}
                    
                    {highlight.opponent && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        vs. {highlight.opponent}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    {getImportanceText(highlight.importance)}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {highlight.importance}/10
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
