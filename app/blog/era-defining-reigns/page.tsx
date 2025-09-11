import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, ArrowLeft, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Era-Defining Championship Reigns That Changed Wrestling History | Birthday Champion Finder',
  description: 'Discover how certain dominant championship reigns shaped entire eras and changed the course of professional wrestling history forever.',
  keywords: 'era defining wrestling reigns, wrestling history, championship impact, wrestling eras, legendary champions',
};

const eraDefiningReigns = [
  {
    champion: 'Bruno Sammartino',
    championship: 'WWWF World Heavyweight Championship',
    reignPeriod: '1963-1971',
    reignLength: '2,803 days',
    era: 'The Foundation Era',
    impact: 'Established Wrestling as Legitimate Sport',
    description: 'Bruno\'s nearly 8-year reign established the WWWF as a legitimate wrestling territory and proved that a single champion could carry a company for years. His reign created the template for what a world champion should be.',
    keyChanges: [
      'Established the concept of a long-term, credible world champion',
      'Proved wrestling could draw consistent crowds with the right star',
      'Created the foundation for WWE\'s eventual national expansion',
      'Established Madison Square Garden as wrestling\'s premier venue'
    ],
    culturalImpact: 'Made wrestling respectable entertainment for families',
    lasting: 'His reign length record still stands today, over 50 years later',
    eraColor: 'from-blue-600 to-indigo-600'
  },
  {
    champion: 'Hulk Hogan',
    championship: 'WWF Championship',
    reignPeriod: '1984-1988',
    reignLength: '1,474 days',
    era: 'The Golden Era',
    impact: 'Mainstream Wrestling Explosion',
    description: 'Hogan\'s first WWF Championship reign launched "Hulkamania" and transformed wrestling from a regional attraction into a national phenomenon. His reign coincided with the Rock \'n\' Wrestling Connection and WrestleMania\'s creation.',
    keyChanges: [
      'Wrestling became mainstream entertainment',
      'Created the modern pay-per-view model with WrestleMania',
      'Established the superhero babyface archetype',
      'Launched wrestling into pop culture consciousness'
    ],
    culturalImpact: 'Wrestling became part of American pop culture',
    lasting: 'The template for wrestling\'s biggest stars was established',
    eraColor: 'from-yellow-500 to-orange-500'
  },
  {
    champion: 'Stone Cold Steve Austin',
    championship: 'WWE Championship',
    reignPeriod: '1998-1999',
    reignLength: '175 days (combined)',
    era: 'The Attitude Era',
    impact: 'Anti-Hero Revolution',
    description: 'Austin\'s championship reigns during the Monday Night Wars represented wrestling\'s shift from cartoon characters to realistic, edgy programming. His feuds with Mr. McMahon created wrestling\'s greatest storyline.',
    keyChanges: [
      'Wrestling became edgy, adult-oriented entertainment',
      'The anti-hero became more popular than traditional heroes',
      'Authority figure storylines became wrestling staples',
      'Wrestling achieved its highest mainstream popularity'
    ],
    culturalImpact: 'Wrestling reached its cultural peak with mainstream celebrities',
    lasting: 'The "Austin 3:16" phenomenon influenced wrestling promos forever',
    eraColor: 'from-red-600 to-red-800'
  },
  {
    champion: 'The Rock',
    championship: 'WWE Championship',
    reignPeriod: '1998-2002',
    reignLength: '365 days (combined)',
    era: 'The Attitude Era',
    impact: 'Charisma Revolution',
    description: 'The Rock\'s multiple championship reigns showcased the power of charisma and mic skills. His ability to connect with audiences while transitioning between heel and face roles redefined what a champion could be.',
    keyChanges: [
      'Proved charisma could overcome traditional wrestling limitations',
      'Established the blueprint for crossover entertainment success',
      'Showed champions could be both serious competitors and entertainers',
      'Created the modern concept of "sports entertainment"'
    ],
    culturalImpact: 'Bridged wrestling and Hollywood entertainment',
    lasting: 'His promo style influenced a generation of wrestlers',
    eraColor: 'from-purple-600 to-pink-600'
  },
  {
    champion: 'John Cena',
    championship: 'WWE Championship',
    reignPeriod: '2005-2017',
    reignLength: '1,254 days (combined)',
    era: 'The PG Era',
    impact: 'Family-Friendly Renaissance',
    description: 'Cena\'s record-tying 16 championship reigns defined WWE\'s return to family-friendly programming. His "Never Give Up" character became the face of WWE for over a decade, proving traditional heroes could still draw.',
    keyChanges: [
      'Wrestling returned to family-friendly programming',
      'Established the modern "face of the company" role',
      'Proved traditional babyfaces could still be successful',
      'Created the template for modern WWE storytelling'
    ],
    culturalImpact: 'Made wrestling safe for corporate sponsors and mainstream acceptance',
    lasting: 'His work ethic and character became the WWE standard',
    eraColor: 'from-green-600 to-blue-600'
  },
  {
    champion: 'CM Punk',
    championship: 'WWE Championship',
    reignPeriod: '2011-2013',
    reignLength: '434 days',
    era: 'The Reality Era',
    impact: 'Authenticity Revolution',
    description: 'Punk\'s 434-day reign, sparked by his famous "pipe bomb" promo, ushered in an era where the lines between reality and storyline blurred. His reign proved that authentic characters could still captivate audiences.',
    keyChanges: [
      'Blurred the lines between reality and kayfabe',
      'Proved "indie" wrestlers could be main event stars',
      'Established social media as a crucial wrestling platform',
      'Created demand for more authentic, less scripted content'
    ],
    culturalImpact: 'Wrestling fans began demanding more realistic storylines',
    lasting: 'His influence on modern wrestling storytelling is still felt today',
    eraColor: 'from-gray-600 to-black'
  },
  {
    champion: 'Roman Reigns',
    championship: 'WWE Universal Championship',
    reignPeriod: '2020-2023',
    reignLength: '1,316 days',
    era: 'The Tribal Chief Era',
    impact: 'Character Evolution Mastery',
    description: 'Reigns\' "Tribal Chief" character and record-breaking Universal Championship reign showed how a struggling babyface could be transformed into a compelling heel. His reign redefined modern championship booking.',
    keyChanges: [
      'Proved character evolution could save a struggling star',
      'Established part-time champions as viable in modern wrestling',
      'Created a new template for dominant heel champions',
      'Showed how family storylines could enhance wrestling narratives'
    ],
    culturalImpact: 'Demonstrated wrestling\'s ability to reinvent established stars',
    lasting: 'His character work influenced how WWE approaches long-term storytelling',
    eraColor: 'from-blue-800 to-purple-800'
  }
];

const eraImpacts = [
  {
    category: 'Business Model Changes',
    description: 'How championship reigns altered wrestling\'s business approach',
    examples: [
      'Bruno Sammartino proved long-term champions could sustain business',
      'Hulk Hogan showed champions could drive mainstream media attention',
      'Stone Cold demonstrated how controversy could boost ratings'
    ]
  },
  {
    category: 'Character Archetypes',
    description: 'New types of champions that influenced future generations',
    examples: [
      'The credible athlete (Bruno Sammartino)',
      'The larger-than-life superhero (Hulk Hogan)',
      'The rebellious anti-hero (Stone Cold Steve Austin)'
    ]
  },
  {
    category: 'Storytelling Evolution',
    description: 'How these reigns changed wrestling narrative structure',
    examples: [
      'Authority vs. wrestler storylines became standard',
      'Reality-based storylines gained prominence',
      'Character evolution became more sophisticated'
    ]
  }
];

export default function EraDefiningReigns() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-900 via-red-800 to-pink-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-orange-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Champion Finder
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-yellow-500 rounded-full">
              <TrendingUp className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Era-Defining Championship Reigns</h1>
              <p className="text-xl text-orange-100">How certain champions shaped entire eras of wrestling history</p>
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
                  Throughout wrestling history, certain championship reigns have transcended individual 
                  success to define entire eras of the sport. These weren't just title runs—they were 
                  cultural phenomena that changed how wrestling was perceived, presented, and consumed.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  From Bruno Sammartino's foundation-laying reign in the 1960s to Roman Reigns' 
                  character-redefining run in the 2020s, these champions didn't just hold titles—they 
                  shaped the very DNA of professional wrestling for generations to come.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                  <p className="text-orange-800 font-medium">
                    🏆 <strong>Key Insight:</strong> Era-defining reigns often coincide with major 
                    cultural shifts, technological advances, or business model changes in wrestling.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Championships Define Eras</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eraImpacts.map((impact, index) => (
                <Card key={index} className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-orange-600" />
                      {impact.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 text-sm">{impact.description}</p>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2 text-sm">Examples:</h5>
                      <ul className="space-y-1">
                        {impact.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-xs text-gray-600">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Era-Defining Reigns */}
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">The Champions Who Changed Everything</h2>
            
            {eraDefiningReigns.map((reign, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-gray-900 mb-2">{reign.champion}</CardTitle>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-orange-50 text-orange-700">
                          {reign.championship}
                        </Badge>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{reign.reignPeriod}</span>
                        </div>
                        <Badge className={`bg-gradient-to-r ${reign.eraColor} text-white`}>
                          {reign.era}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">{reign.reignLength}</div>
                      <div className="text-sm text-gray-500">Reign Length</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                        Era-Defining Impact: {reign.impact}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{reign.description}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Key Changes Introduced:</h5>
                        <div className="space-y-2">
                          {reign.keyChanges.map((change, changeIndex) => (
                            <div key={changeIndex} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{change}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-800 mb-2">Cultural Impact</h5>
                          <p className="text-blue-700 text-sm">{reign.culturalImpact}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-green-800 mb-2">Lasting Legacy</h5>
                          <p className="text-green-700 text-sm">{reign.lasting}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

         

          {/* Timeline Visualization */}
          <div className="mt-16">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Wrestling Era Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                    {eraDefiningReigns.map((reign, index) => (
                      <div key={index} className="relative flex items-center gap-4 pb-6">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${reign.eraColor} flex items-center justify-center text-white text-sm font-bold z-10`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{reign.era}</h4>
                          <p className="text-sm text-gray-600">{reign.champion} • {reign.reignPeriod}</p>
                          <p className="text-xs text-gray-500 mt-1">{reign.impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            
          {/* Conclusion */}
          <div className="mt-16">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">The Power of Championship Legacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These era-defining championship reigns demonstrate that the greatest champions don't 
                  just win titles—they transform the entire landscape of professional wrestling. Each 
                  of these reigns coincided with major shifts in how wrestling was presented, consumed, 
                  and understood by audiences.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  From Bruno Sammartino's establishment of wrestling as legitimate entertainment to 
                  Roman Reigns' demonstration of character evolution mastery, these champions proved 
                  that the right person with the right character at the right time can change everything.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  As wrestling continues to evolve, future champions will undoubtedly create new eras 
                  and redefine what it means to be a champion. The question isn't whether another 
                  era-defining reign will come—it's who will be the next champion to change wrestling forever.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>      </section>
    </div>
  );
}