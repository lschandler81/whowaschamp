import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top 10 Longest WWE Championship Reigns in History | Birthday Champion Finder',
  description: 'Discover the legendary WWE Champions who held the title for years, not months. From Bruno Sammartino\'s record 2,803-day reign to modern marathon champions.',
  keywords: 'longest WWE championship reigns, Bruno Sammartino, WWE history, championship records, wrestling history',
};

const longestReigns = [
  {
    rank: 1,
    name: 'Bruno Sammartino',
    days: 2803,
    startDate: 'May 17, 1963',
    endDate: 'January 18, 1971',
    years: '7 years, 8 months',
    notes: 'The longest single reign in WWE history. Bruno was the face of WWWF during its early expansion.',
    era: '1960s-70s',
    lostTo: 'Ivan Koloff'
  },
  {
    rank: 2,
    name: 'Hulk Hogan',
    days: 1474,
    startDate: 'January 23, 1984',
    endDate: 'February 5, 1988',
    years: '4 years, 2 weeks',
    notes: 'The reign that launched Hulkamania and made WWE a national phenomenon.',
    era: '1980s',
    lostTo: 'André the Giant'
  },
  {
    rank: 3,
    name: 'Bob Backlund',
    days: 2135,
    startDate: 'February 20, 1978',
    endDate: 'December 26, 1983',
    years: '5 years, 10 months',
    notes: 'The All-American hero who bridged the gap between Bruno and Hulk Hogan.',
    era: '1970s-80s',
    lostTo: 'The Iron Sheik'
  },
  {
    rank: 4,
    name: 'John Cena',
    days: 380,
    startDate: 'April 3, 2005',
    endDate: 'January 8, 2006',
    years: '1 year, 3 months',
    notes: 'Cena\'s first major championship reign that established him as the face of WWE.',
    era: '2000s',
    lostTo: 'Edge'
  },
  {
    rank: 5,
    name: 'CM Punk',
    days: 434,
    startDate: 'November 20, 2011',
    endDate: 'January 27, 2013',
    years: '1 year, 2 months',
    notes: 'The longest reign of the modern era, featuring the famous "pipe bomb" era.',
    era: '2010s',
    lostTo: 'The Rock'
  },
  {
    rank: 6,
    name: 'Pedro Morales',
    days: 1027,
    startDate: 'February 8, 1971',
    endDate: 'December 1, 1973',
    years: '2 years, 9 months',
    notes: 'The first Latino WWE Champion, hugely popular in New York\'s Puerto Rican community.',
    era: '1970s',
    lostTo: 'Stan Stasiak'
  },
  {
    rank: 7,
    name: 'Roman Reigns',
    days: 1316,
    startDate: 'August 30, 2020',
    endDate: 'April 2, 2023',
    years: '2 years, 7 months',
    notes: 'The "Tribal Chief" era that redefined Roman as WWE\'s top heel.',
    era: '2020s',
    lostTo: 'Cody Rhodes'
  },
  {
    rank: 8,
    name: 'Diesel',
    days: 358,
    startDate: 'November 26, 1994',
    endDate: 'November 19, 1995',
    years: '11 months, 3 weeks',
    notes: 'Kevin Nash\'s reign during WWE\'s transition from the Golden Era to Attitude Era.',
    era: '1990s',
    lostTo: 'Bret Hart'
  },
  {
    rank: 9,
    name: 'The Rock',
    days: 119,
    startDate: 'August 30, 1999',
    endDate: 'October 17, 1999',
    years: '3 months, 2 weeks',
    notes: 'The People\'s Champion during the height of the Attitude Era.',
    era: '1990s',
    lostTo: 'Triple H'
  },
  {
    rank: 10,
    name: 'Brock Lesnar',
    days: 504,
    startDate: 'August 17, 2014',
    endDate: 'March 29, 2015',
    years: '1 year, 7 months',
    notes: 'The Beast\'s dominant reign after ending The Undertaker\'s WrestleMania streak.',
    era: '2010s',
    lostTo: 'Roman Reigns'
  }
];

export default function LongestReigns() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Champion Finder
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-yellow-500 rounded-full">
              <Trophy className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Top 10 Longest WWE Championship Reigns</h1>
              <p className="text-xl text-blue-100">The champions who held the belt for years, not months</p>
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
                  In the world of professional wrestling, championship reigns are measured not just in victories, 
                  but in time. While modern WWE often sees title changes every few months, there was an era when 
                  champions held their belts for years, becoming true icons of their generation.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  From Bruno Sammartino's legendary 2,803-day reign that helped establish WWE as a wrestling 
                  powerhouse, to more recent marathon reigns like CM Punk's 434-day run, these champions 
                  defined entire eras of sports entertainment.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Championship Reigns List */}
          <div className="space-y-6">
            {longestReigns.map((reign) => (
              <Card key={reign.rank} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full text-white font-bold text-lg">
                        #{reign.rank}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900">{reign.name}</CardTitle>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {reign.era}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span className="font-semibold">{reign.days} days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{reign.years}</div>
                      <div className="text-sm text-gray-500">Total Reign</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-500">Won Title:</span>
                        <span className="font-medium">{reign.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-gray-500">Lost Title:</span>
                        <span className="font-medium">{reign.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-500">Lost to:</span>
                        <span className="font-medium">{reign.lostTo}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 leading-relaxed">{reign.notes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Fun Facts Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Championship Reign Facts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2,803</div>
                  <div className="text-sm text-gray-600">Days in Bruno's longest reign</div>
                  <div className="text-xs text-gray-500 mt-1">Nearly 8 years!</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">1970s</div>
                  <div className="text-sm text-gray-600">Era with longest average reigns</div>
                  <div className="text-xs text-gray-500 mt-1">Champions were built to last</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">434</div>
                  <div className="text-sm text-gray-600">Days in CM Punk's modern record</div>
                  <div className="text-xs text-gray-500 mt-1">Longest reign since 1988</div>
                </CardContent>
              </Card>
            </div>
          </div>

         
          {/* Historical Context */}
          <div className="mt-16">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Why Were Early Reigns So Long?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The era of ultra-long championship reigns (1960s-1980s) was driven by several factors:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Regional Territory System:</strong> Champions needed to tour multiple territories, requiring stable, long-term titleholders</li>
                  <li><strong>Limited TV Exposure:</strong> Without weekly television, title changes were rare special events</li>
                  <li><strong>Building Credibility:</strong> Long reigns established champions as legitimate fighters, not entertainment characters</li>
                  <li><strong>House Show Business:</strong> Consistent champions drew crowds to live events across the country</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Today's WWE operates differently, with weekly television demanding more frequent storyline changes 
                  and title switches to maintain viewer interest. However, when modern champions do achieve 
                  long reigns (like CM Punk or Roman Reigns), they're celebrated as throwbacks to wrestling's golden age.
                </p>
              </CardContent>
            </Card>

           
          </div>
        </div>
      </section>
    </div>
  );
}