import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { getAllArticles, generateExcerpt, formatPublishedDate, getPostImage, type BlogPost } from '@/lib/posts-home';

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

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

function BlogArticleCard({ post }: { post: typeof posts[0] }) {
  const { src: imageSrc, alt: imageAlt } = getPostImage(post);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 bg-white h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <CardTitle className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>Article</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all">
              <span>Read more</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default async function BlogPage() {
  const allPosts = await getAllArticles();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Wrestling History & Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Deep dives into championship reigns, wrestling history, and the stories that shaped sports entertainment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogArticleCard key={post.slug} post={post} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/articles"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

