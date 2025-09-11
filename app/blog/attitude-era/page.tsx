import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, ArrowLeft, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Champions of the Attitude Era (1997-2002) | Birthday Champion Finder',
  description: 'Relive the golden age of WWE with Stone Cold Steve Austin, The Rock, Triple H, and Mankind. Explore the champions who defined the Monday Night Wars.',
  keywords: 'attitude era, stone cold steve austin, the rock, triple h, mankind, monday night wars, WWE champions 1990s',
};

const attitudeEraChampions = [
  {
    name: 'Stone Cold Steve Austin',
    reigns: 6,
    totalDays: 529,
    firstReign: 'March 29, 1998',
    lastReign: 'April 1, 2001',
    signature: 'Austin 3:16',
    impact: 'The beer-drinking, boss-stunning anti-hero who became WWE\'s biggest star during the Monday Night Wars.',
    keyMoments: [
      'WrestleMania XIV victory over Shawn Michaels',
      'First "What?" chant',
      'Beer truck incident',
      'Stunning Mr. McMahon weekly'
    ]
  },
  {
    name: 'The Rock',
    reigns: 5,
    totalDays: 365,
    firstReign: 'November 15, 1998',
    lastReign: 'February 25, 2001',
    signature: 'The People\'s Champion',
    impact: 'The most electrifying man in sports entertainment, master of the microphone and crowd psychology.',
    keyMoments: [
      'Defeating Mankind at Survivor Series 1998',
      'The Rock Concert segments',
      'Hollywood Rock transformation',
      'Epic promos with "Finally, The Rock has come back..."'
    ]
  },
  {
    name: 'Triple H',
    reigns: 3,
    totalDays: 280,
    firstReign: 'August 23, 1999',
    lastReign: 'January 3, 2000',
    signature: 'The Game',
    impact: 'Evolved from Connecticut Blueblood to The Game, becoming one of the most hated heels of the era.',
    keyMoments: [
      'Turning on D-Generation X',
      'Marriage to Stephanie McMahon storyline',
      'Formation of The McMahon-Helmsley Faction',
      'Brutal matches with Mick Foley'
    ]
  },
  {
    name: 'Mankind/Mick Foley',
    reigns: 3,
    totalDays: 50,
    firstReign: 'December 29, 1998',
    lastReign: 'August 22, 1999',
    signature: 'Have a Nice Day!',
    impact: 'The hardcore legend who proved that heart and determination could overcome any obstacle.',
    keyMoments: [
      'Defeating The Rock on Raw with help from Stone Cold',
      'Hell in a Cell with The Undertaker',
      'This Is Your Life segment with The Rock',
      'Retirement speech that brought tears to fans\' eyes'
    ]
  },
  {
    name: 'The Undertaker',
    reigns: 3,
    totalDays: 126,
    firstReign: 'March 31, 1997',
    lastReign: 'May 23, 1999',
    signature: 'The Deadman',
    impact: 'Transitioned from supernatural character to American Badass, remaining a constant threat.',
    keyMoments: [
      'WrestleMania XIII victory over Sycho Sid',
      'First Hell in a Cell match with Shawn Michaels',
      'Ministry of Darkness leader',
      'Crucifying Stone Cold Steve Austin'
    ]
  },
  {
    name: 'Shawn Michaels',
    reigns: 1,
    totalDays: 231,
    firstReign: 'November 9, 1997',
    lastReign: 'March 29, 1998',
    signature: 'Mr. WrestleMania',
    impact: 'The Showstopper\'s final championship reign before his back injury forced early retirement.',
    keyMoments: [
      'Montreal Screwjob victory over Bret Hart',
      'D-Generation X formation and antics',
      'Lost smile promo',
      'Passing torch to Stone Cold at WrestleMania XIV'
    ]
  }
];

const attitudeEraStats = [
  { label: 'Total Title Changes', value: '47', description: 'More than any other 5-year period' },
  { label: 'Average Reign Length', value: '89 days', description: 'Much shorter than previous eras' },
  { label: 'Most Popular Champion', value: 'Stone Cold', description: 'Based on merchandise and ratings' },
  { label: 'Shortest Reign', value: '1 day', description: 'The Rock lost to Mankind the next night' }
];

export default function AttitudeEra() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-900 via-red-800 to-orange-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-red-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Champion Finder
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-yellow-500 rounded-full">
              <Zap className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Champions of the Attitude Era</h1>
              <p className="text-xl text-red-100">The superstars who defined wrestling's most explosive period (1997-2002)</p>
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
                  The Attitude Era (1997-2002) represents the most revolutionary period in WWE history. Born from 
                  the Monday Night Wars with WCW, this era saw WWE transform from family-friendly entertainment 
                  to edgy, adult-oriented programming that captured mainstream attention like never before.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Championship reigns became shorter and more frequent, reflecting the fast-paced storytelling 
                  and the need to keep audiences engaged in an increasingly competitive landscape. The champions 
                  of this era weren't just wrestlers—they were cultural icons who transcended sports entertainment.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-800 font-medium">
                    💡 <strong>Did you know?</strong> The Attitude Era saw 47 title changes in just 5 years, 
                    compared to only 12 changes in the previous 5 years of the "New Generation" era.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Era Statistics */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Attitude Era by the Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {attitudeEraStats.map((stat, index) => (
                <Card key={index} className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-800 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-600">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Champions List */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">The Attitude Era Champions</h2>
            
            {attitudeEraChampions.map((champion, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-gray-900 mb-2">{champion.name}</CardTitle>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-red-50 text-red-700">
                          {champion.signature}
                        </Badge>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{champion.reigns} reigns</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{champion.totalDays} total days</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">First Reign</div>
                      <div className="font-semibold text-gray-900">{champion.firstReign}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-6">{champion.impact}</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Moments & Storylines:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {champion.keyMoments.map((moment, momentIndex) => (
                        <div key={momentIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{moment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

         

          {/* Monday Night Wars Context */}
          <div className="mt-16">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-red-600" />
                  The Monday Night Wars Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  The competition with WCW Monday Nitro fundamentally changed how WWE presented its champions:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Before the Wars (1993-1997):</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Longer, more predictable championship reigns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Family-friendly, cartoon-like characters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Title changes mostly at pay-per-view events</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Clear-cut heroes vs. villains</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">During the Wars (1997-2002):</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Frequent title changes to create "must-see TV"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Edgy, realistic characters with complex motivations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Title changes on free TV to boost ratings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Anti-heroes and morally ambiguous champions</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h4 className="font-semibold text-orange-800 mb-3">The Ratings War Results:</h4>
                  <p className="text-orange-700 leading-relaxed">
                    WWE Raw's ratings peaked at 6.91 in May 1999, largely due to the unpredictable nature 
                    of championship storylines. The era's success proved that wrestling fans craved 
                    authentic characters and surprising plot twists over predictable good-vs-evil narratives.
                  </p>
                </div>
              </CardContent>
            </Card>

            </div>

          {/* Legacy Section */}
          <div className="mt-16">
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">The Attitude Era Legacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Attitude Era champions didn't just hold titles—they became household names who 
                  appeared on talk shows, starred in movies, and influenced popular culture. Stone Cold's 
                  "Austin 3:16" became a cultural phenomenon, The Rock launched a Hollywood career, 
                  and Triple H evolved into a corporate executive.
                </p>
                                <p className="text-gray-700 leading-relaxed">
                  While modern WWE has returned to longer championship reigns and more structured 
                  storytelling, the Attitude Era proved that wrestling could be appointment television 
                  when champions felt like larger-than-life personalities rather than scripted characters.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
