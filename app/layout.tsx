import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
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
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
