import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.metrics import confusion_matrix, classification_report
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64

def downsample(data, factor):
    """
    Downsample the input data by taking the mean along the last axis.
    
    Args:
    data (numpy.ndarray): Input data to downsample
    factor (int): Downsampling factor
    
    Returns:
    numpy.ndarray: Downsampled data
    """
    return data.reshape(data.shape[0], data.shape[1], -1, factor).mean(axis=-1)

def process_csv_data(csv_path):
    """
    Process CSV data to match the expected shape for model input.
    
    Args:
    csv_path (str): Path to the CSV file
    
    Returns:
    tuple: Processed EEG data and corresponding label
    """
    # Read the CSV file
    df = pd.read_csv(csv_path)
    
    # Convert to numpy array
    eeg_data = df.to_numpy()
    
    # Reshape to (1, 1, num_channels, num_timepoints)
    # Assuming the CSV has shape (32, 7500)
    eeg_data = eeg_data.reshape(1, 1, eeg_data.shape[0], eeg_data.shape[1])
    
    # Optional: Downsample the data (adjust factor as needed)
    # Uncomment and adjust if you want to reduce timepoints
    eeg_data = downsample(eeg_data, 50)
    
    # Assign a default label (modify as needed)
    label = 'Disgust'
    
    # Print shapes for verification
    print("Processed EEG Data Shape:", eeg_data.shape)
    print("Label:", label)
    
    # Reshape EEG data to flatten channels and timepoints
    reshaped_eeg_data = eeg_data.reshape(1, -1)
    
    return reshaped_eeg_data, label

def preprocessInputs():
    reshaped_eeg_data, label = process_csv_data('disgust.csv')

    
    # Column names
    eeg_columns = []
    for i in range(reshaped_eeg_data.shape[1]):
        eeg_columns.append(f'eeg_{i}')
    
    # Convert EEG data to DataFrame
    eeg_df = pd.DataFrame(reshaped_eeg_data, columns=eeg_columns)
    
    # Add label
    eeg_df['label'] = label

    # Label mapping
    labelMap = { 'Anger': 0, 'Disgust': 1, 'Fear': 2, 'Sadness': 3, 'Neutral': 4, 
                 'Amusement': 5, 'Inspiration': 6, 'Joy': 7, 'Tenderness': 8 }    

    # Prepare data
    dataframe = eeg_df.copy()   
    dataframe['label'] = dataframe['label'].map(labelMap)

    # Separate features and labels
    y = dataframe['label'].copy()
    x = dataframe.drop('label', axis=1).copy()

    return x, y, labelMap

def results(x_test, y_test, labelMap):
    # Load the pre-trained model
    loaded_model = tf.keras.models.load_model('model.keras')


    # Evaluate the model
    model_loss, model_acc = loaded_model.evaluate(x_test, y_test, verbose=0)
    model_acc = format(model_acc * 100, '.3f')
    model_loss = format(model_loss * 100, '.3f')
    print("Test Accuracy: {}%".format(model_acc)) 
    print("Test Loss: {}%".format(model_loss))

    # Predict probabilities
    y_pred_probabilities = loaded_model.predict(x_test)
    y_pred = np.argmax(y_pred_probabilities, axis=1)

    # Ensure y_test is numpy array
    y_test = np.array(y_test)

    # Dynamically create label names based on actual unique values in prediction
    unique_labels = np.unique(np.concatenate([y_test, y_pred]))
    label_names = [list(labelMap.keys())[list(labelMap.values()).index(label)] for label in unique_labels]

    # Generate classification report
    clr = classification_report(y_test, y_pred, labels=unique_labels, target_names=label_names)
    print("Classification Report:\n----------------------\n", clr)

    # Confusion matrix
    cm = confusion_matrix(y_test, y_pred, labels=unique_labels)

    plt.figure(figsize=(10, 12))
    sns.heatmap(cm, annot=True, vmin=0, fmt='g', cbar=False, cmap='Blues', 
                xticklabels=label_names, 
                yticklabels=label_names)
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('Confusion Matrix')
    plt.show()

    # Save plot to base64
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    plot_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    plt.close()

    return {
        'accuracy': model_acc,
        'loss': model_loss,
        'classification_report': clr,
        'confusion_matrix': cm,
        'plot_base64': plot_base64
    }

# Preprocess the inputs
x_test, y_test, labelMap = preprocessInputs()

# Test the model and get results
resultDict = results(x_test, y_test, labelMap)
print(resultDict) 