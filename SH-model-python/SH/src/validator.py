import onnx

def check_onnx_model(onnx_path):
    try:
        # Load the ONNX model
        model = onnx.load(onnx_path)

        # Check if the model is well-formed
        onnx.checker.check_model(model)

        print(f"✅ The ONNX model '{onnx_path}' is valid!")
        return True
    except Exception as e:
        print(f"❌ Error: The ONNX model '{onnx_path}' is corrupted.\n{e}")
        return False

# Example usage
onnx_file = "./model/model.onnx"  # Change to your ONNX file path
check_onnx_model(onnx_file)
