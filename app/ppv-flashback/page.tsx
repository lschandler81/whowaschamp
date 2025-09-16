import { UFCFlashback } from '@/components/ppv/UFCFlashback';
import { WWEFlashback } from '@/components/ppv/WWEFlashback';
import { getFeatureFlags } from '@/lib/feature-flags';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Pay-Per-View Flashback - Combat Sports & Wrestling History',
  description: 'Relive the greatest moments in combat sports and wrestling history with our weekly PPV flashback featuring UFC and WWE events.',
};

export default function PPVFlashbackPage() {
  const flags = getFeatureFlags();

  if (!flags.ppvFlashback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Pay-Per-View Flashback</h1>
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
            <h1 className="text-4xl font-bold tracking-tight mb-4">Pay-Per-View Flashback</h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Relive the greatest moments in combat sports and wrestling history
            </p>
          </div>
        </div>
      </section>

      {/* PPV Event Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <UFCFlashback compact={false} />
            <WWEFlashback compact={false} />
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-12 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Select Events</h2>
            <div className="prose prose-lg max-w-2xl mx-auto text-gray-700">
              <p className="mb-4">
                Our Pay-Per-View Flashback feature showcases the most significant combat sports and wrestling 
                events from this week in history across both UFC and WWE.
              </p>
              <p className="mb-4">
                We rank events by several criteria to highlight the most impactful moments:
              </p>
              <ol className="text-left list-decimal list-inside space-y-2 mb-4">
                <li><strong>Attendance:</strong> Higher attendance indicates bigger, more significant events</li>
                <li><strong>Buyrate:</strong> Pay-per-view buyrates show commercial success and fan interest</li>
                <li><strong>Historical Significance:</strong> Events featuring title changes, career-defining moments, and legendary performances</li>
                <li><strong>Recency:</strong> More recent events are given slight preference as a tiebreaker</li>
              </ol>
              <p>
                This ensures we highlight the most memorable combat sports and wrestling events that happened 
                during this time of year throughout history.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
