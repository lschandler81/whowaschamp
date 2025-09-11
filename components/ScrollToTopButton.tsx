'use client';

import { Trophy } from 'lucide-react';

export function ScrollToTopButton() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button 
        onClick={handleScrollToTop}
        className="p-4 bg-championship rounded-full shadow-2xl championship-glow hover:scale-110 transition-all duration-300"
        aria-label="Back to top"
      >
        <Trophy className="h-6 w-6 text-arena-black" />
      </button>
    </div>
  );
}