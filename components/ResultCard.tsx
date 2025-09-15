'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, MapPin, Share2, Facebook, Twitter } from 'lucide-react';
import { formatDateShort } from '@/lib/dateUtils';

interface ResultCardProps {
  champion: any;
  championship: string;
  birthDate: Date;
  metadata: any;
}

function isValidISODate(s: any): s is string {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function getWrestlingEra(year: number): string {
  if (year >= 2023) return 'Triple H Era';
  if (year >= 2019) return 'Thunderdome Era';
  if (year >= 2016) return 'New Era';
  if (year >= 2013) return 'Reality Era';
  if (year >= 2008) return 'PG Era';
  if (year >= 2002) return 'Ruthless Aggression';
  if (year >= 1997) return 'Attitude Era';
  if (year >= 1993) return 'New Generation';
  if (year >= 1984) return 'Golden Era';
  if (year >= 1979) return 'Rock \'n\' Wrestling';
  return 'Classic Era';
}

export function ResultCard({ champion, championship, birthDate, metadata }: ResultCardProps) {
  console.log('ResultCard received champion:', champion);
  console.log('ResultCard received championship:', championship);
  console.log('Champion object keys:', Object.keys(champion));
  console.log('Champion name field:', champion.champion);
  console.log('Champion name alt field:', champion.name);
  console.log('Full champion object:', JSON.stringify(champion, null, 2));
  
  const reignStart = isValidISODate(champion.start_date) ? new Date(champion.start_date) : null;
  const reignEnd = isValidISODate(champion.end_date) ? new Date(champion.end_date) : null;
  
  // Calculate which day of the reign the birthday was
  const dayOfReign = reignStart ? Math.floor((birthDate.getTime() - reignStart.getTime()) / (1000 * 60 * 60 * 24)) + 1 : null;
  
  // Calculate reign length
  const reignEndDate = reignEnd || new Date();
  const reignLength = reignStart ? Math.floor((reignEndDate.getTime() - reignStart.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  const shareText = `${champion.champion} was ${championship} champion on my birthday (${birthDate.toLocaleDateString()})! 🏆 Find your birthday champion at`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  // Get championship color scheme
  const getChampionshipColors = (championship: string) => {
    if (championship.includes('WWE Championship')) return 'from-yellow-400 to-amber-500';
    if (championship.includes('WWE Women\'s Championship')) return 'from-pink-400 to-purple-500';
    if (championship.includes('Intercontinental')) return 'from-blue-400 to-indigo-500';
    if (championship.includes('NXT Championship')) return 'from-yellow-500 to-orange-500';
    if (championship.includes('TNA') || championship.includes('Impact')) return 'from-blue-500 to-indigo-600';
    if (championship.includes('WCW')) return 'from-red-400 to-red-600';
    if (championship.includes('AEW')) return 'from-green-400 to-emerald-500';
    if (championship.includes('ROH')) return 'from-purple-400 to-purple-600';
    if (championship.includes('NJPW')) return 'from-gray-400 to-gray-600';
    return 'from-yellow-400 to-amber-500'; // default
  };

  // Get championship icon
  const getChampionshipIcon = (championship: string) => {
    if (championship.includes('Women\'s')) return '👑';
    if (championship.includes('NXT')) return '⭐';
    if (championship.includes('Intercontinental')) return '🥈';
    return '🏆';
  };

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let shareLink = '';
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'threads':
        shareLink = `https://www.threads.net/intent/post?text=${encodedText} ${encodedUrl}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Card className="rounded-2xl border border-gray-200/70 bg-white shadow-sm overflow-hidden">
      <div className={`bg-gradient-to-r ${getChampionshipColors(championship)} p-0.5`}>
        <div className="bg-white/95 rounded-2xl">
          <CardHeader className="text-center p-4 sm:p-5">
            <div className="flex justify-center mb-3">
              <div className={`p-2 bg-gradient-to-br ${getChampionshipColors(championship)} rounded-full`}>
                <div className="text-2xl">{getChampionshipIcon(championship)}</div>
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 mb-3">
              {champion.champion === 'VACANT' ? '👑 Title Was Vacant! 👑' : `${getChampionshipIcon(championship)} Your Birthday Champion! ${getChampionshipIcon(championship)}`}
            </CardTitle>
            <div className="text-sm sm:text-[15px] leading-6 text-gray-700">
              {champion.champion === 'VACANT' ? (
                <div className="space-y-3">
                  <div className="text-xs text-gray-500">
                    The <span className="font-semibold text-indigo-700">{championship}</span> title was vacant on your birthday!
                  </div>
                  {champion.notes && (
                    <div className="text-xs text-red-700 bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                      <strong>Reason:</strong> {champion.notes}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-lg sm:text-xl font-semibold text-blue-800 break-words">
                    {champion.champion || champion.name || 'Unknown Champion'}
                  </div>
                  <div className="text-sm text-gray-600">
                    was the <span className="font-semibold text-indigo-700">{championship}</span> champion
                  </div>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-4 sm:p-5">
            {/* Champion Details */}
            <div className="rounded-2xl border border-gray-200/70 bg-white shadow-sm p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <p className="text-xs text-gray-500">Your Birthday</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDateShort(birthDate)}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                      <p className="text-xs text-gray-500">Day of Reign</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Day {dayOfReign?.toLocaleString() || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <p className="text-xs text-gray-500">Title Won</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {reignStart ? formatDateShort(reignStart) : 'Unknown'}
                    </p>
                  </div>
                  
                  {champion.won_location && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <p className="text-xs text-gray-500">Location</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 break-words">{champion.won_location}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Fun Facts</h3>
              <div className="space-y-3">
                {champion.champion === 'VACANT' ? (
                  <>
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <div className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-red-100 text-red-700 mb-2">
                        Vacant Period
                      </div>
                      <p className="text-xl font-bold text-red-600">{Math.max(0, reignLength)} days</p>
                      <p className="text-xs text-gray-500">title was vacant</p>
                    </div>
                    {champion.won_event && (
                      <div className="text-center p-3 bg-white/50 rounded-lg">
                        <div className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-red-100 text-red-700 mb-2">
                          Status
                        </div>
                        <p className="text-sm font-bold text-red-600 break-words">{champion.won_event}</p>
                        <p className="text-xs text-gray-500">action taken</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-white/50 rounded-lg">
                        <div className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-blue-100 text-blue-700 mb-2">
                          Reign Length
                        </div>
                        <p className="text-xl font-bold text-blue-600">{Math.max(0, reignLength)} days</p>
                        <p className="text-xs text-gray-500">as champion</p>
                      </div>
                      {champion.won_event && (
                        <div className="text-center p-3 bg-white/50 rounded-lg">
                          <div className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-green-100 text-green-700 mb-2">
                            Won At
                          </div>
                          <p className="text-sm font-bold text-green-600 break-words">{champion.won_event}</p>
                          <p className="text-xs text-gray-500">event</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              {/* Additional notes if present */}
              {champion.notes && (
                <div className={`mt-3 p-3 rounded-lg line-clamp-2 ${champion.champion === 'VACANT' ? 'bg-red-50' : 'bg-blue-50'}`}>
                  <p className={`text-xs ${champion.champion === 'VACANT' ? 'text-red-700' : 'text-blue-700'}`}>{champion.notes}</p>
                </div>
              )}
              
              {/* Special badges for notable reigns */}
              <div className="mt-3 flex flex-wrap gap-1 justify-center">
                {reignLength > 365 && (
                  <div className="inline-flex items-center rounded-full px-2.5 py-1 text-xs bg-indigo-50 text-indigo-700">
                    🏆 Long Reign
                  </div>
                )}
                {championship.includes('Women\'s') && (
                  <div className="inline-flex items-center rounded-full px-2.5 py-1 text-xs bg-indigo-50 text-indigo-700">
                    👑 Women's
                  </div>
                )}
                
                {/* WWE-specific badges */}
                {!championship.includes('UFC') && (
                  <>
                    {championship.includes('NXT') && (
                      <div className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-indigo-100 text-indigo-700">
                        ⭐ NXT
                      </div>
                    )}
                    {/* Only show wrestling eras for WWE championships */}
                    {(championship.includes('WWE') || championship.includes('WWF')) && reignStart && (() => {
                      const year = reignStart.getFullYear();
                      const era = getWrestlingEra(year);
                      return (
                        <div className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-indigo-100 text-indigo-700">
                          {era === 'Attitude Era' ? '🔥' : 
                           era === 'Golden Era' ? '📜' : 
                           era === 'PG Era' ? '🎪' :
                           era === 'Reality Era' ? '📱' :
                           era === 'New Era' ? '✨' :
                           era === 'Triple H Era' ? '👑' : '🏟️'} {era}
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>
            </div>

            {/* Social Share */}
            <div className="rounded-2xl border border-gray-200/70 bg-white shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Result
              </h3>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Button
                  onClick={() => handleShare('twitter')}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 text-sm px-4 py-2"
                >
                  <Twitter className="h-4 w-4" />
                  <span>X (Twitter)</span>
                </Button>
                <Button
                  onClick={() => handleShare('facebook')}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-sm px-4 py-2"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Button>
                <Button
                  onClick={() => handleShare('threads')}
                  className="bg-black hover:bg-gray-800 text-white flex items-center gap-2 text-sm px-4 py-2"
                >
                  <span className="font-bold">@</span>
                  <span>Threads</span>
                </Button>
              </div>
            </div>

            {/* Data Source */}
            <div className="text-center text-xs text-gray-500 mt-4">
              <p>
                Data last updated: {formatDateShort(new Date(metadata.generated_at))}
              </p>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
