# Birthday Champion Finder

🏆 **Discover which wrestling legend held the championship belt the day you were born!**

A modern, responsive web application that lets users enter their birth date and instantly discover which wrestling champion held the title on that special day. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Instant Lookup**: Enter your birthday and get immediate results
- **Multiple Championships**: WWE Championship, Intercontinental Championship, and more
- **Rich Results**: See champion details, reign statistics, and fun facts
- **Social Sharing**: Share your results on Twitter/X, Facebook, and Threads
- **Historical Data**: Comprehensive championship history dating back to the 1960s
- **Auto-Updated**: Data refreshed twice weekly via GitHub Actions
- **AdSense Ready**: Optimized layout with designated ad placement zones
- **Mobile Optimized**: Fully responsive design for all devices
- **SEO Friendly**: Blog content and trivia for search optimization

## 🚀 Live Demo

Visit the live application: [Birthday Champion Finder](https://your-domain.com)

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Validation**: Zod for schema validation
- **Data Source**: Wikipedia (scraped automatically)
- **Deployment**: Static export compatible (Netlify/Vercel/GitHub Pages)
- **Testing**: Vitest for unit and integration tests
- **CI/CD**: GitHub Actions for automated data refresh

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx           # Homepage with hero section
│   └── globals.css        # Global styles and CSS variables
├── components/
│   ├── DateTitleForm.tsx  # Main lookup form
│   ├── ResultCard.tsx     # Champion result display
│   ├── Extras.tsx         # Additional features and stats
│   └── Footer.tsx         # Legal disclaimers and links
├── lib/
│   ├── dateRange.ts       # Date logic and champion lookup
│   └── schema.ts          # Zod schemas for data validation
├── public/data/
│   ├── wwe_championship_reigns.json
│   └── intercontinental_reigns.json
├── scripts/
│   └── build_reigns.mjs   # Wikipedia scraper
├── tests/
│   ├── dateRange.test.ts  # Date logic tests
│   └── parsing.test.ts    # Data validation tests
├── .github/workflows/
│   └── refresh.yml        # Automated data refresh
└── README.md
```

## 🏃 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/birthday-champion-finder.git
   cd birthday-champion-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Scrape latest championship data
npm run scrape

# Validate existing data
npm run validate-data

# Lint code
npm run lint
```

## 📊 Data Management

### Automated Updates

The application uses GitHub Actions to automatically refresh championship data:

- **Schedule**: Twice weekly (Mondays and Thursdays at 4 AM UTC)
- **Sources**: Wikipedia championship lists
- **Validation**: JSON schema validation before committing
- **Fallback**: Preserves existing data if scraping fails

### Manual Data Update

To manually update championship data:

```bash
npm run scrape
```

This will:
1. Fetch latest data from Wikipedia
2. Parse and normalize the data
3. Validate against schemas
4. Save to `public/data/` directory

### Data Structure

Championship data follows this schema:

```json
{
  "metadata": {
    "generated_at": "2024-01-15T10:30:00Z",
    "source": "Wikipedia URL",
    "total_reigns": 150,
    "date_range": {
      "earliest": "1963-05-17",
      "latest": null
    }
  },
  "reigns": [
    {
      "name": "Champion Name",
      "start_date": "YYYY-MM-DD",
      "end_date": "YYYY-MM-DD", // null for current champion
      "event": "Event Name",
      "location": "City, State",
      "notes": "Additional information"
    }
  ]
}
```

## 🧪 Testing

The project includes comprehensive tests:

### Date Logic Tests (`tests/dateRange.test.ts`)
- Champion lookup for various dates
- Inclusive date range checking
- Day-of-reign calculations
- Reign length calculations

### Data Validation Tests (`tests/parsing.test.ts`)
- Schema validation
- JSON structure verification
- Error handling

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test dateRange.test.ts
```

## 📈 SEO & Monetization

### AdSense Integration

The application is designed for AdSense approval with:

- **Content Depth**: Blog sections with wrestling trivia and statistics
- **Ad Placements**: Strategic placement zones for banners and inline ads
- **User Engagement**: Interactive features and social sharing
- **Regular Updates**: Fresh content via automated data refresh

### SEO Features

- **Meta Tags**: Comprehensive OpenGraph and Twitter Card support
- **Semantic HTML**: Proper heading hierarchy and structure
- **Performance**: Optimized images and efficient code splitting
- **Mobile First**: Responsive design with excellent Core Web Vitals

## ⚖️ Legal & Compliance

### Copyright Safety

This project is designed to be legally safe:

- **No WWE Logos**: Generic wrestling imagery only
- **No Copyrighted Images**: Uses only free stock photos or icons
- **Fair Use**: Factual championship data from public sources
- **Clear Attribution**: Credits Wikipedia and other data sources
- **Disclaimers**: Prominent legal disclaimers in footer

### Disclaimer

This site is an independent fan project and is not affiliated with or endorsed by WWE, All Elite Wrestling, or any other wrestling organization. All wrestling company names, champion names, and related trademarks are the property of their respective owners.

## 🚢 Deployment

### Static Export

The application supports static export for hosting on:

- **Netlify**
- **Vercel**
- **GitHub Pages**
- **Any static hosting provider**

### Build Commands

```bash
# Build and export
npm run build

# The `out/` directory contains the static files
```

### Environment Variables

No environment variables required for basic functionality. The application runs entirely client-side with static JSON data.

## 🤝 Contributing

Contributions are welcome! Please:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- **Code Style**: Follow existing TypeScript/React patterns
- **Testing**: Add tests for new features
- **Documentation**: Update README for significant changes
- **Data**: Ensure all data changes are validated

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Wikipedia**: Primary data source for championship information
- **Pro Wrestling Community**: Historical data verification
- **shadcn/ui**: Beautiful UI components
- **Lucide React**: Icon library
- **All Wrestling Fans**: For preserving and sharing wrestling history

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/birthday-champion-finder/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/birthday-champion-finder/discussions)
- **Email**: support@your-domain.com

---

**Built with ❤️ for wrestling fans worldwide** 🌍