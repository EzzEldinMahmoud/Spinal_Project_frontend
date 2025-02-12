import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from typing import Annotated





def classify_spine(image_path):

    # set path for trained model
    model = load_model("model/mobilenet_spinal_model.h5")

    # process the image
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    #prediction
    prediction = model.predict(img_array)

    if prediction[0][0] > 0.5:
        return {"emergency_level":"normal","cab_angle":prediction[0][0].item()}
    else:
        return {"emergency_level":"scol","cab_angle":prediction[0][0].item()}
