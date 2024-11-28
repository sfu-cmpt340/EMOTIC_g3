from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
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
        
        return jsonify({'message': 'File processed successfully!', 'summary': summary})
    else:
        return jsonify({'error': 'Invalid file type. Only CSV files are allowed.'}), 400

if __name__ == '__main__':
    app.run(debug=True)



