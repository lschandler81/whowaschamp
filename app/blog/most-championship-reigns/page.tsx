import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, ArrowLeft, Crown, Award, Users } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Most Championship Reigns of All Time | Birthday Champion Finder',
  description: 'Discover which wrestling legends hold the record for most championship reigns, from Ric Flair\'s legendary 16 world titles to John Cena\'s record-tying achievements.',
  keywords: 'most WWE championships, Ric Flair 16 time champion, John Cena championships, wrestling records, multiple time champions',
};

const mostReigns = [
  {
    rank: 1,
    name: 'Ric Flair',
    totalReigns: 16,
    championships: 'NWA/WCW/WWE World Championships',
    period: '1981-2008',
    signature: 'WOOO! To be the man, you gotta beat the man!',
    description: 'The Nature Boy\'s 16 recognized world championship reigns span three decades and multiple promotions. His flamboyant lifestyle, incredible mic work, and technical wrestling ability made him the measuring stick for all future champions.',
    breakdown: [
      '8 NWA World Heavyweight Championships',
      '6 WCW World Heavyweight Championships', 
      '2 WWE Championships'
    ]
  },
  {
    rank: 2,
    name: 'John Cena',
    totalReigns: 16,
    championships: 'WWE/World Heavyweight Championships',
    period: '2005-2017',
    signature: 'You Can\'t See Me',
    description: 'Cena tied Ric Flair\'s record with his 16th world championship victory at Royal Rumble 2017. His "Never Give Up" attitude and incredible work ethic made him the face of WWE for over a decade.',
    breakdown: [
      '13 WWE Championships',
      '3 World Heavyweight Championships'
    ]
  },
  {
    rank: 3,
    name: 'Randy Orton',
    totalReigns: 14,
    championships: 'WWE/World Heavyweight Championships',
    period: '2004-2020',
    signature: 'The Viper',
    description: 'The Legend Killer turned into a legend himself with 14 world championship reigns. His evolution from young upstart to seasoned veteran showcases incredible longevity.',
    breakdown: [
      '10 WWE Championships',
      '4 World Heavyweight Championships'
    ]
  },
  {
    rank: 4,
    name: 'Triple H',
    totalReigns: 14,
    championships: 'WWE/World Heavyweight Championships',
    period: '1999-2016',
    signature: 'The Game',
    description: 'From Connecticut Blueblood to The Game to WWE executive, Triple H\'s 14 world title reigns span multiple character evolutions and wrestling eras.',
    breakdown: [
      '9 WWE Championships',
      '5 World Heavyweight Championships'
    ]
  },
  {
    rank: 5,
    name: 'Hulk Hogan',
    totalReigns: 12,
    championships: 'WWF/WCW World Championships',
    period: '1984-2002',
    signature: 'Whatcha gonna do?',
    description: 'The face of wrestling\'s golden era, Hogan\'s 12 world championship reigns defined two different decades and promotions, from Hulkamania to the nWo.',
    breakdown: [
      '6 WWE Championships',
      '6 WCW World Heavyweight Championships'
    ]
  }
];

export default function MostChampionshipReigns() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-900 via-amber-800 to-orange-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-yellow-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Champion Finder
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-yellow-500 rounded-full">
              <Crown className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Most Championship Reigns of All Time</h1>
              <p className="text-xl text-yellow-100">The legends who captured gold again and again throughout their careers</p>
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
                  In professional wrestling, winning a world championship once is a career-defining achievement. 
                  Winning it multiple times? That's the mark of true greatness. The wrestlers on this list didn't 
                  just capture lightning in a bottle once—they did it repeatedly, proving their worth time and 
                  again in different eras, against different opponents, and often in different promotions.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  These multiple-time champions represent the elite of professional wrestling, combining longevity, 
                  adaptability, and star power to remain relevant across decades of change in the industry.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Champions List */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">The Multi-Time Champions</h2>
            
            {mostReigns.map((champion) => (
              <Card key={champion.rank} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full text-white font-bold text-lg">
                        #{champion.rank}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900">{champion.name}</CardTitle>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            {champion.signature}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{champion.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-yellow-600">{champion.totalReigns}</div>
                      <div className="text-sm text-gray-500">World Championships</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-700 leading-relaxed mb-4">{champion.description}</p>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Championships:</span> {champion.championships}
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Championship Breakdown</h4>
                      <ul className="space-y-1">
                        {champion.breakdown.map((item, index) => (
                          <li key={index} className="text-yellow-700 text-sm flex items-center gap-2">
                            <Trophy className="h-3 w-3" />
                            {item}
                          </li>
                        ))}
                      </ul>
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