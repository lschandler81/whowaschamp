'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { getLatestArticles, generateExcerpt, formatPublishedDate, getPostImage, type BlogPost } from '@/lib/posts-home';

interface LatestArticleCardProps {
  post: BlogPost;
}

function LatestArticleCard({ post }: LatestArticleCardProps) {
  const excerpt = generateExcerpt(post.description, 140);
  const { src: imageSrc, alt: imageAlt } = getPostImage(post);

  return (
    <li className="group">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-200 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={(e) => {
                // Show gradient placeholder if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <header className="mb-3">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2">
                {post.title}
              </h3>
              
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
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                {excerpt}
              </p>
            </div>
            
            <footer className="mt-auto">
              <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                Read more
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </footer>
          </div>
        </article>
      </Link>
    </li>
  );
}

export function LatestArticles() {
  const latestPosts = getLatestArticles(6);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white" aria-labelledby="latest-articles-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="latest-articles-heading" className="text-3xl font-bold text-gray-900 mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our newest deep dives into championship history, records, and wrestling insights.
          </p>
        </header>

        <div className="mb-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestPosts.map((post) => (
              <LatestArticleCard key={post.slug} post={post} />
            ))}
          </ul>
        </div>

        {/* View All Articles CTA */}
        <div className="text-right">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}