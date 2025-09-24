import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, ArrowLeft, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Most Controversial Championship Changes in Wrestling History | Birthday Champion Finder',
  description: 'Relive the most shocking and controversial championship changes that divided fans and changed wrestling forever, from the Montreal Screwjob to modern-day surprises.',
  keywords: 'Montreal Screwjob, controversial wrestling moments, WWE championship controversies, wrestling scandals, title changes',
};

const controversialChanges = [
  {
    rank: 1,
    title: 'The Montreal Screwjob',
    date: 'November 9, 1997',
    event: 'Survivor Series 1997',
    champion: 'Shawn Michaels',
    previousChampion: 'Bret Hart',
    location: 'Montreal, Quebec',
    controversy: 'Bret Hart was legitimately screwed out of the WWE Championship when referee Earl Hebner called for the bell during a Sharpshooter, despite Hart never submitting.',
    background: 'Hart was leaving for WCW and refused to lose the title in Canada. Vince McMahon, Shawn Michaels, and Triple H conspired to ensure the title stayed with WWE.',
    aftermath: 'Created real-life animosity, launched the Mr. McMahon character, and became wrestling\'s most infamous moment.',
    impact: 'Changed wrestling forever by blurring reality and storyline'
  },
  {
    rank: 2,
    title: 'The Fingerpoke of Doom',
    date: 'January 4, 1999',
    event: 'Monday Nitro',
    champion: 'Hulk Hogan',
    previousChampion: 'Kevin Nash',
    location: 'Atlanta, Georgia',
    controversy: 'Kevin Nash laid down for Hulk Hogan after a gentle finger poke to the chest, reuniting the nWo and shocking fans.',
    background: 'Designed to reunite the nWo factions, but fans felt cheated by the anticlimactic title change on free TV.',
    aftermath: 'Widely considered the beginning of WCW\'s decline, as fans lost faith in the product.',
    impact: 'Demonstrated how poor booking decisions can damage fan trust'
  },
  {
    rank: 3,
    title: 'David Arquette Wins WCW Championship',
    date: 'April 26, 2000',
    event: 'Thunder',
    champion: 'David Arquette',
    previousChampion: 'Jeff Jarrett',
    location: 'Syracuse, New York',
    controversy: 'Hollywood actor David Arquette, with no wrestling training, won the WCW World Heavyweight Championship as a publicity stunt.',
    background: 'Part of promoting the movie "Ready to Rumble," WCW put their top title on a celebrity.',
    aftermath: 'Arquette donated his earnings to families of deceased wrestlers, but the damage to WCW\'s credibility was done.',
    impact: 'Epitomized WCW\'s desperate attempts to gain mainstream attention'
  },
  {
    rank: 4,
    title: 'The Screwjob Reversal',
    date: 'December 29, 1998',
    event: 'Monday Night Raw',
    champion: 'Mankind',
    previousChampion: 'The Rock',
    location: 'Worcester, Massachusetts',
    controversy: 'Mankind won his first WWE Championship when referee Mike Chioda made a fast count, giving Mankind the victory.',
    background: 'Part of the ongoing Corporation storyline, designed to shock fans and create controversy.',
    aftermath: 'Led to one of the most emotional championship celebrations in WWE history.',
    impact: 'Showed how referee controversies could create compelling television'
  },
  {
    rank: 5,
    title: 'CM Punk\'s Pipe Bomb Aftermath',
    date: 'July 17, 2011',
    event: 'Money in the Bank 2011',
    champion: 'CM Punk',
    previousChampion: 'John Cena',
    location: 'Chicago, Illinois',
    controversy: 'CM Punk won the WWE Championship and "left" the company, taking the title with him in a worked-shoot storyline.',
    background: 'Punk\'s famous "pipe bomb" promo created a storyline where he threatened to leave WWE with their championship.',
    aftermath: 'Created one of the most compelling storylines of the modern era, blending reality with fiction.',
    impact: 'Pioneered the "reality era" of wrestling storytelling'
  }
];

export default function ControversialTitleChanges() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-900 via-red-800 to-pink-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-orange-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
          {/* Related Posts */}
          <section className="mt-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/blog/era-defining-reigns" className="block p-4 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
                  See era-defining championship reigns that changed wrestling
                </Link>
                <Link href="/blog/attitude-era" className="block p-4 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
                  Relive the champions of WWE’s Attitude Era
                </Link>
                <Link href="/blog/longest-reigns" className="block p-4 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
                  Read about the longest WWE Championship reigns in history
                </Link>
              </div>
            </div>
          </section>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-yellow-500 rounded-full">
              <AlertTriangle className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Most Controversial Championship Changes</h1>
              <p className="text-xl text-orange-100">The title changes that shocked fans and changed wrestling forever</p>
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
                  Professional wrestling thrives on drama, surprise, and emotional investment. While most 
                  championship changes follow predictable patterns, some title switches have shocked fans, 
                  divided audiences, and created lasting controversy that extends far beyond the ring.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  These controversial moments often blur the lines between reality and storyline, creating 
                  genuine emotions and reactions that remind us why wrestling can be so compelling—and 
                  sometimes so frustrating.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Controversial Changes List */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">The Most Shocking Title Changes</h2>
            
            {controversialChanges.map((change) => (
              <Card key={change.rank} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full text-white font-bold text-lg">
                        #{change.rank}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900">{change.title}</CardTitle>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline" className="bg-orange-50 text-orange-700">
                            {change.champion} defeats {change.previousChampion}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{change.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Event</div>
                      <div className="font-semibold text-gray-900">{change.event}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-orange-500" />
                        The Controversy
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{change.controversy}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-orange-800 mb-2">Background</h5>
                        <p className="text-orange-700 text-sm">{change.background}</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-red-800 mb-2">Aftermath</h5>
                        <p className="text-red-700 text-sm">{change.aftermath}</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <h5 className="font-semibold text-blue-800 mb-2">Long-term Impact</h5>
                      <p className="text-blue-700 text-sm">{change.impact}</p>
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
