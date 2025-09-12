import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.whowaschamp.com'),
  title: 'Birthday Champion Finder - Who Was Wrestling Champion on Your Birthday?',
  description: 'Discover which wrestling legend held the championship belt on the day you were born. Find your birthday champion instantly with our interactive lookup tool.',
  keywords: 'wrestling champions, WWE championship, birthday lookup, wrestling history, professional wrestling',
  openGraph: {
    title: 'Birthday Champion Finder',
    description: 'Find out which wrestling legend held the belt the day you were born',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birthday Champion Finder',
    description: 'Find out which wrestling legend held the belt the day you were born',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense (site-wide) */}
        <Script
          id="adsense-script"
          async
          crossOrigin="anonymous"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6858026889942647"
        />

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-LH31MCLV58`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);} 
  gtag('js', new Date());
  gtag('config', 'G-LH31MCLV58');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <header className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight text-gray-900 hover:text-red-600">
              WhoWasChamp
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/on-this-day" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                This Day in Wrestling
              </Link>
              <Link href="/on-this-week" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                This Week in Wrestling
              </Link>
              <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                Articles
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
