import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft, TrendingUp, TrendingDown, Award } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Youngest vs Oldest WWE Champions in History | Birthday Champion Finder',
  description: 'Explore the age extremes of WWE Championship glory. From young phenoms like Brock Lesnar to seasoned veterans who proved age is just a number.',
  keywords: 'youngest WWE champion, oldest WWE champion, Brock Lesnar, Vince McMahon, wrestling age records',
};

const youngestChampions = [
  {
    rank: 1,
    name: 'Brock Lesnar',
    age: '25 years, 44 days',
    date: 'August 25, 2002',
    event: 'SummerSlam 2002',
    opponent: 'The Rock',
    context: 'The Next Big Thing became the youngest WWE Champion in history, defeating The Rock in his rookie year.',
    career: 'Former NCAA Division I heavyweight wrestling champion who transitioned to WWE and later UFC.'
  },
  {
    rank: 2,
    name: 'The Rock',
    age: '26 years, 118 days',
    date: 'November 15, 1998',
    event: 'Survivor Series 1998',
    opponent: 'Mankind',
    context: 'Rocky Maivia transformed into The Rock and won his first WWE Championship as part of The Corporation.',
    career: 'Third-generation wrestler who became Hollywood\'s highest-paid actor.'
  },
  {
    rank: 3,
    name: 'Randy Orton',
    age: '24 years, 116 days',
    date: 'August 30, 2004',
    event: 'SummerSlam 2004',
    opponent: 'Chris Benoit',
    context: 'The Legend Killer became the youngest World Heavyweight Champion, though not technically WWE Champion.',
    career: 'Third-generation superstar known as The Viper, with one of the longest careers in modern WWE.'
  },
  {
    rank: 4,
    name: 'Jeff Hardy',
    age: '31 years, 49 days',
    date: 'December 14, 2008',
    event: 'Armageddon 2008',
    opponent: 'Triple H & Edge',
    context: 'The Charismatic Enigma finally reached the top after years of tag team success with his brother Matt.',
    career: 'High-flying daredevil known for his extreme stunts and colorful face paint.'
  },
  {
    rank: 5,
    name: 'John Cena',
    age: '27 years, 254 days',
    date: 'April 3, 2005',
    event: 'WrestleMania 21',
    opponent: 'JBL',
    context: 'The Doctor of Thuganomics won his first WWE Championship and began his record-tying 16 championship reigns.',
    career: 'Rapper-turned-wrestler who became the face of WWE for over a decade.'
  }
];

const oldestChampions = [
  {
    rank: 1,
    name: 'Vince McMahon',
    age: '54 years, 21 days',
    date: 'September 14, 1999',
    event: 'SmackDown',
    opponent: 'Triple H',
    context: 'The WWE Chairman won the title in a shocking upset, though he vacated it the same night.',
    career: 'WWE owner and chairman who occasionally stepped into the ring for major storylines.'
  },
  {
    rank: 2,
    name: 'Hulk Hogan',
    age: '49 years, 91 days',
    date: 'April 21, 2002',
    event: 'Backlash 2002',
    opponent: 'Triple H',
    context: 'Hollywood Hogan\'s return to WWE culminated in one final championship reign during the brand split era.',
    career: 'The face of wrestling\'s golden era who helped WWE achieve mainstream success in the 1980s.'
  },
  {
    rank: 3,
    name: 'The Undertaker',
    age: '44 years, 282 days',
    date: 'September 23, 2007',
    event: 'Unforgiven 2007',
    opponent: 'Batista',
    context: 'The Deadman\'s final WWE Championship reign came during his American Badass phase.',
    career: 'The Phenom with an unmatched WrestleMania streak and supernatural character evolution.'
  },
  {
    rank: 4,
    name: 'Triple H',
    age: '43 years, 236 days',
    date: 'January 11, 2016',
    event: 'Raw',
    opponent: 'Roman Reigns',
    context: 'The Game won the vacant title in the Royal Rumble match, proving he could still compete at the highest level.',
    career: 'From Connecticut Blueblood to The Game to WWE executive, spanning multiple eras.'
  },
  {
    rank: 5,
    name: 'Batista',
    age: '41 years, 232 days',
    date: 'April 7, 2014',
    event: 'WrestleMania XXX',
    opponent: 'Randy Orton & Daniel Bryan',
    context: 'The Animal returned from Hollywood to win the Royal Rumble and compete for the title at WrestleMania.',
    career: 'Evolution member who became a main event star and successful Hollywood actor.'
  }
];

const ageStats = [
  { label: 'Average Age at First Title Win', value: '29.4 years', description: 'Based on all WWE Champions since 1963' },
  { label: 'Biggest Age Gap', value: '28 years', description: 'Between youngest (Lesnar) and oldest (McMahon)' },
  { label: 'Most Common Age Range', value: '28-32 years', description: 'Peak athletic and character development years' },
  { label: 'Youngest Era Average', value: 'Attitude Era', description: '27.8 years average age' }
];

export default function AgeRecords() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-pink-900 text-white py-16">
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
              <Award className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Youngest vs Oldest WWE Champions</h1>
              <p className="text-xl text-purple-100">From young phenoms to seasoned veterans - age extremes in championship glory</p>
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
                  In professional wrestling, championship success isn't bound by age. While most sports see athletes 
                  peak in their late twenties, WWE has crowned champions ranging from 25-year-old phenoms to 
                  54-year-old veterans, each bringing unique qualities to the role.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Young champions often bring athletic prowess and fresh energy, while older champions contribute 
                  experience, storytelling ability, and the wisdom that comes from years in the business. 
                  Both extremes have produced memorable reigns that defined different eras of WWE.
                </p>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <p className="text-purple-800 font-medium">
                    🏆 <strong>Fun Fact:</strong> The 28-year age gap between youngest champion Brock Lesnar (25) 
                    and oldest champion Vince McMahon (54) represents nearly three decades of WWE evolution!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Age Statistics */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Championship Age Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ageStats.map((stat, index) => (
                <Card key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-800 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-600">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Youngest Champions */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <TrendingDown className="h-8 w-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Youngest WWE Champions</h2>
            </div>
            
            <div className="space-y-6">
              {youngestChampions.map((champion) => (
                <Card key={champion.rank} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full text-white font-bold text-lg">
                          #{champion.rank}
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-gray-900">{champion.name}</CardTitle>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              {champion.age}
                            </Badge>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span className="text-sm">{champion.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Won at</div>
                        <div className="font-semibold text-gray-900">{champion.event}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-700 leading-relaxed mb-4">{champion.context}</p>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Defeated:</span> {champion.opponent}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Career Highlight</h4>
                        <p className="text-green-700 text-sm">{champion.career}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Oldest Champions */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <h2 className="text-3xl font-bold text-gray-900">Oldest WWE Champions</h2>
            </div>
            
            <div className="space-y-6">
              {oldestChampions.map((champion) => (
                <Card key={champion.rank} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full text-white font-bold text-lg">
                          #{champion.rank}
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-gray-900">{champion.name}</CardTitle>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline" className="bg-orange-50 text-orange-700">
                              {champion.age}
                            </Badge>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span className="text-sm">{champion.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Won at</div>
                        <div className="font-semibold text-gray-900">{champion.event}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-700 leading-relaxed mb-4">{champion.context}</p>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Defeated:</span> {champion.opponent}
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">Career Legacy</h4>
                        <p className="text-orange-700 text-sm">{champion.career}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

         

          {/* Age Analysis */}
          <div className="mt-16">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">The Age Factor in Championship Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-green-600" />
                      Advantages of Young Champions
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Athletic Peak:</strong> Superior physical conditioning and recovery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Fresh Appeal:</strong> New face that excites audiences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Long-term Investment:</strong> Years of potential storylines ahead</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Risk-taking:</strong> Willingness to attempt dangerous moves</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      Advantages of Veteran Champions
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Ring Psychology:</strong> Master storytelling and crowd manipulation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Established Credibility:</strong> Proven track record with fans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Mentorship Role:</strong> Can elevate younger talent through feuds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span><strong>Character Depth:</strong> Years of character development and evolution</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="font-semibold text-purple-800 mb-3">The Sweet Spot: Ages 28-32</h4>
                  <p className="text-purple-700 leading-relaxed">
                    Statistical analysis shows that most successful WWE Champions win their first title between 
                    ages 28-32. This range represents the perfect balance of athletic ability, character development, 
                    and audience connection. Champions like Stone Cold Steve Austin (32), John Cena (27), and 
                    The Rock (26) all won their first titles within or near this optimal range.
                  </p>
                </div>
              </CardContent>
            </Card>

            

          {/* Historical Context */}
          <div className="mt-16">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Age Trends Across WWE Eras</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Golden Era (1980s)</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-1">31.2 years</div>
                    <p className="text-sm text-gray-600">Average age - established stars like Hogan and Savage</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Attitude Era (1997-2002)</h4>
                    <div className="text-2xl font-bold text-red-600 mb-1">27.8 years</div>
                    <p className="text-sm text-gray-600">Youngest era - fresh faces like Rock and Austin</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Modern Era (2010s+)</h4>
                    <div className="text-2xl font-bold text-green-600 mb-1">29.6 years</div>
                    <p className="text-sm text-gray-600">Balanced approach - mix of youth and experience</p>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mt-6">
                  The Attitude Era's emphasis on younger champions reflected WWE's need to create new stars 
                  quickly during the Monday Night Wars. Today's WWE takes a more measured approach, 
                  often building champions over several years before their first title reign.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
