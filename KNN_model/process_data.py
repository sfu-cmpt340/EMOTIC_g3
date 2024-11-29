import os
import pickle
import numpy as np

# Load all subject files from a given directory 
def load_data(directory):
    # Loop to open all and add to 'eeg_data' array
    eeg_data = []
    for file_name in os.listdir(directory):
        if file_name.endswith('.pkl'):
            with open(os.path.join(directory, file_name), 'rb') as file:
                data = pickle.load(file)
            eeg_data.append(data)

    return np.array(eeg_data)

# Compress the number of timepoints by some factor--
# We need to do this because the original 7500 * 32 columns are too much for models to process
def downsample(data, factor):
    downsampled_data = data.reshape(data.shape[0], data.shape[1], data.shape[2], -1, factor).mean(axis=-1)
    return downsampled_data

# Arrange the emotions array in a way such that they are a single column
def get_labels(num_subjects, emotions):
    emotion_labels = np.tile(emotions, (num_subjects, 1))
    return emotion_labels.flatten()

# Helper function for performing preprocessing to prepare data for model training--
# Data must be shaped in a specific format before being read by the model
def preprocess(directory, downsample_factor):
    eeg_data = load_data(directory)
    eeg_data = downsample(eeg_data, downsample_factor)
    return eeg_data

# Example of processing data using training data--
# Uses 100 subjects from the 'Processed_data_train' folder
# Downsamples by a factor of 2
if __name__ == "__main__":
    directory = "Processed_data_train"
    emotions = ["Anger", "Anger", "Anger",
            "Disgust", "Disgust", "Disgust",
            "Fear", "Fear", "Fear",
            "Sadness", "Sadness", "Sadness", 
            "Neutral", "Neutral", "Neutral", "Neutral",
            "Amusement", "Amusement", "Amusement",
            "Inspiration", "Inspiration", "Inspiration",
            "Joy", "Joy", "Joy",
            "Tenderness", "Tenderness", "Tenderness"]
    
    eeg_data = preprocess(directory, 2)
    labels = get_labels(num_subjects=eeg_data.shape[0], emotions=emotions)

    print(labels.shape)  # Expected: (100 subjects * 28 videos,)
    print(eeg_data.shape)  # Expected: (100 subjects, 28 videos, 32 channels, 3750 timepoints)
