"""
Medical Visualization Module
Multi-panel display for prostate MRI analysis
"""

import cv2
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from typing import Dict, Optional
from .analysis import analyze_tumor_comprehensive, create_tumor_overlay, get_medical_risk_assessment

def create_multi_panel_display(image_path: str, mask_path: Optional[str] = None, 
                             prediction: Optional[str] = None) -> Optional[Dict]:
    """
    Create comprehensive 6-panel display for MRI prostate analysis
    
    Args:
        image_path: Path to MRI image
        mask_path: Optional path to segmentation mask
        prediction: Optional AI prediction result
        
    Returns:
        Analysis results dictionary or None if failed
    """
    
    # Load MRI image
    if isinstance(image_path, str):
        image = cv2.imread(image_path)
        if image is None:
            print(f"❌ Could not load MRI image: {image_path}")
            return None
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    else:
        image = image_path
    
    # Load or create mask
    mask = None
    if mask_path and os.path.exists(mask_path):
        mask = cv2.imread(mask_path, cv2.IMREAD_GRAYSCALE)
    
    # Analyze tumor in MRI
    analysis = analyze_tumor_comprehensive(image, mask)
    mask = analysis['mask']
    overlay = create_tumor_overlay(image, mask)
    
    # Create 6-panel figure optimized for MRI display
    fig, axes = plt.subplots(2, 3, figsize=(20, 14))
    fig.suptitle('🔬 Complete MRI Prostate Tumor Analysis - Medical Grade', 
                 fontsize=18, fontweight='bold', color='darkblue')
    
    # Panel 1: Original MRI Image
    axes[0, 0].imshow(image, cmap='gray' if len(image.shape) == 2 else None)
    axes[0, 0].set_title('📸 Original MRI Image', fontweight='bold', fontsize=14)
    axes[0, 0].axis('off')
    
    # Panel 2: Segmentation Mask
    axes[0, 1].imshow(mask, cmap='hot')
    axes[0, 1].set_title('🎯 Tumor Segmentation Mask', fontweight='bold', fontsize=14)
    axes[0, 1].axis('off')
    
    # Panel 3: Tumor Overlay
    axes[0, 2].imshow(overlay)
    axes[0, 2].set_title('🔴 Tumor Overlay on MRI', fontweight='bold', fontsize=14)
    axes[0, 2].axis('off')
    
    # Panel 4: Bounding Box & Contours
    bbox_image = image.copy()
    if analysis['bounding_box']:
        x, y, w, h = analysis['bounding_box']
        cv2.rectangle(bbox_image, (x, y), (x+w, y+h), (0, 255, 0), 4)
        cv2.drawContours(bbox_image, analysis['contours'], -1, (255, 255, 0), 3)
    axes[1, 0].imshow(bbox_image)
    axes[1, 0].set_title('📦 Bounding Box & Contours', fontweight='bold', fontsize=14)
    axes[1, 0].axis('off')
    
    # Panel 5: Medical Metrics
    axes[1, 1].axis('off')
    metrics_text = f\"\"\"📊 COMPREHENSIVE TUMOR METRICS

🔢 Tumor Pixel Count: {analysis['tumor_pixels']:,}
📐 Tumor Area: {analysis['tumor_area']:.1f} px²
📏 Tumor Coverage %: {analysis['coverage_percent']:.2f}%
⭕ Estimated Tumor Diameter: {analysis['diameter']:.1f} px
⚠️  Tumor Severity Score: {analysis['severity_score']:.1f}/100

🏥 MRI Analysis Type: Transverse Plane
🤖 AI Prediction: {prediction if prediction else 'Analyzing...'}
📅 Analysis Date: {np.datetime64('today')}\"\"\"
    
    axes[1, 1].text(0.05, 0.95, metrics_text, transform=axes[1, 1].transAxes,
                     fontsize=12, verticalalignment='top', fontfamily='monospace',
                     bbox=dict(boxstyle='round,pad=0.5', facecolor='lightcyan', alpha=0.9))
    
    # Panel 6: Medical Severity Gauge
    axes[1, 2].axis('off')
    severity = analysis['severity_score']
    
    # Get medical risk assessment
    gauge_color, risk_level, risk_desc = get_medical_risk_assessment(severity)
    
    # Draw enhanced medical gauge
    circle = Circle((0.5, 0.5), 0.35, color=gauge_color, alpha=0.8)
    axes[1, 2].add_patch(circle)
    
    # Add severity score
    axes[1, 2].text(0.5, 0.65, f'{severity:.1f}', ha='center', va='center',
                     fontsize=24, fontweight='bold', transform=axes[1, 2].transAxes, color='white')
    
    # Add risk level
    axes[1, 2].text(0.5, 0.45, risk_level, ha='center', va='center',
                     fontsize=12, fontweight='bold', transform=axes[1, 2].transAxes, color='white')
    
    # Add risk description
    axes[1, 2].text(0.5, 0.25, risk_desc.split(' - ')[1] if ' - ' in risk_desc else risk_desc, 
                     ha='center', va='center', fontsize=9, transform=axes[1, 2].transAxes, 
                     color='white', wrap=True)
    
    axes[1, 2].set_title('🌡️ Medical Severity Assessment', fontweight='bold', fontsize=14)
    axes[1, 2].set_xlim(0, 1)
    axes[1, 2].set_ylim(0, 1)
    
    plt.tight_layout()
    plt.show()
    return analysis

def plot_training_history(history, title="Model Training History"):
    """
    Plot training history for model performance analysis
    
    Args:
        history: Keras training history object
        title: Plot title
    """
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 5))
    
    # Plot accuracy
    ax1.plot(history.history['accuracy'], label='Training Accuracy', marker='o')
    ax1.plot(history.history['val_accuracy'], label='Validation Accuracy', marker='s')
    ax1.set_title('Model Accuracy')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Accuracy')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # Plot loss
    ax2.plot(history.history['loss'], label='Training Loss', marker='o')
    ax2.plot(history.history['val_loss'], label='Validation Loss', marker='s')
    ax2.set_title('Model Loss')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Loss')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    plt.suptitle(title, fontsize=16, fontweight='bold')
    plt.tight_layout()
    plt.show()