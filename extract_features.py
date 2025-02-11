import os
import librosa
import numpy as np
import pandas as pd
from tqdm import tqdm

# Define the folder where music files are stored
DATASET_PATH = "music_data/fma_small/"

# Function to extract features from an audio file
def extract_features(file_path):
    try:
        y, sr = librosa.load(file_path, sr=None)  # Load the audio file
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)  # Extract 13 MFCC features
        mfccs_mean = np.mean(mfccs, axis=1)  # Take the mean of each MFCC feature
        return mfccs_mean
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return None

# List all audio files
audio_files = []
for root, _, files in os.walk(DATASET_PATH):
    for file in files:
        if file.endswith(".mp3"):  # Only process MP3 files
            audio_files.append(os.path.join(root, file))

# Extract features from all files
features_list = []
for file in tqdm(audio_files, desc="Extracting Features"):
    features = extract_features(file)
    if features is not None:
        features_list.append([file] + features.tolist())

# Save extracted features to CSV
columns = ["filename"] + [f"mfcc_{i+1}" for i in range(13)]
df = pd.DataFrame(features_list, columns=columns)
df.to_csv("music_features.csv", index=False)

print("Feature extraction complete! Features saved to music_features.csv")source venv/bin/activate.zsh