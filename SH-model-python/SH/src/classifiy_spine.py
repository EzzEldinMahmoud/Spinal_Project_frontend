import numpy as np
import onnxruntime as ort
import torch
import torchvision.transforms as transforms
from PIL import Image

# Load ONNX model optimized for Intel CPUs
session = ort.InferenceSession("model/model.onnx",
                               providers=["CPUExecutionProvider"])

# Define image preprocessing (PyTorch format)
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # MobileNet normalization
])

def classify_spine(image_path):
    # Load and preprocess the image
    img = Image.open(image_path).convert("RGB")
    img_tensor = transform(img).unsqueeze(0).numpy()  # Add batch dimension

    # Convert from (N, C, H, W) to (N, H, W, C) for ONNX (if needed)
    img_tensor = np.transpose(img_tensor, (0, 2, 3, 1))  # Convert to NHWC format

    # Run inference
    inputs = {session.get_inputs()[0].name: img_tensor}
    output = session.run(None, inputs)[0]  # Get prediction

    # Interpret result
    if output[0][0] > 0.5:
        return {"emergency_level": "normal"}
    else:
        return {"emergency_level": "scol"}
