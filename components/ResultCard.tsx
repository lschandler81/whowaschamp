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

export function ResultCard({ champion, championship, birthDate, metadata }: ResultCardProps) {
  console.log('ResultCard received champion:', champion);
  console.log('ResultCard received championship:', championship);
  console.log('Champion object keys:', Object.keys(champion));
  console.log('Champion name field:', champion.champion);
  console.log('Champion name alt field:', champion.name);
  console.log('Full champion object:', JSON.stringify(champion, null, 2));
  
  const reignStart = new Date(champion.start_date);
  const reignEnd = champion.end_date ? new Date(champion.end_date) : null;
  
  // Calculate which day of the reign the birthday was
  const dayOfReign = Math.floor((birthDate.getTime() - reignStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Calculate reign length
  const reignEndDate = reignEnd || new Date();
  const reignLength = Math.floor((reignEndDate.getTime() - reignStart.getTime()) / (1000 * 60 * 60 * 24));

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
    <Card className="max-w-3xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
      <div className={`bg-gradient-to-r ${getChampionshipColors(championship)} p-1`}>
        <div className="bg-white/95 rounded-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className={`p-3 bg-gradient-to-br ${getChampionshipColors(championship)} rounded-full`}>
                <div className="text-4xl">{getChampionshipIcon(championship)}</div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              {getChampionshipIcon(championship)} Your Birthday Champion! {getChampionshipIcon(championship)}
            </CardTitle>
            <div className="text-xl text-gray-700">
              <strong className="text-2xl text-blue-800">{champion.champion || champion.name || 'Unknown Champion'}</strong> was the{' '}
              <span className="font-semibold text-indigo-600">{championship}</span> champion
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Champion Details */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Your Birthday</p>
                      <p className="font-semibold text-gray-900">
                        {birthDate.toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-500">Day of Reign</p>
                      <p className="font-semibold text-gray-900">Day {dayOfReign.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Title Won</p>
                      <p className="font-semibold text-gray-900">
                        {reignStart.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {champion.won_location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{champion.won_location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {champion.won_event && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Won at: {champion.won_event}</p>
                  {champion.notes && (
                    <p className="text-xs text-blue-500 mt-1">{champion.notes}</p>
                  )}
                </div>
              )}
            </div>

            {/* Fun Facts */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fun Facts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center">
                  <Badge variant="outline" className="mb-2 bg-white">Reign Length</Badge>
                  <p className="text-2xl font-bold text-blue-600">{reignLength}</p>
                  <p className="text-sm text-gray-600">days</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2 bg-white">Era</Badge>
                  <p className="text-2xl font-bold text-purple-600">{reignStart.getFullYear()}s</p>
                  <p className="text-sm text-gray-600">wrestling era</p>
                </div>
              </div>
              
              {/* Special badges for notable reigns */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {reignLength > 365 && (
                  <Badge className="bg-gold text-white">🏆 Long Reign (1+ Year)</Badge>
                )}
                {championship.includes('Women\'s') && (
                  <Badge className="bg-pink-500 text-white">👑 Women's Division</Badge>
                )}
                {championship.includes('NXT') && (
                  <Badge className="bg-yellow-500 text-white">⭐ Developmental</Badge>
                )}
                {reignStart.getFullYear() < 1980 && (
                  <Badge className="bg-amber-600 text-white">📜 Golden Era</Badge>
                )}
                {reignStart.getFullYear() >= 1997 && reignStart.getFullYear() <= 2002 && (
                  <Badge className="bg-red-600 text-white">🔥 Attitude Era</Badge>
                )}
              </div>
            </div>

            {/* Social Share */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Share Your Result
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleShare('twitter')}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter/X
                </Button>
                <Button
                  onClick={() => handleShare('facebook')}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
                <Button
                  onClick={() => handleShare('threads')}
                  className="bg-black hover:bg-gray-800 text-white flex items-center gap-2"
                >
                  <span className="font-bold">@</span>
                  Threads
                </Button>
              </div>
            </div>

            {/* Data Source */}
            <div className="text-center text-sm text-gray-500">
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