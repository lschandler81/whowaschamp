import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { 
  Calendar, 
  MapPin, 
  Users, 
  TrendingUp, 
  Trophy, 
  ArrowLeft,
  Star,
  DollarSign,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface EventDetailPageProps {
  params: {
    promotion: string;
    id: string;
  };
}

// Simple function to find event in static data
async function getEvent(id: string, promotion: string) {
  try {
    // Load static data as fallback
    const dataFile = promotion === 'ufc' ? 'ufc-flashback.json' : 'wwe-flashback.json';
    const staticData = require(`@/public/data/${dataFile}`);
    
    // Search through all weeks for the event
    for (const weekData of Object.values(staticData) as any[]) {
      // Check main event
      if (weekData.event && weekData.event.id === id) {
        return weekData.event;
      }
      
      // Check alternatives
      if (weekData.alternatives) {
        for (const alt of weekData.alternatives) {
          if (alt.id === id) {
            return alt;
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error loading event:', error);
    return null;
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  try {
    // Validate params
    if (!params.id || !params.promotion) {
      notFound();
    }

    // Validate promotion
    if (params.promotion !== 'ufc' && params.promotion !== 'wwe') {
      notFound();
    }

    const event = await getEvent(params.id, params.promotion);

    if (!event) {
      notFound();
    }

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getPromotionColor = (promotion: string) => {
    const isWWE = promotion === 'World Wrestling Entertainment';
    if (isWWE) {
      return {
        badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        accent: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200'
      };
    } else {
      return {
        badge: 'bg-red-100 text-red-800 border-red-300',
        accent: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200'
      };
    }
  };

  const colors = getPromotionColor(event.promotion);
  const isWWE = event.promotion === 'World Wrestling Entertainment';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={colors.badge}>
              {isWWE ? 'WWE' : 'UFC'}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Event Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Event Info Card */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isWWE ? <Star className={`h-5 w-5 ${colors.accent}`} /> : <Trophy className={`h-5 w-5 ${colors.accent}`} />}
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{formatDate(event.date)}</p>
                      <p className="text-sm text-gray-500">Event Date</p>
                    </div>
                  </div>
                  
                  {event.venue && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{event.venue}</p>
                        <p className="text-sm text-gray-500">
                          {event.city && `${event.city}`}
                          {event.country && event.country !== 'USA' && `, ${event.country}`}
                        </p>
                      </div>
                    </div>
                  )}

                  {event.attendance && (
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{formatNumber(event.attendance)}</p>
                        <p className="text-sm text-gray-500">Attendance</p>
                      </div>
                    </div>
                  )}

                  {event.buyrate && (
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{formatNumber(event.buyrate)}k</p>
                        <p className="text-sm text-gray-500">PPV Buys</p>
                      </div>
                    </div>
                  )}
                </div>

                {event.sourceUrl && (
                  <div className="pt-4 border-t">
                    <Link href={event.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Source
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Headliners Card - Only show if we have headliners */}
            {event.headliners && event.headliners.length > 0 && (
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-gray-600" />
                    {isWWE ? 'Main Event Participants' : 'Fight Card Headliners'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {event.headliners.map((headliner: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{headliner.name}</p>
                          <p className="text-sm text-gray-500 capitalize">{headliner.role}</p>
                        </div>
                        {headliner.result && (
                          <Badge variant="outline" className="capitalize">
                            {headliner.result}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Title Changes Card - Only show if we have title changes */}
            {event.titleChanges && event.titleChanges.length > 0 && (
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Championship Changes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {event.titleChanges.map((change: any, index: number) => (
                      <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="font-medium text-gray-900">{change.titleName}</p>
                        {change.newChampion && change.oldChampion && (
                          <p className="text-sm text-gray-600">
                            {change.newChampion} defeated {change.oldChampion}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Event Poster - Only show if we have posterUrl */}
            {event.posterUrl && (
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <Image
                    src={event.posterUrl}
                    alt={`${event.name} poster`}
                    width={600}
                    height={900}
                    className="w-full h-auto rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className={`${colors.bg} ${colors.border} border`}>
              <CardHeader>
                <CardTitle className={`text-lg ${colors.accent}`}>
                  {isWWE ? 'Wrestling Legacy' : 'Fight Statistics'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {new Date(event.date).getFullYear()}
                  </p>
                  <p className="text-sm text-gray-600">Year</p>
                </div>
                
                {event.attendance && (
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">
                      #{Math.ceil(event.attendance / 1000)}k
                    </p>
                    <p className="text-sm text-gray-600">Attendance Tier</p>
                  </div>
                )}

                <div className="text-center">
                  <Badge className={colors.badge}>
                    {isWWE ? 'WWE PPV' : 'UFC Event'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Back to Flashback */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4">
                <Link href="/">
                  <Button className="w-full" variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Pay-Per-View Flashback
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
  } catch (error) {
    console.error('Error in EventDetailPage:', error);
    notFound();
  }
}
