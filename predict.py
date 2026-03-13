import cv2
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt

from utils.preprocessing import preprocess_image
# from utils.segmentation import segment_tumor
from utils.gradcam import generate_gradcam
from utils.tumor_analysis import analyze_tumor
from utils.visualization import create_overlay, draw_bounding_box


# Load trained model
model = tf.keras.models.load_model("models/oral_cancer_model.h5", compile=False)

# Image path
image_path = "test.jpg"


# Preprocess image
original_image, processed_image = preprocess_image(image_path)


# Model prediction
prediction = model.predict(np.expand_dims(processed_image, axis=0))[0][0]

if prediction > 0.5:
    label = "Malignant"
else:
    label = "Benign"


# Segmentation
# mask = segment_tumor(original_image)

heatmap = generate_gradcam(model, processed_image)

_, mask = cv2.threshold(heatmap, 200, 255, cv2.THRESH_BINARY)

# --- clean the mask ---
kernel = np.ones((7,7), np.uint8)
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)


# Tumor analysis
tumor_pixels, tumor_area, coverage, diameter, severity, bbox = analyze_tumor(mask)


# Create overlay
overlay = create_overlay(original_image, mask)


# Draw bounding box
bbox_image = draw_bounding_box(original_image.copy(), bbox)


# -------- Multi Panel Display --------

plt.figure(figsize=(10,8))


plt.subplot(2,2,1)
plt.imshow(cv2.cvtColor(original_image, cv2.COLOR_BGR2RGB))
plt.title("Original Image")
plt.axis("off")


plt.subplot(2,2,2)
plt.imshow(mask, cmap="gray")
plt.title("Segmentation Mask")
plt.axis("off")


plt.subplot(2,2,3)
plt.imshow(cv2.cvtColor(overlay, cv2.COLOR_BGR2RGB))
plt.title("Tumor Overlay")
plt.axis("off")


plt.subplot(2,2,4)
plt.imshow(cv2.cvtColor(bbox_image, cv2.COLOR_BGR2RGB))
plt.title("Bounding Box")
plt.axis("off")


# plt.show()


# -------- Tumor Metrics --------

print("\nPrediction:", label)

print("Tumor Pixel Count:", tumor_pixels)

print("Tumor Area:", tumor_area)

print("Tumor Coverage %:", coverage)

print("Estimated Tumor Diameter:", diameter)

print("Tumor Severity Score:", severity)

plt.show()