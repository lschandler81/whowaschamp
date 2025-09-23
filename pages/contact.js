import { useState } from 'react'
import Head from 'next/head'
import { Footer } from '@/components/Footer'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setStatus(null)

    if (!name || !email || !message) {
      setStatus('error')
      return
    }

    try {
      setLoading(true)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json().catch(() => ({ success: false }))
      if (res.ok && data?.success) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Contact Us | Who Was Champ</title>
      </Head>

      <main className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

        {status === 'success' && (
          <div className="mb-4 rounded border border-green-300 bg-green-50 text-green-800 px-4 py-3">
            Thanks! Your message has been sent.
          </div>
        )}
        {status === 'error' && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 text-red-800 px-4 py-3">
            Something went wrong. Please try again later.
          </div>
        )}

        <form onSubmit={onSubmit} noValidate>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="w-full border rounded px-3 py-2 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full border rounded px-3 py-2 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Message</label>
          <textarea
            id="message"
            className="w-full border rounded px-3 py-2 mb-4 h-32"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Sending…' : 'Submit'}
          </button>
        </form>
      </main>
      <Footer />
    </>
  )
}

