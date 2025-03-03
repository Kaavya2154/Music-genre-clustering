"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClusterVisualization } from "@/components/cluster-visualization"
import { SongList } from "@/components/song-list"

// Sample data for demonstration
const DEMO_SONGS = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55", cluster: 0 },
  { id: 2, title: "Stairway to Heaven", artist: "Led Zeppelin", duration: "8:02", cluster: 0 },
  { id: 3, title: "Hotel California", artist: "Eagles", duration: "6:30", cluster: 0 },
  { id: 4, title: "Beat It", artist: "Michael Jackson", duration: "4:18", cluster: 1 },
  { id: 5, title: "Billie Jean", artist: "Michael Jackson", duration: "4:54", cluster: 1 },
  { id: 6, title: "Thriller", artist: "Michael Jackson", duration: "5:57", cluster: 1 },
  { id: 7, title: "Sweet Child O' Mine", artist: "Guns N' Roses", duration: "5:56", cluster: 2 },
  { id: 8, title: "Welcome to the Jungle", artist: "Guns N' Roses", duration: "4:33", cluster: 2 },
  { id: 9, title: "Paradise City", artist: "Guns N' Roses", duration: "6:46", cluster: 2 },
  { id: 10, title: "Smells Like Teen Spirit", artist: "Nirvana", duration: "5:01", cluster: 3 },
  { id: 11, title: "Come As You Are", artist: "Nirvana", duration: "3:39", cluster: 3 },
  { id: 12, title: "Lithium", artist: "Nirvana", duration: "4:17", cluster: 3 },
]

// Sample feature data for demonstration
const DEMO_FEATURES = [
  { tempo: 72, energy: 0.8, danceability: 0.4, acousticness: 0.2, valence: 0.6 },
  { tempo: 82, energy: 0.7, danceability: 0.3, acousticness: 0.3, valence: 0.5 },
  { tempo: 75, energy: 0.6, danceability: 0.5, acousticness: 0.1, valence: 0.7 },
  { tempo: 118, energy: 0.9, danceability: 0.8, acousticness: 0.1, valence: 0.8 },
  { tempo: 117, energy: 0.8, danceability: 0.9, acousticness: 0.1, valence: 0.7 },
  { tempo: 120, energy: 0.9, danceability: 0.7, acousticness: 0.1, valence: 0.6 },
  { tempo: 126, energy: 0.9, danceability: 0.6, acousticness: 0.2, valence: 0.7 },
  { tempo: 130, energy: 0.8, danceability: 0.7, acousticness: 0.1, valence: 0.8 },
  { tempo: 128, energy: 0.9, danceability: 0.5, acousticness: 0.1, valence: 0.6 },
  { tempo: 116, energy: 0.9, danceability: 0.4, acousticness: 0.1, valence: 0.4 },
  { tempo: 120, energy: 0.8, danceability: 0.5, acousticness: 0.2, valence: 0.5 },
  { tempo: 118, energy: 0.9, danceability: 0.3, acousticness: 0.1, valence: 0.3 },
]

export default function AnalysisPage() {
  const [analyzing, setAnalyzing] = useState(true)
  const [progress, setProgress] = useState(0)
  const [activeCluster, setActiveCluster] = useState<number | null>(null)
  const [clusterStats, setClusterStats] = useState<any[]>([])

  useEffect(() => {
    // Simulate analysis process
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setAnalyzing(false)
            return 100
          }
          return prev + 5
        })
      }, 200)

      return () => clearInterval(interval)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!analyzing) {
      // Generate cluster statistics
      setClusterStats([
        {
          id: 0,
          name: "Classic Rock",
          count: 3,
          avgTempo: 76,
          keyFeatures: "Low danceability, high energy, complex structures",
        },
        {
          id: 1,
          name: "Pop",
          count: 3,
          avgTempo: 118,
          keyFeatures: "High danceability, high energy, consistent beat",
        },
        {
          id: 2,
          name: "Hard Rock",
          count: 3,
          avgTempo: 128,
          keyFeatures: "Medium danceability, very high energy, guitar-driven",
        },
        {
          id: 3,
          name: "Grunge",
          count: 3,
          avgTempo: 118,
          keyFeatures: "Low danceability, high energy, distorted guitars",
        },
      ])
    }
  }, [analyzing])

  const filteredSongs =
    activeCluster !== null ? DEMO_SONGS.filter((song) => song.cluster === activeCluster) : DEMO_SONGS

  if (analyzing) {
    return (
      <div className="container max-w-4xl py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analyzing Your Music</h1>
            <p className="text-muted-foreground">Extracting audio features and clustering your songs...</p>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Overall Progress</p>
                <p className="text-sm text-muted-foreground">{progress}%</p>
              </div>
              <Progress value={progress} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Current Steps:</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Extracting audio features</p>
                  <p className="text-xs text-muted-foreground">{progress < 40 ? "In progress" : "Complete"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Normalizing data</p>
                  <p className="text-xs text-muted-foreground">
                    {progress < 40 ? "Waiting" : progress < 70 ? "In progress" : "Complete"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Running clustering algorithm</p>
                  <p className="text-xs text-muted-foreground">
                    {progress < 70 ? "Waiting" : progress < 90 ? "In progress" : "Complete"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Generating visualization</p>
                  <p className="text-xs text-muted-foreground">
                    {progress < 90 ? "Waiting" : progress < 100 ? "In progress" : "Complete"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-12">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
            <p className="text-muted-foreground">Your music has been analyzed and clustered into groups</p>
          </div>
          <div className="flex gap-2">
            <Link href="/upload">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </Link>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" /> Export Results
            </Button>
          </div>
        </div>

        <Tabs defaultValue="visualization" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="clusters">Clusters</TabsTrigger>
            <TabsTrigger value="songs">Songs</TabsTrigger>
          </TabsList>

          <TabsContent value="visualization" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Cluster Visualization</CardTitle>
                  <CardDescription>3D visualization of your music clusters based on audio features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] bg-muted rounded-md flex items-center justify-center">
                    <ClusterVisualization
                      songs={DEMO_SONGS}
                      features={DEMO_FEATURES}
                      onClusterSelect={setActiveCluster}
                      activeCluster={activeCluster}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Clusters</CardTitle>
                    <CardDescription>{clusterStats.length} clusters identified</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {clusterStats.map((cluster) => (
                        <Button
                          key={cluster.id}
                          variant={activeCluster === cluster.id ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setActiveCluster(cluster.id === activeCluster ? null : cluster.id)}
                        >
                          {cluster.name} ({cluster.count})
                        </Button>
                      ))}
                      {activeCluster !== null && (
                        <Button variant="ghost" className="w-full text-xs" onClick={() => setActiveCluster(null)}>
                          Clear selection
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {activeCluster !== null && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{clusterStats[activeCluster].name}</CardTitle>
                      <CardDescription>{clusterStats[activeCluster].count} songs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Avg. Tempo:</span>
                          <span>{clusterStats[activeCluster].avgTempo} BPM</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Key Features:</span>
                          <p className="mt-1">{clusterStats[activeCluster].keyFeatures}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clusters" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {clusterStats.map((cluster) => (
                <Card key={cluster.id}>
                  <CardHeader>
                    <CardTitle>{cluster.name}</CardTitle>
                    <CardDescription>{cluster.count} songs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Audio Characteristics</h4>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Tempo</span>
                            <span className="text-xs">{cluster.avgTempo} BPM</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Energy</span>
                            <div className="w-24">
                              <Progress
                                value={cluster.id === 0 ? 70 : cluster.id === 1 ? 85 : cluster.id === 2 ? 90 : 80}
                                className="h-1"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Danceability</span>
                            <div className="w-24">
                              <Progress
                                value={cluster.id === 0 ? 40 : cluster.id === 1 ? 80 : cluster.id === 2 ? 60 : 40}
                                className="h-1"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Acousticness</span>
                            <div className="w-24">
                              <Progress
                                value={cluster.id === 0 ? 20 : cluster.id === 1 ? 10 : cluster.id === 2 ? 15 : 10}
                                className="h-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Key Features</h4>
                        <p className="text-xs text-muted-foreground mt-1">{cluster.keyFeatures}</p>
                      </div>
                      <div className="pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => setActiveCluster(cluster.id)}
                        >
                          View Songs
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="songs">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeCluster !== null ? `Songs in ${clusterStats[activeCluster].name}` : "All Songs"}
                </CardTitle>
                <CardDescription>
                  {filteredSongs.length} songs
                  {activeCluster !== null && (
                    <Button variant="link" className="p-0 h-auto text-xs" onClick={() => setActiveCluster(null)}>
                      Clear filter
                    </Button>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SongList songs={filteredSongs} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

