import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { TopNav } from '@/components/TopNav'
import { Footer } from '@/components/Footer'

export default function ThankYouPage() {
  return (
    <>
      <Head>
        <title>Thanks | Who Was Champ</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <TopNav />
        <main className="max-w-screen-sm sm:max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-xs font-medium text-gray-700 hover:text-red-600 bg-white/80 border border-gray-200 rounded-md px-3 py-1 shadow-sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Link>
          </div>
          <div className="bg-white/95 backdrop-blur-sm border rounded-xl shadow-md p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you!</h1>
            <p className="text-gray-700">Your message has been received. We usually reply within a couple of days.</p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

