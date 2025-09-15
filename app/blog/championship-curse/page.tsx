import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, ArrowLeft, Zap, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Championship Curse: When Wrestling Glory Turns to Misfortune | Birthday Champion Finder',
  description: 'Explore the mysterious phenomenon where championship success sometimes leads to unexpected challenges, injuries, and career setbacks in professional wrestling.',
  keywords: 'wrestling championship curse, wrestling injuries, championship misfortune, wrestling superstitions',
};

const cursedChampions = [
  {
    name: 'CM Punk',
    championship: 'WWE Championship',
    reignPeriod: '2011-2013',
    curse: 'Career Burnout & Departure',
    details: 'Despite holding the WWE Championship for 434 days (longest modern reign), Punk became increasingly frustrated with his position in the company. His championship reign, while record-breaking, coincided with being overshadowed by part-time stars like The Rock and John Cena. Shortly after losing the title, Punk walked away from WWE entirely.',
    aftermath: 'Left WWE in 2014, pursued MMA career with mixed results, returned to wrestling in AEW in 2023.',
    severity: 'High'
  },
  {
    name: 'Daniel Bryan',
    championship: 'WWE Championship',
    reignPeriod: '2014',
    curse: 'Career-Threatening Injury',
    details: 'Bryan\'s emotional WrestleMania 30 victory and championship win was the culmination of the "Yes Movement." However, within months of winning the title, he suffered a severe neck injury that forced him to vacate the championship and eventually retire from in-ring competition.',
    aftermath: 'Forced retirement in 2016, cleared to return in 2018 after two years away from wrestling.',
    severity: 'Extreme'
  },
  {
    name: 'Edge',
    championship: 'WWE Championship',
    reignPeriod: '2006-2011',
    curse: 'Forced Early Retirement',
    details: 'Edge\'s multiple championship reigns were punctuated by recurring neck injuries. Despite being one of the most successful champions of the 2000s, his career was cut short when doctors discovered he had cervical spinal stenosis, forcing immediate retirement at age 37.',
    aftermath: 'Retired in 2011, made surprise return in 2020 after 9 years away.',
    severity: 'Extreme'
  },
  {
    name: 'Finn Bálor',
    championship: 'WWE Universal Championship',
    reignPeriod: '2016',
    curse: 'Immediate Injury',
    details: 'Bálor made history by becoming the first Universal Champion, but suffered a shoulder injury during his victory match at SummerSlam 2016. He was forced to vacate the title the very next night on Raw, holding it for less than 24 hours.',
    aftermath: 'Missed 6 months of action, never regained the Universal Championship.',
    severity: 'High'
  },
  {
    name: 'Batista',
    championship: 'World Heavyweight Championship',
    reignPeriod: '2005-2010',
    curse: 'Recurring Injuries',
    details: 'Despite multiple successful championship reigns, Batista\'s career was plagued by injuries during his championship runs. He suffered torn triceps, back injuries, and other ailments that often coincided with his title reigns.',
    aftermath: 'Multiple injury-related absences, early retirement from full-time wrestling.',
    severity: 'Medium'
  },
  {
    name: 'Brock Lesnar',
    championship: 'WWE Championship',
    reignPeriod: '2002-2004',
    curse: 'Career Dissatisfaction',
    details: 'Despite becoming the youngest WWE Champion in history, Lesnar grew disillusioned with the wrestling business during his championship reign. The pressure and travel schedule led to his decision to leave WWE at the peak of his success.',
    aftermath: 'Left WWE in 2004 to pursue NFL career, returned part-time in 2012.',
    severity: 'Medium'
  }
];

const curseTheories = [
  {
    theory: 'Increased Pressure & Scrutiny',
    explanation: 'Championship success brings heightened expectations, media attention, and pressure to perform at the highest level consistently.',
    examples: ['CM Punk\'s frustration with creative direction', 'Daniel Bryan\'s intense schedule leading to injury']
  },
  {
    theory: 'Target for Aggressive Wrestling',
    explanation: 'Champions often face more aggressive opponents trying to make their mark, leading to increased injury risk.',
    examples: ['Edge\'s neck injuries from high-impact matches', 'Finn Bálor\'s shoulder injury in championship match']
  },
  {
    theory: 'Overexposure & Burnout',
    explanation: 'Champions work more dates, longer matches, and face constant travel, leading to physical and mental exhaustion.',
    examples: ['Batista\'s recurring injuries during championship runs', 'Brock Lesnar\'s dissatisfaction with schedule']
  },
  {
    theory: 'Coincidence & Confirmation Bias',
    explanation: 'The "curse" may simply be selective memory - we remember the dramatic falls more than the successful reigns.',
    examples: ['Many champions have long, successful careers', 'Injuries happen to non-champions too']
  }
];

export default function ChampionshipCurse() {
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
              <AlertTriangle className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">The Championship Curse</h1>
              <p className="text-xl text-red-100">When wrestling glory turns to unexpected misfortune</p>
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
                <Link href="/blog/age-records" className="block p-4 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
                  Explore the youngest and oldest WWE champions
                </Link>
                <Link href="/blog/controversial-title-changes" className="block p-4 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
                  Revisit the most controversial title changes in wrestling history
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
                  In professional wrestling, winning a championship is supposed to be the pinnacle of success. 
                  However, some wrestlers have experienced an eerie pattern where their greatest triumphs 
                  are followed by unexpected challenges, career-threatening injuries, or personal setbacks.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Is there really a "championship curse," or is it simply the increased pressure and scrutiny 
                  that comes with being at the top? Let's examine some of the most notable cases where 
                  championship glory seemed to come with a heavy price.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-800 font-medium">
                    ⚠️ <strong>Note:</strong> While these patterns are intriguing, correlation doesn't imply 
                    causation. Many factors contribute to career challenges in professional wrestling.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cursed Champions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notable Cases of the "Curse"</h2>
            
            <div className="space-y-8">
              {cursedChampions.map((champion, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl sm:text-2xl text-gray-900 break-words">{champion.name}</CardTitle>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                          <Badge variant="outline" className="bg-red-50 text-red-700 text-xs">
                            {champion.championship}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">{champion.reignPeriod}</span>
                          </div>
                          <Badge 
                            variant={champion.severity === 'Extreme' ? 'destructive' : 
                                   champion.severity === 'High' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {champion.severity} Impact
                          </Badge>
                        </div>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <div className="text-lg font-bold text-red-600 break-words">{champion.curse}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">The Curse Manifests</h4>
                        <p className="text-gray-700 leading-relaxed">{champion.details}</p>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">Aftermath</h4>
                        <p className="text-orange-700 text-sm">{champion.aftermath}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

         

          {/* Theories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Theories Behind the Curse</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {curseTheories.map((theory, index) => (
                <Card key={index} className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-orange-600" />
                      {theory.theory}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{theory.explanation}</p>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Examples:</h5>
                      <ul className="space-y-1">
                        {theory.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-600">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div className="mt-16">
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Reality or Superstition?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  While the "championship curse" makes for compelling storytelling, it's important to remember 
                  that professional wrestling is an inherently dangerous profession. Injuries, burnout, and 
                  career challenges can happen to any performer, regardless of championship status.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  However, the increased pressure, schedule demands, and physical toll of being a champion 
                  may indeed contribute to these challenges. Champions work more dates, face tougher opponents, 
                  and carry the weight of company expectations.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Whether you believe in the curse or not, these stories remind us that success in wrestling, 
                  like in life, often comes with unexpected challenges. The true measure of a champion may 
                  not be avoiding the curse, but how they overcome it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
