import json
import os
from flask import Flask, request, jsonify
import classifiy_spine as cs
from flask_cors import CORS
app = Flask(__name__)

# Ensure the "files" directory exists
if not os.path.exists("files"):
  os.makedirs("files")

CORS(app, resources={r"/*": {"origins": "*"}})
@app.route('/uploadfile', methods=['POST'])
def upload_file():
  try:
    print(request.files)
    if 'file' not in request.files:
      return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
      return jsonify({"error": "No selected file"}), 400

    # Save the file to the 'files' directory
    file_location = f"files/{file.filename}"
    file.save(file_location)

    # Process the file with classify_spine (assuming it takes the file path as input)
    result = cs.classify_spine(file_location)  # Modify this to match your actual function

    # Return the file path and the result of classification
    return result

  except Exception as e:
    print(e)
    return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
  app.run(debug=True, port=5500)
