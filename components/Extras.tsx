import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Award, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function Extras() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Wrestling Championship Insights</h2>
          <p className="text-lg text-gray-600">Explore fascinating facts and statistics from wrestling history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Champions by Decade */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Champions by Decade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">1960s</span>
                  <Badge variant="outline">Bruno Sammartino Era</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">1980s</span>
                  <Badge variant="outline">Hulkamania Begins</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">1990s</span>
                  <Badge variant="outline">Attitude Era</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">2000s</span>
                  <Badge variant="outline">Ruthless Aggression</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">2010s+</span>
                  <Badge variant="outline">PG Era & Beyond</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Record Holders */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-600" />
                Championship Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Longest Single Reign</h4>
                  <p className="text-gray-600">Bruno Sammartino (2,803 days)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Shortest Reign</h4>
                  <p className="text-gray-600">André the Giant (1 minute)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Most Title Reigns</h4>
                  <p className="text-gray-600">John Cena (16 championships)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Youngest Champion</h4>
                  <p className="text-gray-600">Brock Lesnar (25 years old)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog/SEO Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <Link href="/blog/longest-reigns">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Top 10 Longest Title Reigns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Discover the champions who held the belt for years, not months. 
                From Bruno Sammartino's legendary 8-year reign to modern-day marathons.
              </p>
              <Badge variant="secondary">Wrestling History</Badge>
            </CardContent>
          </Card>
          </Link>

          <Link href="/blog/attitude-era">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <CardHeader>
              <Clock className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle className="text-lg">Champions of the '90s</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                The Attitude Era brought us unforgettable champions. 
                Relive the era of Stone Cold, The Rock, and the Monday Night Wars.
              </p>
              <Badge variant="secondary">Attitude Era</Badge>
            </CardContent>
          </Card>
          </Link>

          <Link href="/blog/age-records">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <CardHeader>
              <Award className="h-8 w-8 text-yellow-600 mb-2" />
              <CardTitle className="text-lg">Youngest vs Oldest Champions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                From young phenoms to seasoned veterans, explore the age extremes 
                of championship glory throughout wrestling history.
              </p>
              <Badge variant="secondary">Records</Badge>
            </CardContent>
          </Card>
          </Link>

          <Link href="/blog/championship-lineages">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle className="text-lg">Championship Lineages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Trace the complete history of wrestling's most prestigious titles 
                from their inception to today's modern era.
              </p>
              <Badge variant="secondary">Title History</Badge>
            </CardContent>
          </Card>
          </Link>

          <Link href="/blog/championship-curse">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <CardHeader>
              <Clock className="h-8 w-8 text-red-600 mb-2" />
              <CardTitle className="text-lg">The Championship Curse</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Explore the mysterious phenomenon where championship glory 
                sometimes leads to unexpected challenges and career setbacks.
              </p>
              <Badge variant="secondary">Mystery</Badge>
            </CardContent>
          </Card>
          </Link>

          <Link href="/blog/never-lost-title">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <CardHeader>
              <Award className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle className="text-lg">Champions Who Never Lost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Meet the champions who vacated, retired, or left while still 
                holding gold - never technically losing their titles.
              </p>
              <Badge variant="secondary">Legends</Badge>
            </CardContent>
          </Card>
          </Link>

          <Link href="/blog/era-defining-reigns">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <CardHeader>
              <Users className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle className="text-lg">Era-Defining Championship Reigns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Discover how certain dominant championship reigns shaped 
                entire eras and changed the course of wrestling history.
              </p>
              <Badge variant="secondary">Impact</Badge>
            </CardContent>
          </Card>
          </Link>
        </div>

       
      </div>
    </section>
  );
}