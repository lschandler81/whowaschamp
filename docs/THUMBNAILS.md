# Thumbnail Guide for Articles

This guide explains how to add and manage thumbnails for blog articles on WhoWasChamp.com.

## Quick Start

When adding a new article to `lib/posts-home.ts`, you can specify:

```typescript
{
  slug: 'my-article',
  title: 'My Wrestling Article',
  description: 'An amazing article about wrestling history.',
  publishedAt: '2025-09-24',
  
  // Optional: Specify a custom image
  image: '/images/blog/my-custom-image.jpg',
  imageAlt: 'Custom alt text for accessibility',
  
  // Optional: Override category inference
  category: 'wwe' // or 'ufc', 'history', 'records', 'default'
}
```

## Image Options

### 1. Custom Images
- Add your image to `public/images/blog/`
- Reference with `/images/blog/your-image.jpg`
- Always provide `imageAlt` for accessibility

### 2. Stock Image Fallbacks (Zero Config)
If you don't specify an image, the system automatically chooses based on content:

#### Category Mapping:
- **WWE topics** → Generic championship belt image
- **UFC topics** → Octagon lighting pattern  
- **Records/Stats** → Scoreboard/statistics visual
- **Historical articles** → Vintage arena atmosphere
- **Default** → Wrestling arena spotlight

#### Auto-Detection:
The system analyzes your article slug to determine the category:
- Contains "wwe", "attitude-era" → WWE category
- Contains "ufc", "octagon" → UFC category  
- Contains "record", "longest", "age" → Records category
- Contains "era", "history", "lineage" → History category
- Everything else → Default category

## Image Requirements

### Technical Specs:
- **Format:** JPG or PNG preferred
- **Size:** 800x450px (16:9 aspect ratio) recommended
- **File size:** Keep under 200KB for performance
- **Location:** Store in `public/images/blog/` or `public/images/stock/`

### Content Guidelines:
- **Generic content only** - No recognizable wrestlers, fighters, or logos
- **Copyright-safe** - Use only royalty-free or owned images
- **Professional quality** - Clear, well-lit, relevant to wrestling/sports
- **Accessible** - Provide meaningful alt text

## Examples

### WWE Article:
```typescript
{
  slug: 'attitude-era-champions',
  title: 'Champions of the Attitude Era',
  category: 'wwe', // Explicit category
  image: '/images/blog/attitude-era-custom.jpg', // Custom image
  imageAlt: 'Attitude Era wrestling arena with dramatic lighting'
}
```

### Auto-Inferred Article:
```typescript
{
  slug: 'longest-championship-reigns',
  title: 'Longest Championship Reigns in History'
  // No image specified - will auto-use records category fallback
  // No category specified - will infer "records" from "longest" in slug
}
```

### UFC Article:
```typescript
{
  slug: 'ufc-title-history',
  title: 'Complete UFC Championship History',
  category: 'ufc'
  // Will use UFC octagon fallback image
}
```

## Testing Your Images

1. **Local Development:** Images should appear immediately in dev mode
2. **Accessibility:** Test with screen readers or browser accessibility tools
3. **Performance:** Check that images don't slow down page load
4. **Responsive:** Verify images look good on mobile and desktop

## Troubleshooting

### Image Not Showing?
- Check file path matches exactly (case-sensitive)
- Ensure image exists in `public/` directory
- Verify file format is supported (JPG, PNG, WEBP)

### Wrong Fallback Image?
- Add explicit `category` field to override auto-detection
- Check slug doesn't contain misleading keywords

### Performance Issues?
- Optimize image file sizes (use tools like TinyPNG)
- Ensure images are proper dimensions (800x450px recommended)
- Consider WEBP format for better compression

## Stock Images Available

Current stock images in `/images/stock/`:
- `stadium-spotlight.jpg` - Default wrestling arena
- `wwe-belt-dark.jpg` - Generic championship belt (WWE)
- `octagon-lights.jpg` - Octagon lighting (UFC)  
- `arena-retro.jpg` - Vintage sports arena (History)
- `scoreboard-closeup.jpg` - Statistics display (Records)

## Need Help?

Check the `CREDITS.md` file for image sourcing guidelines, or refer to the component code in `components/FeaturedArticles.tsx` and `components/LatestArticles.tsx` for implementation details.