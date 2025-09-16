import { PPVFlashback } from '@/components/ppv/PPVFlashback';
import WWEFlashback from '@/components/ppv/WWEFlashback';
import { getFeatureFlags } from '@/lib/feature-flags';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'PPV Flashback - This Week in Wrestling History',
  description: 'Discover the biggest pay-per-view event that happened during this same week in wrestling history.',
};

export default function PPVFlashbackPage() {
  const flags = getFeatureFlags();

  if (!flags.ppvFlashback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">PPV Flashback</h1>
          <p className="text-gray-600 mb-6">This feature is currently disabled.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-500">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">PPV Flashback</h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Each week we spotlight a major pay-per-view event that happened during this same ISO week in wrestling history. 
              Discover legendary moments from the same time period across different years.
            </p>
          </div>
        </div>
      </section>

      {/* PPV Event Section - UFC */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">UFC This Week in History</h2>
            <p className="text-gray-600">The biggest UFC event from this week in combat sports history</p>
          </div>
          <PPVFlashback compact={false} />
        </div>
      </section>

      {/* PPV Event Section - WWE */}
      <section className="py-12 bg-white/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">WWE This Week in History</h2>
            <p className="text-gray-600">The biggest WWE event from this week in wrestling history</p>
          </div>
          <WWEFlashback compact={false} />
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-12 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Select Events</h2>
            <div className="prose prose-lg max-w-2xl mx-auto text-gray-700">
              <p className="mb-4">
                Our PPV Flashback feature uses ISO week numbering to find events that happened during 
                the same week of the year across wrestling history.
              </p>
              <p className="mb-4">
                We rank events by three criteria in order of priority:
              </p>
              <ol className="text-left list-decimal list-inside space-y-2 mb-4">
                <li><strong>Attendance:</strong> Higher attendance indicates bigger, more significant events</li>
                <li><strong>Buyrate:</strong> Pay-per-view buyrates show commercial success and fan interest</li>
                <li><strong>Recency:</strong> More recent events are given slight preference as a tiebreaker</li>
              </ol>
              <p>
                This ensures we highlight the most impactful wrestling events that happened 
                during this time of year throughout history.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
