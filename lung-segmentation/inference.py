#!/usr/bin/env python3
"""
Lung Tumor Segmentation Inference Script

This script provides easy-to-use functions for running tumor segmentation
on new lung CT images using the trained model.
"""

import tensorflow as tf
import keras
import cv2
import numpy as np
import matplotlib.pyplot as plt
import os
from pathlib import Path

class LungSegmentationInference:
    def __init__(self, model_path="trained-models/tumor_segmentation.keras"):
        """Initialize the segmentation inference pipeline."""
        self.model_path = model_path
        self.model = None
        self.load_model()
    
    def dice_coef(self, y_true, y_pred, smooth=1):
        """Dice coefficient metric."""
        y_true_f = tf.cast(tf.reshape(y_true, [-1]), tf.float32)
        y_pred_f = tf.cast(tf.reshape(y_pred, [-1]), tf.float32)
        intersection = tf.reduce_sum(y_true_f * y_pred_f)
        return (2. * intersection + smooth) / (tf.reduce_sum(y_true_f) + tf.reduce_sum(y_pred_f) + smooth)
    
    def iou_score(self, y_true, y_pred, smooth=1):
        """IoU score metric."""
        y_true_f = tf.cast(tf.reshape(y_true, [-1]), tf.float32)
        y_pred_f = tf.cast(tf.reshape(y_pred, [-1]), tf.float32)
        intersection = tf.reduce_sum(y_true_f * y_pred_f)
        union = tf.reduce_sum(y_true_f) + tf.reduce_sum(y_pred_f) - intersection
        return (intersection + smooth) / (union + smooth)
    
    def bce_dice_loss(self, y_true, y_pred):
        """Combined BCE and Dice loss."""
        bce = tf.keras.losses.binary_crossentropy(y_true, y_pred)
        dice = 1 - self.dice_coef(y_true, y_pred)
        return bce + dice
    
    def load_model(self):
        """Load the trained segmentation model."""
        try:
            self.model = tf.keras.models.load_model(
                self.model_path,
                custom_objects={
                    "bce_dice_loss": self.bce_dice_loss,
                    "dice_coef": self.dice_coef,
                    "iou_score": self.iou_score
                }
            )
            print(f"✓ Model loaded successfully from {self.model_path}")
            print(f"✓ Input shape: {self.model.input_shape}")
            print(f"✓ Output shape: {self.model.output_shape}")
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            self.model = None
    
    def preprocess_image(self, image_path, target_size=(512, 512)):
        """Preprocess input image for model inference."""
        # Load image
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError(f"Could not load image: {image_path}")
        
        # Convert to RGB and resize
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        resized = cv2.resize(img_rgb, target_size)
        
        # Normalize to [0, 1]
        normalized = resized.astype(np.float32) / 255.0
        
        # Add batch dimension
        input_img = np.expand_dims(normalized, axis=0)
        
        return input_img, resized
    
    def predict(self, image_path, threshold=0.5):
        """Run segmentation prediction on an image."""
        if self.model is None:
            raise ValueError("Model not loaded. Please check model path.")
        
        # Preprocess image
        input_img, original_resized = self.preprocess_image(image_path)
        
        # Run prediction
        prediction = self.model.predict(input_img, verbose=0)[0]
        
        # Apply threshold to get binary mask
        binary_mask = (prediction > threshold).astype(np.uint8) * 255
        
        # Calculate tumor statistics
        tumor_pixels = np.sum(binary_mask > 0)
        total_pixels = binary_mask.shape[0] * binary_mask.shape[1]
        tumor_percentage = (tumor_pixels / total_pixels) * 100
        
        return {
            'prediction': prediction,
            'binary_mask': binary_mask,
            'original_image': original_resized,
            'tumor_percentage': tumor_percentage,
            'tumor_pixels': tumor_pixels
        }
    
    def visualize_results(self, result, save_path=None):
        """Visualize segmentation results."""
        fig, axes = plt.subplots(1, 3, figsize=(15, 5))
        
        # Original image
        axes[0].imshow(result['original_image'])
        axes[0].set_title('Original Image')
        axes[0].axis('off')
        
        # Segmentation mask
        axes[1].imshow(result['binary_mask'], cmap='gray')
        axes[1].set_title('Tumor Segmentation')
        axes[1].axis('off')
        
        # Overlay
        axes[2].imshow(result['original_image'])
        axes[2].imshow(result['binary_mask'], alpha=0.3, cmap='Reds')
        axes[2].set_title(f'Overlay (Tumor: {result["tumor_percentage"]:.2f}%)')
        axes[2].axis('off')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"✓ Results saved to {save_path}")
        
        plt.show()

def main():
    """Example usage of the segmentation pipeline."""
    # Initialize inference pipeline
    segmenter = LungSegmentationInference()
    
    # Example image path (update with your image)
    image_path = "data/positives/0.png"
    
    if os.path.exists(image_path):
        # Run segmentation
        result = segmenter.predict(image_path)
        
        # Display results
        print(f"Tumor area: {result['tumor_percentage']:.2f}% of image")
        segmenter.visualize_results(result)
    else:
        print(f"Example image not found: {image_path}")
        print("Please update the image_path variable with a valid image.")

if __name__ == "__main__":
    main()