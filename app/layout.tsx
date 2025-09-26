import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Analytics from '@/components/Analytics';
import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';

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
    images: [
      {
        url: '/images/stock/stadium-spotlight.jpg',
        width: 800,
        height: 450,
        alt: 'Wrestling arena with dramatic spotlight',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birthday Champion Finder',
    description: 'Find out which wrestling legend held the belt the day you were born',
    images: ['/images/stock/stadium-spotlight.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-LH31MCLV58';
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
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              id="ga4-src"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);} 
  gtag('js', new Date());
  gtag('config', '${GA_MEASUREMENT_ID}');
          `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        {/* Route-change page_view events for GA4 */}
        {GA_MEASUREMENT_ID && <Analytics />}
        <TopNav />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
