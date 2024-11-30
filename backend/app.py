from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import pickle

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_and_predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.endswith('.csv'):
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        
        # Process the CSV file
        df = pd.read_csv(filepath)
        summary = df.describe().to_dict()  # Example: return basic stats
        prediction = predict(filepath)
        return jsonify({'message': 'File processed successfully!', 'summary': summary, 'prediction': prediction})
    else:
        return jsonify({'error': 'Invalid file type. Only CSV files are allowed.'}), 400
    

# Function to preprocess and classify a single input CSV file
def classify(svm_model, scaler, csv_path, downsample_factor):
    # Load the input CSV file
    input_data = pd.read_csv(csv_path, header=None).values  # Shape: (32, 7500)

    # Downsample the data
    downsampled_data = input_data[:, ::downsample_factor]  # Shape: (32, reduced_timepoints)

    # Flatten the data (32 channels * reduced_timepoints)
    flattened_data = downsampled_data.flatten().reshape(1, -1)

    # Standardize the input data using the scaler from training
    standardized_data = scaler.transform(flattened_data)


    # Perform classification
    prediction = svm_model.predict(standardized_data)

    return prediction


# Prepare model for training
def predict(sample_path):
    downsample = 50
     # load pickle file
    with open('model.pkl', 'rb') as f:
        svm_model, scaler = pickle.load(f)

    prediction = classify(svm_model, scaler, sample_path, downsample)

    return("\nPredicted emotion:", prediction)

if __name__ == '__main__':
    app.run(debug=True)
