import Link from "next/link"
import { ArrowRight, Upload, AudioWaveformIcon as Waveform } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center h-16 px-4 mx-auto sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Waveform className="w-6 h-6 text-primary" />
            <span>MusicCluster</span>
          </Link>
          <nav className="flex items-center ml-auto gap-4">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 mx-auto space-y-12 sm:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Waveform className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Discover Music Patterns with AI
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Upload your music collection and let our machine learning algorithms find natural groupings based on
                audio characteristics.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/upload">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline">
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center p-6 space-y-4 text-center border rounded-lg">
                <div className="p-2 rounded-full bg-primary/10">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Upload Your Music</h3>
                <p className="text-muted-foreground">
                  Upload your music files and our system will extract key audio features.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 space-y-4 text-center border rounded-lg">
                <div className="p-2 rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M2 9.5V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5.5" />
                    <path d="M2 14.5V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.5" />
                    <path d="M18 2v20" />
                    <path d="M22 9.5H2" />
                    <path d="M22 14.5H2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">AI Clustering</h3>
                <p className="text-muted-foreground">
                  Our unsupervised learning algorithms analyze and group similar songs together.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 space-y-4 text-center border rounded-lg">
                <div className="p-2 rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" x2="22" y1="12" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Visualize & Explore</h3>
                <p className="text-muted-foreground">
                  Discover new connections between songs and explore your music in a whole new way.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 bg-muted md:py-24 lg:py-32">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
                <p className="text-muted-foreground">
                  Our app uses advanced machine learning techniques to analyze and group your music.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <span>Extract audio features like tempo, rhythm, and tonal qualities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <span>Apply K-means clustering to group similar songs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <span>Visualize clusters in an interactive 3D graph</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <span>Discover new relationships between your favorite tracks</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Interactive Visualization Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Waveform className="h-6 w-6" />
            <p className="text-sm text-center leading-loose md:text-left">© 2025 MusicCluster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

