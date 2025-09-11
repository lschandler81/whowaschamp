import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Calendar, ArrowLeft, Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wrestling Belt Design Evolution: From Classic to Modern | Birthday Champion Finder',
  description: 'Explore the fascinating evolution of wrestling championship belt designs, from the classic Winged Eagle to the modern WWE Championship and beyond.',
  keywords: 'WWE championship belt designs, Winged Eagle belt, Big Gold Belt, wrestling belt history, championship design evolution',
};

const beltDesigns = [
  {
    name: 'Winged Eagle Championship',
    period: '1988-1998',
    description: 'Widely considered the most iconic WWE Championship design, featuring a majestic eagle with spread wings. This belt represented the transition from the Golden Era to the Attitude Era.',
    champions: ['Randy Savage', 'Ultimate Warrior', 'Hulk Hogan', 'Bret Hart', 'Shawn Michaels'],
    significance: 'Became synonymous with WWE\'s rise to national prominence',
    designElements: 'Golden eagle centerpiece, red jewels, classic wrestling aesthetic'
  },
  {
    name: 'Big Gold Belt (WCW)',
    period: '1986-2001',
    description: 'The prestigious "Big Gold Belt" became the symbol of WCW and later the World Heavyweight Championship in WWE. Its classic design emphasized tradition and prestige.',
    champions: ['Ric Flair', 'Sting', 'Hollywood Hogan', 'Goldberg', 'Triple H'],
    significance: 'Represented the pinnacle of championship design and prestige',
    designElements: 'Large gold plates, world map centerpiece, traditional wrestling heritage'
  },
  {
    name: 'Attitude Era Championship',
    period: '1998-2002',
    description: 'Also known as the "Big Eagle," this design reflected the edgier Attitude Era with a larger, more aggressive-looking eagle and updated styling.',
    champions: ['Stone Cold Steve Austin', 'The Rock', 'Triple H', 'Chris Jericho'],
    significance: 'Perfectly captured the intensity and attitude of wrestling\'s most popular era',
    designElements: 'Larger eagle design, more aggressive styling, Attitude Era aesthetics'
  },
  {
    name: 'Undisputed Championship',
    period: '2002-2005',
    description: 'Created when Chris Jericho unified the WWE and WCW Championships, featuring a unique design that combined elements from both lineages.',
    champions: ['Chris Jericho', 'Triple H', 'Hulk Hogan', 'The Undertaker', 'Brock Lesnar'],
    significance: 'Represented the end of the Monday Night Wars and WWE\'s dominance',
    designElements: 'Unified design elements, larger center plate, modern WWE branding'
  },
  {
    name: 'Spinner Championship',
    period: '2005-2013',
    description: 'John Cena\'s personalized championship featuring a spinning WWE logo. Love it or hate it, this design defined the PG Era and Cena\'s dominance.',
    champions: ['John Cena', 'Edge', 'Randy Orton', 'CM Punk', 'The Rock'],
    significance: 'Reflected WWE\'s shift to mainstream, family-friendly entertainment',
    designElements: 'Spinning center logo, bling aesthetic, personalized design elements'
  },
  {
    name: 'Current WWE Championship',
    period: '2013-Present',
    description: 'The modern WWE Championship design balances tradition with contemporary aesthetics, featuring a prominent WWE logo and classic wrestling elements.',
    champions: ['Daniel Bryan', 'Randy Orton', 'Brock Lesnar', 'Roman Reigns', 'Cody Rhodes'],
    significance: 'Represents modern WWE\'s global reach and production values',
    designElements: 'Large WWE logo, traditional side plates, modern manufacturing techniques'
  }
];

export default function BeltDesignEvolution() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white py-16">
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
              <Palette className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Wrestling Belt Design Evolution</h1>
              <p className="text-xl text-purple-100">From classic craftsmanship to modern masterpieces</p>
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
                  Wrestling championship belts are more than just prizes—they're works of art, symbols of 
                  prestige, and physical representations of wrestling history. Each design tells a story 
                  about the era it represents, the company that created it, and the champions who carried it.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  From the classic craftsmanship of the Winged Eagle to the modern aesthetics of today's 
                  championships, belt designs have evolved alongside the wrestling industry itself.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Belt Designs */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Iconic Championship Designs Through the Decades</h2>
            
            {beltDesigns.map((belt, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-gray-900 mb-2">{belt.name}</CardTitle>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">
                          {belt.period}
                        </Badge>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-sm">{belt.designElements}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">{belt.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Notable Champions</h4>
                        <div className="flex flex-wrap gap-2">
                          {belt.champions.map((champion, championIndex) => (
                            <Badge key={championIndex} variant="secondary" className="text-xs">
                              {champion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">Historical Significance</h4>
                        <p className="text-purple-700 text-sm">{belt.significance}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AdSense Banner */}
          <div className="mt-16">
            <div className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
              <p className="text-gray-500 text-sm">Advertisement Space - 728x90 Banner</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}