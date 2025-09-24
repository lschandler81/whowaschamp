// lib/posts-home.ts
// Helper for homepage featured articles

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  featured?: boolean;
  publishedAt?: string;
  thumbnail?: string;
}

// Static blog posts data (matching current blog structure)
const posts: BlogPost[] = [
  {
    slug: 'age-records',
    title: 'Youngest vs Oldest WWE Champions',
    description: 'Explore the age extremes of WWE Championship glory — from young phenoms to seasoned veterans.',
    featured: true,
    publishedAt: '2024-03-15',
    thumbnail: '/images/blog/age-records.jpg' // placeholder - update with actual images
  },
  {
    slug: 'era-defining-reigns',
    title: 'Era‑Defining Reigns', 
    description: 'How certain championship runs reshaped entire eras and changed wrestling history.',
    featured: true,
    publishedAt: '2024-03-10',
    thumbnail: '/images/blog/era-defining.jpg'
  },
  {
    slug: 'attitude-era',
    title: 'Champions of the Attitude Era',
    description: 'Relive the champions and chaos that defined WWE\'s most explosive period.',
    featured: true,
    publishedAt: '2024-03-05',
    thumbnail: '/images/blog/attitude-era.jpg'
  },
  {
    slug: 'longest-reigns',
    title: 'Top 10 Longest Championship Reigns',
    description: 'From Bruno Sammartino to modern marathon champions — the longest runs ever.',
    publishedAt: '2024-02-28'
  },
  {
    slug: 'most-championship-reigns',
    title: 'Most Championship Reigns',
    description: 'Who holds the most world title reigns, and how they got there.',
    publishedAt: '2024-02-20'
  },
  {
    slug: 'shortest-reigns',
    title: 'Shortest Championship Reigns',
    description: 'Blink‑and‑you‑miss‑it reigns and the stories behind them.',
    publishedAt: '2024-02-15'
  },
  {
    slug: 'championship-lineages',
    title: 'Championship Lineages',
    description: 'Follow how major wrestling titles evolved, unified, and split across eras.',
    publishedAt: '2024-02-10'
  },
  {
    slug: 'championship-curse',
    title: 'The Championship "Curse"',
    description: 'Myth or reality? Examining the challenges champions face after winning gold.',
    publishedAt: '2024-02-05'
  },
  {
    slug: 'championship-cities',
    title: 'Championship Cities',
    description: 'The locations that hosted the most title changes — and why they mattered.',
    publishedAt: '2024-01-30'
  },
  {
    slug: 'controversial-title-changes',
    title: 'Most Controversial Title Changes',
    description: 'From the Montreal Screwjob to shock TV moments — when controversy crowned champions.',
    publishedAt: '2024-01-25'
  },
  {
    slug: 'belt-design-evolution',
    title: 'Belt Design Evolution',
    description: 'How championship belts changed in look and meaning through the decades.',
    publishedAt: '2024-01-20'
  },
  {
    slug: 'never-lost-title',
    title: 'Champions Who Never Lost Their Title',
    description: 'Vacated and relinquished reigns that left "what if" legacies.',
    publishedAt: '2024-01-15'
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