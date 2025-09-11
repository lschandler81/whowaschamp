import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}