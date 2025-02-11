# Music-genre-clustering

## 📌 Project Overview
This project uses **unsupervised learning** to cluster a collection of songs based on their extracted audio features. The goal is to analyze and group similar music pieces without predefined labels using **machine learning**.

## Technologies Used
- **Python** (Programming Language)
- **Libraries:**
  - `librosa` – Extract audio features from music
  - `numpy` – Mathematical operations
  - `pandas` – Data handling
  - `matplotlib` & `seaborn` – Data visualization
  - `scikit-learn` – Clustering algorithms (K-Means)

## 🎵 Dataset: FMA (Free Music Archive)
We used the **FMA dataset**, a publicly available collection of music tracks, for this project. The dataset is stored in the `music_data/` directory.

## 🎼 Extracted Audio Features
We extract the following **key audio features** from each song:
1. **MFCC (Mel-Frequency Cepstral Coefficients):** Represents how humans perceive sound.
2. **Spectral Contrast:** Measures the difference between peaks and valleys in the frequency spectrum.
3. **Chroma Features:** Represents musical notes and harmonic content.

## 📂 Project Structure
```
📁 music_clustering
│── 📁 music_data/              # Contains the FMA dataset
│── 📄 extract_features.py      # Extracts audio features from MP3 files
│── 📄 cluster_music.py         # Applies K-Means clustering to group songs
│── 📄 music_features.csv       # Extracted features stored in a CSV file
│── 📄 clustered_music.csv       # Clustered data with labels
│── 📄 README.md                # Project documentation
```

## 🔧 How to Run the Project
### 1️⃣ Install Dependencies
Run the following command to install the required Python libraries:
```bash
pip install librosa pandas numpy matplotlib seaborn scikit-learn tqdm
```

### 2️⃣ Extract Audio Features
Run the feature extraction script to process the MP3 files:
```bash
python extract_features.py
```
✅ This generates `music_features.csv` containing extracted features.

### 3️⃣ Perform Clustering
Run the K-Means clustering script:
```bash
python cluster_music.py
```
✅ This generates `clustered_music.csv` with cluster labels.

### 4️⃣ Visualize Clusters
The clustering script will generate a **scatter plot** showing grouped songs based on extracted features.

## 📊 Results & Analysis
- The clustering algorithm groups similar songs based on extracted MFCC, spectral contrast, and chroma features.
- The number of clusters can be adjusted in `cluster_music.py` (default: **5 clusters**).
- The results can be used to build a **music recommendation system**.

## 📌 Future Improvements
- Optimize clustering by trying different algorithms (DBSCAN, Hierarchical Clustering, etc.)
- Train a supervised model using labeled datasets.
- Build a **music recommendation system** using the clustered data.



