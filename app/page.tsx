import { DateTitleForm } from '@/components/DateTitleForm';
import { Extras } from '@/components/Extras';
import { Footer } from '@/components/Footer';
import { getFeatureFlags } from '@/lib/feature-flags';
import { Trophy, Calendar, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const flags = getFeatureFlags();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-yellow-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-pink-400 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-14 h-14 border-2 border-green-400 rounded-full animate-pulse delay-3000"></div>
        </div>
        <div className="relative max-w-screen-sm sm:max-w-4xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-2xl animate-bounce">
                <Trophy className="h-16 w-16 text-yellow-100" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-6">
              Who Was Champion on{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Your Birthday?</span>
            </h1>
            <p className="text-[15px] leading-6 text-blue-100 mb-12">
              Discover which wrestling legends held championship gold the day you were born.
              Explore decades of wrestling history across multiple promotions and divisions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-screen-sm sm:max-w-4xl mx-auto px-4 sm:px-6">
          <DateTitleForm />
        </div>
      </section>

      {/* PPV Feature Sections */}
      {flags.ppvFlashback && (
        <section className="py-8 bg-white">
          <div className="max-w-screen-sm sm:max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">PPV Flashback</h2>
              <p className="text-gray-600">Feature temporarily disabled</p>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-screen-sm sm:max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Wrestling Championship Stats</h2>
            <p className="text-lg text-gray-600">Explore fascinating statistics from decades of championship history across all major promotions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">60+ Years</h3>
              <p className="text-gray-600">Of championship history tracked</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-600 text-white rounded-lg mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+ Champions</h3>
              <p className="text-gray-600">Legendary wrestlers in our database</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-600 text-white rounded-lg mb-4">
                <span className="text-lg">👑</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Women's Division</h3>
              <p className="text-gray-600">Celebrating women's wrestling history</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-lg mb-4">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">6 Promotions</h3>
              <p className="text-gray-600">WWE, WCW, AEW, TNA, NXT & more</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-lg mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Auto-Updated</h3>
              <p className="text-gray-600">Fresh data twice weekly</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Posts */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-screen-sm sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Posts</h2>
            <p className="text-gray-600">Explore more championship history and deep dives</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/blog/longest-reigns" className="block p-5 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
              Read about the longest WWE Championship reigns in history
            </Link>
            <Link href="/blog/age-records" className="block p-5 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
              Explore the youngest and oldest WWE champions
            </Link>
            <Link href="/blog/era-defining-reigns" className="block p-5 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
              See era-defining championship reigns that changed wrestling
            </Link>
            <Link href="/blog/most-championship-reigns" className="block p-5 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
              Discover who holds the most world championship reigns
            </Link>
            <Link href="/blog/attitude-era" className="block p-5 rounded-lg bg-white shadow hover:shadow-md text-gray-800">
              Relive the champions of WWE’s Attitude Era
            </Link>
          </div>
        </div>
      </section>

      <Extras />

      {/* Footer */}
      <Footer />
    </div>
  );
}
