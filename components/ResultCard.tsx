'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, MapPin, Share2, Facebook, Twitter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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
    <Card className="result-card w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
      <div className={`bg-gradient-to-r ${getChampionshipColors(championship)} p-0.5`}>
        <div className="bg-white/95 rounded-lg">
          <CardHeader className="text-center pb-2 md:pb-4 px-2 md:px-6">
            <div className="flex justify-center mb-2 md:mb-4">
              <div className={`p-1 md:p-2 lg:p-3 bg-gradient-to-br ${getChampionshipColors(championship)} rounded-full`}>
                <div className="text-lg md:text-2xl lg:text-4xl">{getChampionshipIcon(championship)}</div>
              </div>
            </div>
            <CardTitle className="text-xs md:text-lg lg:text-xl font-bold text-gray-900 mb-1 md:mb-2 px-1 md:px-2">
              {champion.champion === 'VACANT' ? '👑 Title Was Vacant! 👑' : `${getChampionshipIcon(championship)} Your Birthday Champion! ${getChampionshipIcon(championship)}`}
            </CardTitle>
            <div className="text-xs md:text-base text-gray-700 px-1 md:px-4">
              {champion.champion === 'VACANT' ? (
                <div className="space-y-2">
                  <div className="text-xs md:text-sm text-gray-600">
                    The <span className="font-semibold text-indigo-600">{championship}</span> title was vacant on your birthday!
                  </div>
                  {champion.notes && (
                    <div className="text-xs md:text-sm lg:text-lg text-gray-600 bg-orange-50 p-2 md:p-3 rounded-lg border-l-4 border-orange-400">
                      <strong>Reason:</strong> {champion.notes}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <strong className="text-sm md:text-xl lg:text-2xl text-blue-800">{champion.champion || champion.name || 'Unknown Champion'}</strong> was the{' '}
                  <span className="font-semibold text-indigo-600">{championship}</span> champion
                </>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-3 md:space-y-4 lg:space-y-6 p-2 md:p-3 lg:p-6">
            {/* Champion Details */}
            <div className="bg-white p-2 md:p-3 lg:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                <div className="space-y-2 md:space-y-3 lg:space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm text-gray-500">Your Birthday</p>
                      <p className="text-xs md:text-sm lg:text-base font-semibold text-gray-900 break-words">
                        <span className="md:hidden">
                          {birthDate.toLocaleDateString('en-US', { 
                            weekday: 'short',
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="hidden md:inline">
                          {birthDate.toLocaleDateString('en-US', { 
                            weekday: 'long',
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 md:gap-3">
                    <Trophy className="h-4 w-4 md:h-5 md:w-5 text-yellow-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm text-gray-500">Day of Reign</p>
                      <p className="text-xs md:text-sm font-semibold text-gray-900">Day {dayOfReign?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm text-gray-500">Title Won</p>
                      <p className="text-xs md:text-sm lg:text-base font-semibold text-gray-900 break-words">
                        <span className="md:hidden">
                          {reignStart
                            ? reignStart.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
                            : 'Unknown'}
                        </span>
                        <span className="hidden md:inline">
                          {reignStart
                            ? reignStart.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
                            : 'Unknown'}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  {champion.won_location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs md:text-sm text-gray-500">Location</p>
                        <p className="font-semibold text-sm md:text-base text-gray-900 truncate">{champion.won_location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 md:p-3 lg:p-6 rounded-xl">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 mb-2 md:mb-3 lg:mb-4">Fun Facts</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                {champion.champion === 'VACANT' ? (
                  <>
                    <div className="text-center">
                      <Badge variant="outline" className="mb-2 bg-orange-100 text-orange-800 border-orange-300">Vacant Period</Badge>
                      <p className="text-2xl font-bold text-orange-600">{Math.max(0, reignLength)}</p>
                      <p className="text-sm text-gray-600">days vacant</p>
                    </div>
                    {champion.won_event && (
                      <div className="text-center">
                        <Badge variant="outline" className="mb-2 bg-orange-100 text-orange-800 border-orange-300">Status</Badge>
                        <p className="text-lg font-bold text-orange-600">{champion.won_event}</p>
                        <p className="text-sm text-gray-600">action</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <Badge variant="outline" className="mb-1 md:mb-2 bg-white text-xs">Reign Length</Badge>
                      <p className="text-sm md:text-lg lg:text-xl font-bold text-blue-600 break-all">{Math.max(0, reignLength)}</p>
                      <p className="text-xs text-gray-600">days</p>
                    </div>
                    {champion.won_event && (
                      <div className="text-center">
                        <Badge variant="outline" className="mb-1 md:mb-2 bg-white text-xs">Won At</Badge>
                        <p className="text-xs md:text-sm lg:text-base font-bold text-green-600 break-words">{champion.won_event}</p>
                        <p className="text-xs text-gray-600">event</p>
                      </div>
                    )}
                    {!champion.won_event && (
                      <div className="text-center">
                        <Badge variant="outline" className="mb-1 md:mb-2 bg-white text-xs">Champion</Badge>
                        <p className="text-sm md:text-base lg:text-lg font-bold text-gray-700">{champion.champion}</p>
                        <p className="text-xs text-gray-600">name</p>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Additional notes if present */}
              {champion.notes && (
                <div className={`mt-3 md:mt-4 p-2 md:p-3 rounded-lg ${champion.champion === 'VACANT' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                  <p className={`text-xs md:text-sm ${champion.champion === 'VACANT' ? 'text-orange-700' : 'text-blue-700'}`}>{champion.notes}</p>
                </div>
              )}
              
              {/* Special badges for notable reigns */}
              <div className="mt-3 md:mt-4 flex flex-wrap gap-2 justify-center">
                {reignLength > 365 && (
                  <Badge className="bg-gold text-white text-xs">🏆 Long Reign (1+ Year)</Badge>
                )}
                {championship.includes('Women\'s') && (
                  <Badge className="bg-pink-500 text-white text-xs">👑 Women's Division</Badge>
                )}
                
                
                {/* WWE-specific badges */}
                {!championship.includes('UFC') && (
                  <>
                    {championship.includes('NXT') && (
                      <Badge className="bg-yellow-500 text-white text-xs">⭐ Developmental</Badge>
                    )}
                    {/* Only show wrestling eras for WWE championships */}
                    {(championship.includes('WWE') || championship.includes('WWF')) && reignStart && (() => {
                      const year = reignStart.getFullYear();
                      const era = getWrestlingEra(year);
                      const eraColors: { [key: string]: string } = {
                        'Triple H Era': 'bg-purple-600',
                        'Thunderdome Era': 'bg-blue-600', 
                        'New Era': 'bg-indigo-600',
                        'Reality Era': 'bg-cyan-600',
                        'PG Era': 'bg-green-600',
                        'Ruthless Aggression': 'bg-orange-600',
                        'Attitude Era': 'bg-red-600',
                        'New Generation': 'bg-pink-600',
                        'Golden Era': 'bg-amber-600',
                        'Rock \'n\' Wrestling': 'bg-rose-600',
                        'Classic Era': 'bg-gray-600'
                      };
                      const colorClass = eraColors[era] || 'bg-gray-600';
                      return (
                        <Badge className={`${colorClass} text-white text-xs`}>
                          {era === 'Attitude Era' ? '🔥' : 
                           era === 'Golden Era' ? '📜' : 
                           era === 'PG Era' ? '🎪' :
                           era === 'Reality Era' ? '📱' :
                           era === 'New Era' ? '✨' :
                           era === 'Triple H Era' ? '👑' : '🏟️'} {era}
                        </Badge>
                      );
                    })()}
                  </>
                )}
                
                {/* UFC-specific badges */}
                {championship.includes('UFC') && reignStart && (
                  <>
                    {reignStart.getFullYear() >= 1993 && reignStart.getFullYear() <= 2000 && (
                      <Badge className="bg-gray-600 text-white text-xs">🥊 Early UFC Era</Badge>
                    )}
                    {reignStart.getFullYear() >= 2001 && reignStart.getFullYear() <= 2016 && (
                      <Badge className="bg-orange-600 text-white text-xs">🔥 Zuffa Era</Badge>
                    )}
                    {reignStart.getFullYear() >= 2017 && (
                      <Badge className="bg-red-600 text-white text-xs">✨ WME Era</Badge>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Social Share */}
            <div className="bg-white p-2 md:p-3 lg:p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xs md:text-sm lg:text-base font-semibold text-gray-900 mb-2 md:mb-3 lg:mb-4 flex items-center gap-1 md:gap-2">
                <Share2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
                Share Your Result
              </h3>
              <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3">
                <Button
                  onClick={() => handleShare('twitter')}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 md:gap-2 text-xs md:text-sm lg:text-base px-1.5 md:px-2 lg:px-3 py-1.5 md:py-2"
                >
                  <Twitter className="h-3 w-3" />
                  <span className="hidden xs:inline">Twitter/X</span>
                  <span className="inline xs:hidden">X</span>
                </Button>
                <Button
                  onClick={() => handleShare('facebook')}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 md:gap-2 text-xs md:text-sm lg:text-base px-1.5 md:px-2 lg:px-3 py-1.5 md:py-2"
                >
                  <Facebook className="h-3 w-3" />
                  <span className="hidden xs:inline">Facebook</span>
                  <span className="inline xs:hidden">FB</span>
                </Button>
                <Button
                  onClick={() => handleShare('threads')}
                  className="bg-black hover:bg-gray-800 text-white flex items-center gap-1 md:gap-2 text-xs md:text-sm lg:text-base px-1.5 md:px-2 lg:px-3 py-1.5 md:py-2"
                >
                  <span className="font-bold text-xs">@</span>
                  <span className="hidden xs:inline">Threads</span>
                  <span className="inline xs:hidden">Th</span>
                </Button>
              </div>
            </div>

            {/* Data Source */}
            <div className="text-center text-xs md:text-sm text-gray-500">
              <p>
                Data last updated: {new Date(metadata.generated_at).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
