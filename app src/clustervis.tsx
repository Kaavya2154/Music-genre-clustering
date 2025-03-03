"use client"

import { useEffect, useRef } from "react"
import { Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ClusterVisualizationProps {
  songs: any[]
  features: any[]
  onClusterSelect: (cluster: number | null) => void
  activeCluster: number | null
}

export function ClusterVisualization({ songs, features, onClusterSelect, activeCluster }: ClusterVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Define cluster colors
    const clusterColors = [
      "rgba(59, 130, 246, 0.8)", // Blue
      "rgba(16, 185, 129, 0.8)", // Green
      "rgba(249, 115, 22, 0.8)", // Orange
      "rgba(236, 72, 153, 0.8)", // Pink
    ]

    // Draw background grid
    ctx.strokeStyle = "rgba(156, 163, 175, 0.1)"
    ctx.lineWidth = 1

    const gridSize = 30
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw clusters
    songs.forEach((song, index) => {
      const feature = features[index]

      // Map features to x, y coordinates
      const x = (feature.tempo / 150) * canvas.width * 0.8 + canvas.width * 0.1
      const y = (1 - feature.energy) * canvas.height * 0.8 + canvas.height * 0.1
      const radius = activeCluster === null || activeCluster === song.cluster ? 8 : 5

      // Draw song point
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle =
        activeCluster === null || activeCluster === song.cluster
          ? clusterColors[song.cluster]
          : "rgba(156, 163, 175, 0.3)"
      ctx.fill()

      // Draw cluster label if this is the first song in the cluster
      const isFirstInCluster = songs.findIndex((s) => s.cluster === song.cluster) === index
      if (isFirstInCluster && (activeCluster === null || activeCluster === song.cluster)) {
        ctx.font = "bold 12px sans-serif"
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        ctx.fillText(`Cluster ${song.cluster + 1}`, x + 12, y + 4)
      }
    })

    // Draw axes labels
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "rgba(107, 114, 128, 0.8)"
    ctx.fillText("Tempo →", canvas.width - 60, canvas.height - 10)
    ctx.save()
    ctx.translate(15, 60)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText("Energy →", 0, 0)
    ctx.restore()
  }, [songs, features, activeCluster])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-2 right-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                This visualization plots songs based on tempo (x-axis) and energy (y-axis).
                <br />
                Colors represent different clusters identified by the algorithm.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

