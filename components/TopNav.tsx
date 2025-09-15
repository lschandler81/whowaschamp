'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b">
      <div className="max-w-screen-sm sm:max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-14 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 hover:text-red-600 whitespace-nowrap">
            WhoWasChamp
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/on-this-day" className="text-xs font-medium text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap">
              This Day in Wrestling
            </Link>
            <Link href="/ppv-flashback" className="text-xs font-medium text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap">
              PPV Flashback
            </Link>
            <Link href="/blog" className="text-xs font-medium text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap">
              Articles
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="space-y-3">
              <Link 
                href="/on-this-day" 
                className="block text-xs font-medium text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                This Day in Wrestling
              </Link>
              <Link 
                href="/ppv-flashback" 
                className="block text-xs font-medium text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                PPV Flashback
              </Link>
              <Link 
                href="/blog" 
                className="block text-xs font-medium text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Articles
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
