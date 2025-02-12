import os
from flask import Flask, request, jsonify
import classifiy_spine as cs

app = Flask(__name__)

# Ensure the "files" directory exists
if not os.path.exists("files"):
  os.makedirs("files")


@app.route('/uploadfile', methods=['POST'])
def upload_file():
  try:
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
    print(result)
    return jsonify({"Prediction": result})

  except Exception as e:
    return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
  app.run(debug=True)
