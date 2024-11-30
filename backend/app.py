from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import pickle

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.endswith('.csv'):
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        
        # Respond with the filename for frontend usage
        return jsonify({'message': 'File processed successfully!', 'filename': file.filename}), 200
    else:
        return jsonify({'error': 'Invalid file type. Only CSV files are allowed.'}), 400

@app.route('/process', methods=['POST'])
def process_file():
    data = request.get_json()
    filename = data.get("filename")
    if not filename:
        return jsonify({'error': 'No filename provided'}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(filepath):
        return jsonify({'error': 'File not found'}), 404

    prediction = predict(filepath)
    return jsonify({'emotion': prediction.tolist()})


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
    with open('model.pkl', 'rb') as f:
        svm_model, scaler = pickle.load(f)
    prediction = classify(svm_model, scaler, sample_path, downsample)
    return prediction

if __name__ == '__main__':
    app.run(debug=True)
