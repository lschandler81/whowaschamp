import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, ArrowLeft, Zap, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shortest Championship Reigns in Wrestling History | Birthday Champion Finder',
  description: 'Explore the briefest championship reigns in wrestling history, from André the Giant\'s 1-minute reign to shocking title changes that lasted mere seconds.',
  keywords: 'shortest WWE championship reigns, André the Giant, Kane, Rey Mysterio, wrestling records, brief title reigns',
};

const shortestReigns = [
  {
    rank: 1,
    name: 'André the Giant',
    championship: 'WWF Championship',
    duration: '1 minute',
    date: 'February 5, 1988',
    event: 'The Main Event',
    circumstances: 'Defeated Hulk Hogan with help from referee Earl Hebner, then immediately sold the title to Ted DiBiase. The title was vacated and awarded via tournament.',
    significance: 'Part of one of wrestling\'s most famous storylines leading to WrestleMania IV'
  },
  {
    rank: 2,
    name: 'Kane',
    championship: 'WWE Championship',
    duration: '1 day',
    date: 'June 28-29, 1998',
    event: 'King of the Ring 1998',
    circumstances: 'Won the title from Stone Cold Steve Austin in a First Blood match, only to lose it back the next night on Raw due to interference from The Undertaker.',
    significance: 'Showcased Kane as a legitimate main event threat during the height of the Attitude Era'
  },
  {
    rank: 3,
    name: 'Bob Backlund',
    championship: 'WWE Championship',
    duration: '8 seconds',
    date: 'November 26, 1994',
    event: 'Survivor Series 1994',
    circumstances: 'Defeated Bret Hart for the title, only to immediately lose it to Diesel in what was essentially one continuous match.',
    significance: 'Served as a transitional champion to pass the torch from Bret Hart to the younger Diesel'
  },
  {
    rank: 4,
    name: 'Rey Mysterio',
    championship: 'WWE Championship',
    duration: '2 hours',
    date: 'July 25, 2011',
    event: 'Monday Night Raw',
    circumstances: 'Won the vacant title in a tournament final, only to lose it to John Cena later that same night when Cena cashed in his Money in the Bank briefcase.',
    significance: 'Highlighted the unpredictable nature of the Money in the Bank concept'
  },
  {
    rank: 5,
    name: 'The Undertaker',
    championship: 'WWE Championship',
    duration: '6 days',
    date: 'November 27 - December 3, 1991',
    event: 'Survivor Series 1991',
    circumstances: 'Defeated Hulk Hogan for his first WWE Championship, but lost it back to Hogan at Tuesday in Texas due to controversial officiating.',
    significance: 'The Deadman\'s first taste of championship gold, setting up his legendary career'
  }
];

export default function ShortestReigns() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-900 via-pink-800 to-red-900 text-white py-16">
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
              <h1 className="text-4xl font-bold mb-2">Shortest Championship Reigns in Wrestling History</h1>
              <p className="text-xl text-red-100">When championship glory lasted mere minutes, hours, or days</p>
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
                  While some champions hold their titles for years, others experience championship glory for 
                  mere moments. These brief reigns often serve important storytelling purposes—creating shock 
                  value, advancing storylines, or serving as transitional moments between longer, more 
                  significant championship runs.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Though short in duration, these reigns are often among the most memorable in wrestling 
                  history, creating iconic moments that fans discuss for decades.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Shortest Reigns List */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">The Briefest Championship Moments</h2>
            
            {shortestReigns.map((reign) => (
              <Card key={reign.rank} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full text-white font-bold text-lg">
                        #{reign.rank}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900">{reign.name}</CardTitle>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            {reign.championship}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{reign.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">{reign.duration}</div>
                      <div className="text-sm text-gray-500">Championship Length</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        What Happened
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{reign.circumstances}</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Historical Significance</h4>
                      <p className="text-blue-700 text-sm">{reign.significance}</p>
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