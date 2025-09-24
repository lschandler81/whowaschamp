import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, BookOpen } from 'lucide-react';
import { getAllArticles, generateExcerpt, formatPublishedDate, type BlogPost } from '@/lib/posts-home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles – WhoWasChamp',
  description: 'Explore our complete collection of articles about championship history, records, eras, storylines, and wrestling insights.',
  keywords: 'wrestling articles, championship history, WWE articles, wrestling analysis, sports entertainment'
};

interface ArticleCardProps {
  post: BlogPost;
}

function ArticleCard({ post }: ArticleCardProps) {
  const excerpt = generateExcerpt(post.description, 160);

  return (
    <li className="group">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-200 overflow-hidden">
            {post.thumbnail ? (
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-gray-200 group-hover:to-gray-300 transition-colors">
                <div className="text-gray-400 text-4xl font-bold opacity-50">
                  {post.title.charAt(0)}
                </div>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <header className="mb-3">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2">
                {post.title}
              </h2>
              
              {post.publishedAt && (
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {formatPublishedDate(post.publishedAt)}
                  </time>
                </div>
              )}
            </header>
            
            <div className="flex-1">
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
                {excerpt}
              </p>
            </div>
            
            <footer className="mt-auto">
              <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                Read article
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </footer>
          </div>
        </article>
      </Link>
    </li>
  );
}

export default function ArticlesIndexPage() {
  const allArticles = getAllArticles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-700 rounded-full">
              <BookOpen className="h-8 w-8 text-blue-100" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">All Articles</h1>
              <p className="text-xl text-blue-100">
                Deep dives into championship history, records, eras, and storylines
              </p>
            </div>
          </div>
          
          <div className="text-blue-200">
            <p className="text-sm">
              {allArticles.length} article{allArticles.length !== 1 ? 's' : ''} • Updated regularly
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allArticles.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No articles yet</h2>
              <p className="text-gray-600">Check back soon for wrestling insights and championship analysis.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {allArticles.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

// Enable ISR with 1 hour revalidation if supported
export const revalidate = 3600;