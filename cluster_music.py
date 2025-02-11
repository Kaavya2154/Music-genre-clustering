import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# Load dataset
file_name = "music_features.csv"
try:
    df = pd.read_csv(file_name)
    print(f" File found: {file_name}")
    print("First 5 rows:\n", df.head())
    print("Dataset shape:", df.shape)
except FileNotFoundError:
    print(f" File not found: {file_name}")
    exit()

# Check if dataset is empty
if df.empty:
    print(" The dataset is empty!")
    exit()


if 'filename' in df.columns:
    filenames = df['filename']  # Store filenames separately
    df = df.drop(columns=['filename'])  # Remove from features
else:
    filenames = None  # No filename column present

# Extract features for clustering
X = df.values
print("X shape:", X.shape)

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Debug: Check if scaling worked
print("Data scaling complete. Sample:")
print(X_scaled[:5])

# Adjust the number of clusters based on data size
num_samples = X.shape[0]
num_clusters = min(2, num_samples)  # Ensure clusters do not exceed available data

print(f"Clustering is starting with {num_clusters} clusters...")
kmeans = KMeans(n_clusters=num_clusters, random_state=42, n_init=10)
df['cluster'] = kmeans.fit_predict(X_scaled)

# Debug: Check if clustering worked
print("Clustering complete. Cluster labels assigned.")

# Add back the filename column if it existed
if filenames is not None:
    df.insert(0, "filename", filenames)  # Insert at the first column position

# Save results to CSV
output_file = "clustered_music.csv"
df.to_csv(output_file, index=False)
print(f" CSV file saved: {output_file}")

# Scatter plot
plt.figure(figsize=(8, 6))
plt.scatter(X_scaled[:, 0], X_scaled[:, 1], c=df['cluster'], cmap='viridis', alpha=0.7)
plt.title("Music Clustering Scatter Plot")
plt.xlabel("Feature 1 (scaled)")
plt.ylabel("Feature 2 (scaled)")
plt.colorbar(label="Cluster")
print("Showing scatter plot...")
plt.show(block=True)  # Forces the plot to stay open
