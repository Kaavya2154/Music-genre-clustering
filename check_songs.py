import pandas as pd

# Load clustered music data
df = pd.read_csv("clustered_music.csv")

# Print first few rows to inspect the structure
print(df.head())

# Print column names to check for potential issues
print("Available columns:", df.columns.tolist())

# Strip any spaces from column names
df.columns = df.columns.str.strip()

# Check if 'filename' column exists before accessing it
if "filename" in df.columns:
    print("Song filenames:", df["filename"].tolist())
else:
    print("Error: 'filename' column not found. Available columns:", df.columns.tolist())