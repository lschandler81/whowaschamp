import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const posts = [
  {
    slug: 'age-records',
    title: 'Youngest vs Oldest WWE Champions',
    description: 'Explore the age extremes of WWE Championship glory — from young phenoms to seasoned veterans.'
  },
  {
    slug: 'era-defining-reigns',
    title: 'Era‑Defining Reigns',
    description: 'How certain championship runs reshaped entire eras and changed wrestling history.'
  },
  {
    slug: 'attitude-era',
    title: 'Champions of the Attitude Era',
    description: 'Relive the champions and chaos that defined WWE’s most explosive period.'
  },
  {
    slug: 'longest-reigns',
    title: 'Top 10 Longest Championship Reigns',
    description: 'From Bruno Sammartino to modern marathon champions — the longest runs ever.'
  },
  {
    slug: 'most-championship-reigns',
    title: 'Most Championship Reigns',
    description: 'Who holds the most world title reigns, and how they got there.'
  },
  {
    slug: 'shortest-reigns',
    title: 'Shortest Championship Reigns',
    description: 'Blink‑and‑you‑miss‑it reigns and the stories behind them.'
  },
  {
    slug: 'championship-lineages',
    title: 'Championship Lineages',
    description: 'Follow how major wrestling titles evolved, unified, and split across eras.'
  },
  {
    slug: 'championship-curse',
    title: 'The Championship “Curse”',
    description: 'Myth or reality? Examining the challenges champions face after winning gold.'
  },
  {
    slug: 'championship-cities',
    title: 'Championship Cities',
    description: 'The locations that hosted the most title changes — and why they mattered.'
  },
  {
    slug: 'controversial-title-changes',
    title: 'Most Controversial Title Changes',
    description: 'From the Montreal Screwjob to shock TV moments — when controversy crowned champions.'
  },
  {
    slug: 'belt-design-evolution',
    title: 'Belt Design Evolution',
    description: 'How championship belts changed in look and meaning through the decades.'
  },
  {
    slug: 'never-lost-title',
    title: 'Champions Who Never Lost Their Title',
    description: 'Vacated and relinquished reigns that left “what if” legacies.'
  }
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-6 w-6 text-red-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Articles</h1>
        </div>
        <p className="text-sm text-gray-600 mb-8">
          Deep dives into championship history, records, eras, storylines, and more.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <Card className="border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-lg font-semibold group-hover:text-red-600 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">{post.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

