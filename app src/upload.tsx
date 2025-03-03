"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Music, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UploadPage() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter((file) => file.type.startsWith("audio/"))
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)

    // Simulate upload and processing
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // In a real app, we would upload files and process them on the server
    // For demo purposes, we'll just redirect to the analysis page
    setUploading(false)
    router.push("/analysis")
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Your Music</h1>
          <p className="text-muted-foreground">Upload audio files to analyze and cluster based on their features.</p>
        </div>
        <Separator />
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="url">From URL</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center ${
                files.length > 0 ? "border-border" : "border-primary/20"
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Drag and drop your audio files</h3>
                  <p className="text-sm text-muted-foreground">
                    Supports MP3, WAV, FLAC, and OGG files up to 50MB each
                  </p>
                </div>
                <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                  Select Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="audio/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Selected Files ({files.length})</h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Music className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFile(index)} disabled={uploading}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                {uploading ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Processing files...</p>
                      <p className="text-sm text-muted-foreground">{progress}%</p>
                    </div>
                    <Progress value={progress} />
                  </div>
                ) : (
                  <Button onClick={handleUpload} className="w-full">
                    Upload and Analyze ({files.length} files)
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="url-input" className="text-sm font-medium">
                Enter URLs (one per line)
              </label>
              <textarea
                id="url-input"
                className="w-full h-32 p-3 border rounded-md"
                placeholder="https://example.com/song1.mp3&#10;https://example.com/song2.mp3"
              />
            </div>
            <Button className="w-full">Fetch and Analyze</Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

