
import tensorflow as tf
import h5py
import os

import tf2onnx

os.environ['TF_KERAS'] = '1'
import onnxmltools


model_path = "model/mobilenet_spinal_model.h5"

try:
    with h5py.File(model_path, 'r') as f:
        print("✅ Model is in HDF5 format.")
except OSError:
    print("❌ Model is not HDF5. It might be corrupt or an invalid format.")
model = tf.keras.models.load_model(model_path)
# Define input signature
input_signature = [tf.TensorSpec([None, *model.input.shape[1:]], tf.float32)]

# Convert Keras model to ONNX
onnx_model, _ = tf2onnx.convert.from_keras(model, input_signature=input_signature)

# Save the ONNX model
onnx_path = "./model/model.onnx"
with open(onnx_path, "wb") as f:
    f.write(onnx_model.SerializeToString())

print(f"✅ Successfully converted to ONNX: {onnx_path}")



