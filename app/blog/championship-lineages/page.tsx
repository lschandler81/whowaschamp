import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, ArrowLeft, Crown, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Championship Lineages: The Evolution of Wrestling Titles | Birthday Champion Finder',
  description: 'Trace the complete history of wrestling\'s most prestigious championships from their inception to today. Explore design changes, key moments, and legendary champions.',
  keywords: 'WWE championship history, wrestling title lineage, championship evolution, wrestling belt history',
};

const championshipLineages = [
  {
    title: 'WWE Championship',
    established: '1963',
    originalName: 'WWWF World Heavyweight Championship',
    firstChampion: 'Buddy Rogers',
    keyMoments: [
      'Bruno Sammartino\'s legendary 2,803-day reign (1963-1971)',
      'Renamed to WWF Championship in 1979',
      'Hulk Hogan\'s Hulkamania era begins (1984)',
      'Stone Cold Steve Austin vs. The Rock rivalry (1998-2001)',
      'Renamed to WWE Championship in 2002',
      'John Cena\'s record-tying 16 championship reigns'
    ],
    designEvolution: [
      '1963-1971: Original WWWF design with globe centerpiece',
      '1971-1988: Updated design with larger center plate',
      '1988-1998: Winged Eagle - most iconic design',
      '1998-2002: Big Eagle/Attitude Era championship',
      '2002-2005: Undisputed Championship design',
      '2005-2013: Spinner belt during John Cena era',
      '2013-present: Current WWE Championship design'
    ],
    totalChampions: 54,
    longestReign: 'Bruno Sammartino (2,803 days)',
    shortestReign: 'André the Giant (1 minute)',
    currentChampion: 'Cody Rhodes'
  },
  {
    title: 'WWE Intercontinental Championship',
    established: '1979',
    originalName: 'WWE Intercontinental Heavyweight Championship',
    firstChampion: 'Pat Patterson',
    keyMoments: [
      'Pat Patterson declared first champion in tournament (1979)',
      'The Honky Tonk Man\'s record 454-day reign (1987-1988)',
      'Ultimate Warrior vs. Rick Rude classic feud (1989-1990)',
      'Ladder Match revolution with Shawn Michaels vs. Razor Ramon',
      'Chris Jericho\'s multiple reigns in Attitude Era',
      'Gunther\'s modern record-breaking reign (2022-present)'
    ],
    designEvolution: [
      '1979-1985: Original design with world map',
      '1985-1997: Classic oval design',
      '1997-2011: Attitude Era redesign',
      '2011-present: Current modern design'
    ],
    totalChampions: 89,
    longestReign: 'The Honky Tonk Man (454 days)',
    shortestReign: 'Dean Douglas (1 day)',
    currentChampion: 'Gunther'
  },
  {
    title: 'WCW World Heavyweight Championship',
    established: '1991',
    originalName: 'WCW World Heavyweight Championship',
    firstChampion: 'Ric Flair',
    keyMoments: [
      'Ric Flair brings NWA title to WCW (1991)',
      'Hulk Hogan\'s shocking heel turn and nWo formation (1996)',
      'Goldberg\'s incredible 173-match winning streak (1997-1998)',
      'Monday Night Wars peak with multiple title changes',
      'Booker T as final WCW Champion (2001)',
      'Title unified with WWE Championship at Vengeance 2001'
    ],
    designEvolution: [
      '1991-1994: Big Gold Belt design',
      '1994-1999: Modified WCW design',
      '1999-2001: Final WCW championship design'
    ],
    totalChampions: 32,
    longestReign: 'Hollywood Hogan (469 days)',
    shortestReign: 'David Arquette (12 days)',
    currentChampion: 'Defunct (unified in 2001)'
  }
];

export default function ChampionshipLineages() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-purple-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Champion Finder
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-yellow-500 rounded-full">
              <Crown className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Championship Lineages</h1>
              <p className="text-xl text-purple-100">Tracing the evolution of wrestling's most prestigious titles</p>
            </div>
          </div>
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
                <Link href="/blog/era-defining-reigns" className="block p-4 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
                  See era-defining championship reigns that changed wrestling
                </Link>
              </div>
            </div>
          </section>
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
                  Wrestling championships are more than just titles—they're the backbone of sports entertainment, 
                  carrying decades of history, tradition, and prestige. Each championship has its own unique 
                  lineage, evolving through different eras, design changes, and legendary champions.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  From the WWWF Championship's humble beginnings in 1963 to today's modern WWE Championship, 
                  these titles have witnessed the rise and fall of wrestling legends, the birth of new eras, 
                  and the evolution of sports entertainment itself.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Championship Lineages */}
          <div className="space-y-12">
            {championshipLineages.map((championship, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-gray-900 mb-2">{championship.title}</CardTitle>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">
                          Est. {championship.established}
                        </Badge>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Trophy className="h-4 w-4" />
                          <span className="text-sm">{championship.totalChampions} Champions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Basic Info */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Championship Origins</h4>
                        <p className="text-gray-700 text-sm mb-2">
                          <strong>Original Name:</strong> {championship.originalName}
                        </p>
                        <p className="text-gray-700 text-sm mb-2">
                          <strong>First Champion:</strong> {championship.firstChampion}
                        </p>
                        <p className="text-gray-700 text-sm mb-2">
                          <strong>Longest Reign:</strong> {championship.longestReign}
                        </p>
                        <p className="text-gray-700 text-sm">
                          <strong>Current Status:</strong> {championship.currentChampion}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Design Evolution</h4>
                        <div className="space-y-2">
                          {championship.designEvolution.map((design, designIndex) => (
                            <div key={designIndex} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{design}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Key Moments */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Moments in History</h4>
                      <div className="space-y-3">
                        {championship.keyMoments.map((moment, momentIndex) => (
                          <div key={momentIndex} className="bg-purple-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-700">{moment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

         

          {/* Legacy Section */}
          <div className="mt-16">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">The Legacy Continues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Each championship lineage tells the story of professional wrestling's evolution. 
                  From the territorial days of the 1960s to today's global entertainment empire, 
                  these titles have been the constant thread connecting generations of fans and performers.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  As wrestling continues to evolve, new chapters are being written in these storied 
                  lineages. Future champions will add their names to these prestigious lists, 
                  carrying forward the legacy while creating new moments that will be remembered for decades to come.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
