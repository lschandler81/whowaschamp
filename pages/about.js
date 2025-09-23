import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Info, Database, Clock, Shield } from 'lucide-react'
import { TopNav } from '@/components/TopNav'
import { Footer } from '@/components/Footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About WhoWasChamp.com</title>
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
            <div className="space-y-2">
              <Badge variant="secondary" className="uppercase tracking-wide">About</Badge>
              <h1 className="font-bold text-3xl text-gray-900 tracking-tight">About WhoWasChamp.com</h1>
              <p className="text-gray-700 leading-relaxed">A fan-built home for quick, accurate answers to the timeless question: who was champ on that day?</p>
            </div>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">What the Site Offers</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-3">
                <p>• The Birthday Champion Finder: instant lookups to see who held the big titles on any date.</p>
                <p>• WWE and UFC history content: curated flashbacks, era spotlights, and event highlights that are easy to browse.</p>
                <p>• Expanding articles: more features and deep dives over time to celebrate the stories behind the stats.</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Why It Exists</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                Built by a passionate fan, for fans. The goal is to keep things simple, fun, and accurate—so you can jump straight to the moments that matter, then keep exploring.
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Trust &amp; Passion</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                We research our data and cross‑reference sources to keep details reliable, and we write with genuine love for pro wrestling and MMA. If you spot something we could improve, we appreciate the heads up—this project gets better with community input.
              </CardContent>
            </Card>

            <div className="rounded-md border bg-gray-50 p-4 text-gray-800">
              <p className="font-medium mb-1">Thanks for Visiting</p>
              <p>Have fun exploring your birthday champions, reliving classic shows, and sharing the site with your friends. Enjoy the trip down memory lane, and come back anytime!</p>
            </div>

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
