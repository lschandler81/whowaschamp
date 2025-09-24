import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, ArrowLeft, Building, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
        {/* Related Posts */}
        <section className="mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/blog/longest-reigns" className="block p-4 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
                Read about the longest WWE Championship reigns in history
              </Link>
              <Link href="/blog/most-championship-reigns" className="block p-4 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
                Discover who holds the most world championship reigns
              </Link>
              <Link href="/blog/age-records" className="block p-4 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
                Explore the youngest and oldest WWE champions
              </Link>
            </div>
          </div>
        </section>
        
export const metadata: Metadata = {
  title: 'Cities That Crowned the Most Champions | Birthday Champion Finder',
  description: 'Discover which cities have witnessed the most championship victories, from Madison Square Garden\'s legendary status to international wrestling capitals.',
  keywords: 'Madison Square Garden wrestling, championship cities, wrestling venues, WWE championship locations, wrestling history',
};

const championshipCities = [
  {
    rank: 1,
    city: 'New York City',
    venue: 'Madison Square Garden',
    championships: 47,
    period: '1963-Present',
    description: 'The "World\'s Most Famous Arena" has been the site of countless championship victories, from Bruno Sammartino\'s legendary reign to modern WrestleMania moments.',
    notableEvents: [
      'Bruno Sammartino\'s first WWE Championship (1963)',
      'Bob Backlund\'s marathon reign begins (1978)',
      'Multiple WrestleMania championship matches',
      'Monday Night Raw championship changes'
    ],
    significance: 'Wrestling\'s most prestigious venue and spiritual home'
  },
  {
    rank: 2,
    city: 'Chicago, Illinois',
    venue: 'Various Venues',
    championships: 23,
    period: '1980s-Present',
    description: 'The Windy City has been a hotbed for wrestling, hosting major championship changes across multiple promotions and eras.',
    notableEvents: [
      'CM Punk\'s emotional Money in the Bank 2011 victory',
      'Multiple WrestleMania and pay-per-view championships',
      'Historic Starrcade and WCW events',
      'AEW championship matches'
    ],
    significance: 'Wrestling\'s heartland with passionate, knowledgeable fans'
  },
  {
    rank: 3,
    city: 'Los Angeles, California',
    venue: 'Various Venues',
    championships: 19,
    period: '1980s-Present',
    description: 'The entertainment capital has hosted numerous championship victories, particularly during WrestleMania events and major pay-per-views.',
    notableEvents: [
      'WrestleMania championship matches',
      'SummerSlam title changes',
      'Hollywood Hogan\'s various championship victories',
      'Modern WWE championship matches'
    ],
    significance: 'Bridge between wrestling and mainstream entertainment'
  },
  {
    rank: 4,
    city: 'Tokyo, Japan',
    venue: 'Tokyo Dome & Korakuen Hall',
    championships: 16,
    period: '1987-Present',
    description: 'The spiritual home of Japanese wrestling, where IWGP Championships and international title matches have created legendary moments.',
    notableEvents: [
      'IWGP Heavyweight Championship matches',
      'International championship unification bouts',
      'New Japan Pro Wrestling\'s biggest events',
      'Cross-promotional championship matches'
    ],
    significance: 'Center of Japanese wrestling culture and technical excellence'
  },
  {
    rank: 5,
    city: 'Atlanta, Georgia',
    venue: 'Various Venues',
    championships: 14,
    period: '1990s-2000s',
    description: 'WCW\'s home base during the Monday Night Wars, Atlanta witnessed numerous championship changes during wrestling\'s most competitive era.',
    notableEvents: [
      'Monday Nitro championship changes',
      'WCW pay-per-view title matches',
      'nWo-related championship storylines',
      'Historic Starrcade events'
    ],
    significance: 'Epicenter of the Monday Night Wars and WCW\'s golden age'
  }
];

export default function ChampionshipCities() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-yellow-500 rounded-full">
              <MapPin className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Cities That Crowned the Most Champions</h1>
              <p className="text-xl text-green-100">The legendary venues where wrestling history was made</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="mb-12">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Certain cities and venues have become synonymous with championship glory in professional 
                  wrestling. These locations have witnessed the crowning of legends, the fall of dynasties, 
                  and the birth of new eras in sports entertainment.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  From the hallowed halls of Madison Square Garden to the electric atmosphere of the 
                  Tokyo Dome, these cities have provided the backdrop for wrestling\'s greatest moments.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Cities List */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Wrestling\'s Championship Capitals</h2>
            
            {championshipCities.map((city) => (
              <Card key={city.rank} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full text-white font-bold text-lg">
                        #{city.rank}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900">{city.city}</CardTitle>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {city.venue}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{city.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">{city.championships}</div>
                      <div className="text-sm text-gray-500">Championships</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">{city.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Notable Championship Events</h4>
                        <ul className="space-y-2">
                          {city.notableEvents.map((event, eventIndex) => (
                            <li key={eventIndex} className="flex items-start gap-2">
                              <Trophy className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{event}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Wrestling Significance</h4>
                        <p className="text-green-700 text-sm">{city.significance}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

         
        </div>
      </section>
    </div>
  );
}
