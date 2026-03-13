"""
Prostate MRI Analysis Core Functions
Medical-grade tumor detection and analysis
"""

import cv2
import numpy as np
from typing import Dict, List, Tuple, Optional

def analyze_tumor_comprehensive(image: np.ndarray, mask: Optional[np.ndarray] = None) -> Dict:
    """
    Comprehensive tumor analysis with medical-grade metrics
    
    Args:
        image: Input MRI image (RGB format)
        mask: Optional pre-computed segmentation mask
        
    Returns:
        Dictionary containing all tumor metrics
    """
    
    if mask is None:
        # Enhanced mask creation for MRI images
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        
        # Use multiple thresholding techniques for better MRI analysis
        # Otsu's thresholding for automatic threshold selection
        _, otsu_mask = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Adaptive thresholding for local variations
        adaptive_mask = cv2.adaptiveThreshold(
            gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
        )
        
        # Combine both masks
        mask = cv2.bitwise_or(otsu_mask, adaptive_mask)
        
        # Morphological operations to clean up
        kernel = np.ones((5, 5), np.uint8)
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
        
        # Remove small noise
        mask = cv2.medianBlur(mask, 5)
    
    if len(mask.shape) == 3:
        mask = cv2.cvtColor(mask, cv2.COLOR_RGB2GRAY)
    
    _, binary_mask = cv2.threshold(mask, 127, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(binary_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if not contours:
        return {
            'tumor_pixels': 0, 'tumor_area': 0, 'coverage_percent': 0,
            'diameter': 0, 'severity_score': 0, 'bounding_box': None,
            'contours': [], 'mask': binary_mask
        }
    
    # Filter contours by area to remove noise
    min_area = 100  # Minimum area for a valid tumor region
    valid_contours = [c for c in contours if cv2.contourArea(c) > min_area]
    
    if not valid_contours:
        return {
            'tumor_pixels': 0, 'tumor_area': 0, 'coverage_percent': 0,
            'diameter': 0, 'severity_score': 0, 'bounding_box': None,
            'contours': [], 'mask': binary_mask
        }
    
    # Get largest contour (main tumor)
    largest_contour = max(valid_contours, key=cv2.contourArea)
    
    # Calculate comprehensive metrics
    tumor_pixels = cv2.countNonZero(binary_mask)
    total_pixels = image.shape[0] * image.shape[1]
    coverage_percent = (tumor_pixels / total_pixels) * 100
    
    # Bounding box
    x, y, w, h = cv2.boundingRect(largest_contour)
    
    # Estimated diameter (equivalent diameter of a circle with same area)
    tumor_area = cv2.contourArea(largest_contour)
    diameter = 2 * np.sqrt(tumor_area / np.pi) if tumor_area > 0 else 0
    
    # Enhanced severity score calculation
    perimeter = cv2.arcLength(largest_contour, True)
    if perimeter > 0:
        # Compactness (circularity measure)
        compactness = (4 * np.pi * tumor_area) / (perimeter ** 2)
        # Irregularity score (lower compactness = more irregular = higher severity)
        irregularity_score = (1 - compactness) * 40
    else:
        irregularity_score = 0
    
    # Size-based severity
    size_score = min(60, coverage_percent * 3)
    
    # Combined severity score (0-100)
    severity_score = min(100, size_score + irregularity_score)
    
    return {
        'tumor_pixels': tumor_pixels,
        'tumor_area': tumor_area,
        'coverage_percent': coverage_percent,
        'diameter': diameter,
        'severity_score': severity_score,
        'bounding_box': (x, y, w, h),
        'contours': valid_contours,
        'mask': binary_mask
    }

def create_tumor_overlay(image: np.ndarray, mask: np.ndarray, alpha: float = 0.4) -> np.ndarray:
    """
    Create tumor overlay with transparency optimized for MRI
    
    Args:
        image: Original MRI image
        mask: Tumor segmentation mask
        alpha: Transparency level (0-1)
        
    Returns:
        Image with tumor overlay
    """
    overlay = image.copy()
    if len(mask.shape) == 3:
        mask = cv2.cvtColor(mask, cv2.COLOR_RGB2GRAY)
    
    # Create colored overlay (red for tumor regions)
    colored_mask = np.zeros_like(image)
    colored_mask[mask > 127] = [255, 50, 50]  # Bright red for better visibility on MRI
    
    # Blend with original image
    overlay = cv2.addWeighted(image, 1-alpha, colored_mask, alpha, 0)
    
    return overlay

def get_medical_risk_assessment(severity_score: float) -> Tuple[str, str, str]:
    """
    Get medical risk assessment based on severity score
    
    Args:
        severity_score: Calculated severity score (0-100)
        
    Returns:
        Tuple of (color, risk_level, description)
    """
    if severity_score <= 20:
        return 'green', 'MINIMAL', 'Low Risk - Routine Follow-up'
    elif severity_score <= 40:
        return 'yellow', 'MILD', 'Mild Concern - Monitor Closely'
    elif severity_score <= 60:
        return 'orange', 'MODERATE', 'Moderate Risk - Medical Attention Required'
    elif severity_score <= 80:
        return 'red', 'HIGH', 'High Risk - Urgent Medical Review'
    else:
        return 'darkred', 'CRITICAL', 'Critical - Immediate Medical Intervention'