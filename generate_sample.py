import os
import pickle
import numpy as np
import pandas as pd
import random

# First, load a single random subject file
directory = "Processed_data_test"
subject_files = [f for f in os.listdir(directory) if f.endswith('.pkl')]
subject_file = random.choice(subject_files)

with open(os.path.join(directory, subject_file), 'rb') as file:
    subject_data = pickle.load(file)  # Shape: (28, 32, 7500)

print(f"Selected subject file: {subject_file}")

# Note the pattern shown here follows the format given in 'Stimuli_info.xlsx'
association = zip([3, 3, 3, 3, 4, 3, 3, 3, 3], ["anger", "disgust", "fear", "sadness", "neutral", "amusement", "inspiration", "joy", "tenderness"])

# Randomly pick one video from each emotion group
# Loop to go through all sets of emotions, where 1 is picked from each
selected_videos = []
selected_emotions = []
curr = 0
for emotion_group, emotion_name in association:
    start = curr
    end = curr + emotion_group
    video_index = random.randint(start, end - 1)
    selected_videos.append(subject_data[video_index, :, :])
    selected_emotions.append(emotion_name)
    curr = end

# Convert selected videos into a single NumPy array
selected_videos = np.array(selected_videos)  # Shape: (9, 32, timepoints)

# Specify output directory for CSV files
output_dir = "Sample_data"
os.makedirs(output_dir, True)

# Save each selected video as a CSV file
for video_index, (video_data, emotion_name) in enumerate(zip(selected_videos, selected_emotions)):
    # Convert to a pandas DataFrame
    df = pd.DataFrame(video_data)
    print(df.shape)

    # Save to CSV
    csv_path = os.path.join(output_dir, f"{emotion_name}.csv")
    df.to_csv(csv_path, index=False, header=False)
    print(f"Saved: {emotion_name} @ {csv_path}")
