"use client";
// components/FeaturedArticles.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getFeaturedPosts, generateExcerpt, getPostImage, type BlogPost } from '@/lib/posts-home';

interface FeaturedArticlesProps {
  limit?: number;
}

export function FeaturedArticles({ limit = 3 }: FeaturedArticlesProps) {
  const featuredPosts = getFeaturedPosts(limit);

  // Hide section if we have less than 2 posts
  if (featuredPosts.length < 2) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-screen-sm sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-red-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Articles</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dive deep into wrestling history with our featured stories about champions, records, and legendary moments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredPosts.map((post, index) => (
            <FeaturedArticleCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface FeaturedArticleCardProps {
  post: BlogPost;
  priority?: boolean;
}

function FeaturedArticleCard({ post, priority = false }: FeaturedArticleCardProps) {
  const excerpt = generateExcerpt(post.description, 140);
  const { src: imageSrc, alt: imageAlt } = getPostImage(post);

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full border rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={(e) => {
              // Hide the image element if it fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-900 text-xl font-bold group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
              Featured Article
            </span>
            <div className="flex items-center gap-1 text-red-600 font-medium text-sm group-hover:gap-2 transition-all duration-200">
              Read more
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
