import os
import pickle
import numpy as np

def downsample(data, factor):
    return data.reshape(data.shape[0], data.shape[1], data.shape[2], -1, factor).mean(axis=-1)

def process_training_data():
    # Loop across all 100 subjects (training data)
    eeg_data = []
    for file_name in os.listdir("Processed_data"):
        if file_name.endswith('.pkl'):
            with open(os.path.join("Processed_data", file_name), 'rb') as file:
                data = pickle.load(file)

            # Append the subject arrays together
            eeg_data.append(data)

    # Convert the list of arrays into a single NumPy array
    eeg_data = np.array(eeg_data)  # Shape: (100, num_videos, num_channels, num_timepoints)

    eeg_data = downsample(eeg_data, 50) # A factor of 2 will compress the number of time points by half

    # Get the emotions for each video
    emotions = ["Anger", "Anger", "Anger",
                "Disgust", "Disgust", "Disgust",
                "Fear", "Fear", "Fear",
                "Sadness", "Sadness", "Sadness", 
                "Neutral", "Neutral", "Neutral", "Neutral",
                "Amusement", "Amusement", "Amusement",
                "Inspiration", "Inspiration", "Inspiration",
                "Joy", "Joy", "Joy",
                "Tenderness", "Tenderness", "Tenderness"]

    # Repeat the emotion labels for 100 subjects
    emotion_labels = np.tile(emotions, (100, 1))
    labels = emotion_labels.flatten()  # Shape: (100 * 28,)

    # Reshape the EEG data
    num_subjects, num_videos, num_channels, num_timepoints = eeg_data.shape
    reshaped_eeg_data = eeg_data.reshape(-1, num_channels * num_timepoints)  # Shape: (100 * 28, num_channels * num_timepoints)

    print(labels.shape)  # Expected: (100 * 28,)
    print(reshaped_eeg_data.shape)  # Expected: (100 * 28, num_channels * num_timepoints)
    return reshaped_eeg_data, labels