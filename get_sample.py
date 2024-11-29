import os
import pickle
import numpy as np
import pandas as pd

# Get 9 different samples for testing
eeg_data = []
files = ["sub101.pkl", "sub102.pkl", "sub103.pkl", "sub104.pkl", "sub105.pkl", "sub106.pkl", "sub107.pkl", "sub108.pkl", "sub109.pkl"]
for file_name in files:
    with open(os.path.join("Processed_data_test", file_name), 'rb') as file:
        data = pickle.load(file)
        eeg_data.append(data)

# Convert the list of arrays into a single NumPy array
eeg_data = np.array(eeg_data)  # Shape: (9, num_videos, num_channels, num_timepoints)

# Specify output directory for CSV files
output_dir = "samples"
os.makedirs(output_dir, exist_ok=True)  # Create directory if it doesn't exist

# Save each subject's EEG data as a CSV file
for subject_idx, subject_data in enumerate(eeg_data):
    # Extract the specific sample corresponding to index `0, 29, 58, ...` for this subject
    sample_index = 0  # Always extract the first video for this task
    selected_sample = subject_data[sample_index, :, :]  # Shape: (num_channels, num_timepoints)
    
    # Convert to a DataFrame
    df = pd.DataFrame(selected_sample)
    
    # Save to CSV
    csv_path = os.path.join(output_dir, f"subject_{subject_idx + 1}.csv")
    df.to_csv(csv_path, index=False, header=False)
    print(f"Saved CSV for Subject {subject_idx + 1} at {csv_path}")
