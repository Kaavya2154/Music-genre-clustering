/**
 * A simple K-means clustering implementation
 * This is a simplified version for demonstration purposes
 */
export class KMeansClustering {
  /**
   * Run K-means clustering on a dataset
   * @param data Array of feature vectors to cluster
   * @param k Number of clusters to create
   * @param maxIterations Maximum number of iterations
   * @returns Array of cluster assignments (0 to k-1) for each data point
   */
  static cluster(data: number[][], k = 4, maxIterations = 100): number[] {
    if (data.length === 0) {
      return []
    }

    const dimensions = data[0].length

    // Initialize centroids randomly
    const centroids: number[][] = []
    for (let i = 0; i < k; i++) {
      centroids.push(this.getRandomDataPoint(data))
    }

    // Initialize cluster assignments
    const assignments: number[] = new Array(data.length).fill(0)
    let iterations = 0
    let changed = true

    // Main K-means loop
    while (changed && iterations < maxIterations) {
      changed = false
      iterations++

      // Assign each data point to the nearest centroid
      for (let i = 0; i < data.length; i++) {
        const newCluster = this.findClosestCentroid(data[i], centroids)
        if (newCluster !== assignments[i]) {
          assignments[i] = newCluster
          changed = true
        }
      }

      // Skip recalculating centroids on the last iteration
      if (!changed) break

      // Recalculate centroids based on new assignments
      for (let i = 0; i < k; i++) {
        const clusterPoints = data.filter((_, idx) => assignments[idx] === i)

        if (clusterPoints.length > 0) {
          const newCentroid = new Array(dimensions).fill(0)

          for (const point of clusterPoints) {
            for (let d = 0; d < dimensions; d++) {
              newCentroid[d] += point[d]
            }
          }

          for (let d = 0; d < dimensions; d++) {
            newCentroid[d] /= clusterPoints.length
          }

          centroids[i] = newCentroid
        }
      }
    }

    return assignments
  }

  /**
   * Find the index of the closest centroid to a data point
   */
  private static findClosestCentroid(point: number[], centroids: number[][]): number {
    let minDistance = Number.POSITIVE_INFINITY
    let closestIndex = 0

    for (let i = 0; i < centroids.length; i++) {
      const distance = this.euclideanDistance(point, centroids[i])
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = i
      }
    }

    return closestIndex
  }

  /**
   * Calculate Euclidean distance between two points
   */
  private static euclideanDistance(a: number[], b: number[]): number {
    let sum = 0
    for (let i = 0; i < a.length; i++) {
      sum += Math.pow(a[i] - b[i], 2)
    }
    return Math.sqrt(sum)
  }

  /**
   * Get a random data point from the dataset
   */
  private static getRandomDataPoint(data: number[][]): number[] {
    const randomIndex = Math.floor(Math.random() * data.length)
    return [...data[randomIndex]]
  }

  /**
   * Normalize a dataset to have values between 0 and 1
   * @param data The dataset to normalize
   * @returns Normalized dataset
   */
  static normalizeData(data: number[][]): number[][] {
    if (data.length === 0) return []

    const dimensions = data[0].length
    const normalized = new Array(data.length).fill(0).map(() => new Array(dimensions).fill(0))

    // Find min and max for each dimension
    const mins = new Array(dimensions).fill(Number.POSITIVE_INFINITY)
    const maxs = new Array(dimensions).fill(Number.NEGATIVE_INFINITY)

    for (const point of data) {
      for (let d = 0; d < dimensions; d++) {
        mins[d] = Math.min(mins[d], point[d])
        maxs[d] = Math.max(maxs[d], point[d])
      }
    }

    // Normalize each point
    for (let i = 0; i < data.length; i++) {
      for (let d = 0; d < dimensions; d++) {
        const range = maxs[d] - mins[d]
        normalized[i][d] = range === 0 ? 0 : (data[i][d] - mins[d]) / range
      }
    }

    return normalized
  }
}

