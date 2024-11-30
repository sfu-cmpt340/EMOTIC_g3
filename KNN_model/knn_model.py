import numpy as np
from process_data import preprocess, get_labels
from sklearn.metrics import accuracy_score, classification_report
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.discriminant_analysis import StandardScaler

# Function for training the model
def train_knn_model(eeg_data, labels, n_neighbors):
    # Training: Split data into training and test sets:
    # Utilize a training to testing ratio of 80:20 as discussed by the group
    X_train, X_valid, y_train, y_valid = train_test_split(eeg_data, labels, test_size=0.20)

    # Standardize features
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_valid = scaler.transform(X_valid)

    # Create the k-Nearest-Neighbors model
    # Neighbors: Make a classifcation based on its k-nearest neighbors
    knn = KNeighborsClassifier(n_neighbors)
    knn.fit(X_train, y_train)

    # Testing: Make a prediction using the test set
    y_predict = knn.predict(X_valid)
    print("\nClassification Report:\n", classification_report(y_valid, y_predict))
    print("\nAccuracy:", accuracy_score(y_valid, y_predict))

    return knn

# Prepare model for training
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

    # Preprocess data (adjust second parameter to control downsampling)
    eeg_data = preprocess(directory, 2)
    labels = get_labels(eeg_data.shape[0], emotions)

    # Reshape data (flatten from 3D to 2D)
    num_subjects, num_videos, num_channels, num_timepoints = eeg_data.shape
    reshaped_eeg_data = eeg_data.reshape(-1, num_channels * num_timepoints)

    # Call function to train the k-Nearest-Neighbors model (adjust number of neighbors)
    knn_model = train_knn_model(reshaped_eeg_data, labels, 5)
