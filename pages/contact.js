import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Info, Database, Clock, Shield } from 'lucide-react'
import { TopNav } from '@/components/TopNav'
import { Footer } from '@/components/Footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Who Was Champ</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <TopNav />

        <main className="max-w-screen-sm sm:max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-xs font-medium text-gray-700 hover:text-red-600 bg-white/80 border border-gray-200 rounded-md px-3 py-1 shadow-sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Link>
          </div>

          <div className="bg-white/95 backdrop-blur-sm border rounded-xl shadow-md p-6 sm:p-8 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
              <p className="text-gray-700">Have feedback, a correction, or an idea? We’d love to hear from you.</p>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify
                  data-netlify-honeypot="bot-field"
                  action="/contact"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input name="bot-field" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="mb-4">
                    <Label htmlFor="name" className="mb-1 block">Name</Label>
                    <Input id="name" name="name" type="text" required aria-required="true" />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="email" className="mb-1 block">Email</Label>
                    <Input id="email" name="email" type="email" required aria-required="true" />
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="message" className="mb-1 block">Message</Label>
                    <Textarea id="message" name="message" required aria-required="true" className="h-32" />
                  </div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Send</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Before you message us</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-3">
                <p>We usually reply within a couple of days. Meanwhile, you might find quick answers here:</p>
                <ul className="list-disc pl-6">
                  <li><Link className="text-blue-600 underline" href="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link className="text-blue-600 underline" href="/about">About</Link></li>
                  <li><Link className="text-blue-600 underline" href="/blog">Articles</Link></li>
                </ul>
              </CardContent>
            </Card>

            <Separator className="hidden lg:block my-2" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2 flex items-center gap-2">
                  <Info className="h-4 w-4 text-gray-500" />
                  <CardTitle className="text-base">About This Site</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">Fan-built and constantly improving with community feedback.</CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2 flex items-center gap-2">
                  <Database className="h-4 w-4 text-gray-500" />
                  <CardTitle className="text-base">Data Sources</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">Publicly available databases, cross‑checked references, and historical archives.</CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <CardTitle className="text-base">Data Updates</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">Updated twice weekly via automation.</CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <CardTitle className="text-base">Legal Disclaimer</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">Not affiliated with WWE, AEW, UFC, or any organization. Trademarks belong to their owners.</CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
