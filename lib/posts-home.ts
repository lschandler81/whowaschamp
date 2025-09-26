// lib/posts-home.ts
// Helper for homepage featured articles

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  featured?: boolean;
  publishedAt?: string;
  thumbnail?: string;
  image?: string;
  imageAlt?: string;
  category?: 'wwe' | 'ufc' | 'history' | 'records' | 'default';
}

// Static blog posts data (matching current blog structure)
const posts: BlogPost[] = [
  {
    slug: 'age-records',
    title: 'Youngest vs Oldest WWE Champions',
    description: 'Explore the age extremes of WWE Championship glory — from young phenoms to seasoned veterans.',
    featured: true,
    publishedAt: '2025-09-20',
    // Use category-based fallback image until real stock photo is added
    category: 'records'
  },
  {
    slug: 'era-defining-reigns',
    title: 'Era‑Defining Reigns', 
    description: 'How certain championship runs reshaped entire eras and changed wrestling history.',
    featured: true,
    publishedAt: '2025-09-15',
    category: 'history'
  },
  {
    slug: 'attitude-era',
    title: 'Champions of the Attitude Era',
    description: 'Relive the champions and chaos that defined WWE\'s most explosive period.',
    featured: true,
    publishedAt: '2025-09-10',
    category: 'wwe'
  },
  {
    slug: 'longest-reigns',
    title: 'Top 10 Longest Championship Reigns',
    description: 'From Bruno Sammartino to modern marathon champions — the longest runs ever.',
    publishedAt: '2025-09-05'
  },
  {
    slug: 'most-championship-reigns',
    title: 'Most Championship Reigns',
    description: 'Who holds the most world title reigns, and how they got there.',
    publishedAt: '2025-08-30'
  },
  {
    slug: 'shortest-reigns',
    title: 'Shortest Championship Reigns',
    description: 'Blink‑and‑you‑miss‑it reigns and the stories behind them.',
    publishedAt: '2025-08-25'
  },
  {
    slug: 'championship-lineages',
    title: 'Championship Lineages',
    description: 'Follow how major wrestling titles evolved, unified, and split across eras.',
    publishedAt: '2025-08-20'
  },
  {
    slug: 'championship-curse',
    title: 'The Championship "Curse"',
    description: 'Myth or reality? Examining the challenges champions face after winning gold.',
    publishedAt: '2025-08-15'
  },
  {
    slug: 'championship-cities',
    title: 'Championship Cities',
    description: 'The locations that hosted the most title changes — and why they mattered.',
    publishedAt: '2025-08-10'
  },
  {
    slug: 'controversial-title-changes',
    title: 'Most Controversial Title Changes',
    description: 'From the Montreal Screwjob to shock TV moments — when controversy crowned champions.',
    publishedAt: '2025-08-05'
  },
  {
    slug: 'belt-design-evolution',
    title: 'Belt Design Evolution',
    description: 'How championship belts changed in look and meaning through the decades.',
    publishedAt: '2025-07-30'
  },
  {
    slug: 'never-lost-title',
    title: 'Champions Who Never Lost Their Title',
    description: 'Vacated and relinquished reigns that left "what if" legacies.',
    publishedAt: '2025-07-25'
  }
];

/**
 * Get featured posts for homepage
 * @param limit Number of posts to return (default: 3)
 * @returns Array of featured blog posts
 */
export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  // First try to get featured posts
  const featuredPosts = posts
    .filter(post => post.featured)
    .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
    .slice(0, limit);

  // If we have enough featured posts, return them
  if (featuredPosts.length >= Math.min(limit, 2)) {
    return featuredPosts.slice(0, limit);
  }

  // Otherwise, fall back to most recent posts
  return getLatestPosts(limit);
}

/**
 * Get latest posts for homepage fallback
 * @param limit Number of posts to return (default: 3)
 * @returns Array of latest blog posts
 */
export function getLatestPosts(limit: number = 3): BlogPost[] {
  return posts
    .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
    .slice(0, limit);
}

/**
 * Get latest articles for Latest Articles section
 * @param limit Number of posts to return (default: 6)
 * @returns Array of latest blog posts sorted by date
 */
export function getLatestArticles(limit: number = 6): BlogPost[] {
  return posts
    .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
    .slice(0, limit);
}

/**
 * Get all posts for articles index page
 * @returns Array of all blog posts sorted by date
 */
export function getAllArticles(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime());
}

/**
 * Generate excerpt from description if no explicit excerpt exists
 * @param description Full description text
 * @param maxLength Maximum character length (default: 160)
 * @returns Truncated excerpt with ellipsis
 */
export function generateExcerpt(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) {
    return description;
  }

  // Find the last complete word within the limit
  const truncated = description.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > maxLength * 0.8) { // Only break on word if it's not too far back
    return truncated.slice(0, lastSpaceIndex) + '…';
  }
  
  return truncated + '…';
}

/**
 * Get fallback image for a blog post based on category or slug inference
 * @param post Blog post to get image for
 * @returns Image path and alt text
 */
export function getPostImage(post: BlogPost): { src: string; alt: string } {
  // Use explicit image if provided
  if (post.image) {
    return {
      src: post.image,
      alt: post.imageAlt || `${post.title} - Wrestling article thumbnail`
    };
  }

  // Use legacy thumbnail if provided
  if (post.thumbnail) {
    return {
      src: post.thumbnail,
      alt: post.imageAlt || `${post.title} - Wrestling article thumbnail`
    };
  }

  // Infer category from slug or use explicit category
  const category = post.category || inferCategoryFromSlug(post.slug);
  
  // Map categories to stock images
  // Category-based image mapping with stock-style thumbnails
  const imageMap = {
    wwe: { 
      src: '/images/stock/wwe-belt-dark.svg',
      alt: 'WWE wrestling ring with red ropes and arena lighting' 
    },
    ufc: { 
      src: '/images/stock/ufc-octagon.svg',
      alt: 'UFC octagon with golden lighting and cage structure' 
    },
    history: { 
      src: '/images/stock/arena-retro.svg',
      alt: 'Vintage wrestling arena with retro atmosphere and seating' 
    },
    records: { 
      src: '/images/stock/scoreboard-closeup.svg',
      alt: 'Sports scoreboard displaying championship records and statistics' 
    },
    default: { 
      src: '/images/stock/stadium-spotlight.svg',
      alt: 'Wrestling arena with dramatic spotlight and stage setup' 
    }
  };

  const fallback = imageMap[category] || imageMap.default;
  return {
    src: fallback.src,
    alt: post.imageAlt || fallback.alt
  };
}

/**
 * Infer category from blog post slug
 * @param slug Blog post slug
 * @returns Inferred category
 */
function inferCategoryFromSlug(slug: string): 'wwe' | 'ufc' | 'history' | 'records' | 'default' {
  const lowerSlug = slug.toLowerCase();
  
  if (lowerSlug.includes('wwe') || lowerSlug.includes('attitude-era') || lowerSlug.includes('sammartino')) {
    return 'wwe';
  }
  if (lowerSlug.includes('ufc') || lowerSlug.includes('octagon')) {
    return 'ufc';
  }
  if (lowerSlug.includes('record') || lowerSlug.includes('longest') || lowerSlug.includes('shortest') || lowerSlug.includes('most') || lowerSlug.includes('age')) {
    return 'records';
  }
  if (lowerSlug.includes('era') || lowerSlug.includes('history') || lowerSlug.includes('lineage') || lowerSlug.includes('evolution')) {
    return 'history';
  }
  
  return 'default';
}

/**
 * Get SEO metadata for a blog post including Open Graph images
 * @param post Blog post
 * @param baseUrl Base URL for absolute URLs (default: 'https://www.whowaschamp.com')
 * @returns SEO metadata object
 */
export function getPostSEOMetadata(post: BlogPost, baseUrl: string = 'https://www.whowaschamp.com') {
  const { src: imageSrc } = getPostImage(post);
  const absoluteImageUrl = imageSrc.startsWith('http') ? imageSrc : `${baseUrl}${imageSrc}`;
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: absoluteImageUrl,
          width: 800,
          height: 450,
          alt: getPostImage(post).alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: post.title,
      description: post.description,
      images: [absoluteImageUrl],
    },
  };
}

/**
 * Format published date for display
 * @param dateString ISO date string
 * @returns Formatted date (e.g., "Sep 24, 2025")
 */
export function formatPublishedDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric', 
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}
