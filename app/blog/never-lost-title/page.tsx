import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Calendar, ArrowLeft, Crown, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Champions Who Never Lost Their Titles | Birthday Champion Finder',
  description: 'Meet the wrestling champions who vacated, retired, or left while still holding gold - never technically losing their titles in the ring.',
  keywords: 'wrestling champions never lost title, vacated championships, retired champions, wrestling legends',
};

const neverLostChampions = [
  {
    name: 'Bruno Sammartino',
    championship: 'WWWF World Heavyweight Championship',
    reignPeriod: '1963-1971',
    reignLength: '2,803 days',
    reason: 'Voluntarily Relinquished',
    circumstances: 'After nearly 8 years as champion, Bruno chose to step down from the championship to take a break from the grueling schedule. He was never defeated for the title - instead, he lost it to Ivan Koloff in what many consider a controversial decision that ended his legendary reign.',
    aftermath: 'Regained the title in 1973 for another 1,237-day reign',
    legacy: 'Longest championship reign in WWE history',
    category: 'Legendary'
  },
  {
    name: 'CM Punk',
    championship: 'WWE Championship',
    reignPeriod: '2011-2013',
    reignLength: '434 days',
    reason: 'Left Company While Champion',
    circumstances: 'Punk held the WWE Championship for 434 days (longest modern reign) but lost it to The Rock at Royal Rumble 2013. However, his frustration with WWE\'s creative direction led him to walk away from the company in January 2014, effectively ending his career while still at the top.',
    aftermath: 'Stayed away from wrestling for nearly a decade before returning to AEW',
    legacy: 'Longest WWE Championship reign of the modern era',
    category: 'Controversial'
  },
  {
    name: 'Daniel Bryan',
    championship: 'WWE Championship',
    reignPeriod: '2014',
    reignLength: '64 days',
    reason: 'Injury Forced Vacation',
    circumstances: 'Bryan\'s emotional WrestleMania 30 victory was short-lived due to a neck injury that required surgery. Rather than lose the title in a match, he was forced to vacate it due to medical concerns, never being defeated for the championship.',
    aftermath: 'Forced into retirement for 2 years before medical clearance',
    legacy: 'The "Yes Movement" culmination at WrestleMania 30',
    category: 'Medical'
  },
  {
    name: 'Edge',
    championship: 'World Heavyweight Championship',
    reignPeriod: '2011',
    reignLength: '69 days',
    reason: 'Career-Ending Injury',
    circumstances: 'Edge was forced to retire immediately after WrestleMania 27 due to cervical spinal stenosis. He vacated the World Heavyweight Championship on the Raw after WrestleMania, never losing it in competition.',
    aftermath: 'Retired for 9 years before surprise return in 2020',
    legacy: 'One of the greatest champions of the Ruthless Aggression Era',
    category: 'Medical'
  },
  {
    name: 'Shawn Michaels',
    championship: 'WWE Championship',
    reignPeriod: '1997-1998',
    reignLength: '231 days',
    reason: 'Back Injury Retirement',
    circumstances: 'After his legendary match with The Undertaker at WrestleMania XIV, Michaels was forced to vacate the WWE Championship due to a severe back injury. He "lost his smile" and retired from active competition.',
    aftermath: 'Retired for 4 years before returning in 2002',
    legacy: 'Mr. WrestleMania and one of the greatest of all time',
    category: 'Medical'
  },
  {
    name: 'Finn Bálor',
    championship: 'WWE Universal Championship',
    reignPeriod: '2016',
    reignLength: '1 day',
    reason: 'Injury During Victory',
    circumstances: 'Bálor became the first Universal Champion at SummerSlam 2016 but suffered a shoulder injury during the match. He was forced to vacate the title the very next night on Raw, technically never losing it in a subsequent match.',
    aftermath: 'Missed 6 months, never regained the Universal Championship',
    legacy: 'First Universal Champion in WWE history',
    category: 'Medical'
  },
  {
    name: 'The Ultimate Warrior',
    championship: 'WWE Championship',
    reignPeriod: '1990',
    reignLength: '293 days',
    reason: 'Contract Dispute',
    circumstances: 'After defeating Hulk Hogan at WrestleMania VI, Warrior held the title for nearly a year. However, he lost it to Sgt. Slaughter at Royal Rumble 1991, but later had contract disputes that led to his departure while still being considered a top champion.',
    aftermath: 'Left WWE multiple times due to various disputes',
    legacy: 'Iconic WrestleMania VI victory over Hulk Hogan',
    category: 'Controversial'
  }
];

const reasonCategories = [
  {
    category: 'Medical Reasons',
    description: 'Champions forced to vacate due to injuries or health concerns',
    count: 4,
    examples: ['Daniel Bryan', 'Edge', 'Shawn Michaels', 'Finn Bálor']
  },
  {
    category: 'Voluntary Departure',
    description: 'Champions who chose to step away while still holding the title',
    count: 2,
    examples: ['Bruno Sammartino', 'CM Punk']
  },
  {
    category: 'Contract Disputes',
    description: 'Champions who left due to business disagreements',
    count: 1,
    examples: ['The Ultimate Warrior']
  }
];

export default function NeverLostTitle() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-indigo-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Champion Finder
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-yellow-500 rounded-full">
              <Shield className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Champions Who Never Lost Their Titles</h1>
              <p className="text-xl text-indigo-100">Legends who vacated, retired, or left while still holding gold</p>
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
                  In professional wrestling, losing a championship is typically part of the story - 
                  a dramatic moment where one champion falls and another rises. However, some of wrestling's 
                  most legendary champions never experienced that defeat. Instead, they vacated their titles 
                  due to injury, retirement, or other circumstances.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  These champions hold a unique place in wrestling history. Their reigns ended not with 
                  the traditional "passing of the torch" but with circumstances beyond their control, 
                  leaving fans to wonder "what if?" and preserving their championship legacy in a different way.
                </p>
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
                  <p className="text-indigo-800 font-medium">
                    🏆 <strong>Interesting Fact:</strong> Some of wrestling's most memorable championship 
                    reigns ended not with a loss, but with a champion walking away undefeated.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Reasons for Never Losing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reasonCategories.map((category, index) => (
                <Card key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-indigo-600 mb-2">{category.count}</div>
                    <div className="text-sm font-medium text-gray-800 mb-2">{category.category}</div>
                    <div className="text-xs text-gray-600 mb-3">{category.description}</div>
                    <div className="text-xs text-indigo-600">
                      {category.examples.join(', ')}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Champions List */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">The Undefeated Champions</h2>
            
            {neverLostChampions.map((champion, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full text-white font-bold text-lg">
                        <Crown className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900">{champion.name}</CardTitle>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                            {champion.championship}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{champion.reignPeriod}</span>
                          </div>
                          <Badge 
                            variant={champion.category === 'Medical' ? 'destructive' : 
                                   champion.category === 'Controversial' ? 'default' : 'secondary'}
                          >
                            {champion.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-indigo-600">{champion.reignLength}</div>
                      <div className="text-sm text-gray-500">Reign Length</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Why They Never Lost: {champion.reason}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{champion.circumstances}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-green-800 mb-2">What Happened Next</h5>
                        <p className="text-green-700 text-sm">{champion.aftermath}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-blue-800 mb-2">Legacy</h5>
                        <p className="text-blue-700 text-sm">{champion.legacy}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          

          {/* Analysis Section */}
          <div className="mt-16">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">The Psychology of Never Losing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Champions who never lost their titles occupy a unique psychological space in wrestling lore. 
                  Unlike traditional championship changes that provide closure and narrative completion, 
                  these reigns end with questions and "what ifs."
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Advantages of Never Losing</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Preserves the champion's mystique and aura</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Creates legendary status through unfinished business</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Generates long-term fan interest and speculation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Allows for dramatic comeback storylines</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">The Downside</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Lacks traditional storytelling closure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Deprives another wrestler of a career-defining victory</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Can leave storylines feeling incomplete</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>May create unrealistic expectations for returns</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>

          {/* Conclusion */}
          <div className="mt-16">
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">The Eternal Champions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These champions who never lost their titles represent some of wrestling's most compelling 
                  "what if" scenarios. Their reigns ended not with defeat but with circumstances that 
                  preserved their championship legacy in amber, forever undefeated.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Whether through injury, retirement, or departure, these wrestlers achieved something 
                  rare in professional wrestling: they left while still on top. Their stories remind us 
                  that sometimes the most memorable endings are the ones that never truly end at all.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}