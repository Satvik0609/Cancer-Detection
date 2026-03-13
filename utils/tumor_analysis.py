import cv2
import numpy as np

def analyze_tumor(mask):

    # Count tumor pixels
    tumor_pixels = np.sum(mask == 255)

    # Total pixels in image
    total_pixels = mask.shape[0] * mask.shape[1]

    # Tumor area
    tumor_area = tumor_pixels

    # Tumor coverage percentage
    coverage = (tumor_pixels / total_pixels) * 100

    # # Find tumor contours
    # contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # diameter = 0
    # bbox = None

    # if contours:

    #     # largest contour assumed tumor
    #     c = max(contours, key=cv2.contourArea)

    #     x, y, w, h = cv2.boundingRect(c)

    #     bbox = (x, y, w, h)

    #     diameter = max(w, h)
    
    # clean the mask first
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

# find contours
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    diameter = 0
    bbox = None

    if contours:

    # keep only large contours
        contours = sorted(contours, key=cv2.contourArea, reverse=True)

    for c in contours:

        area = cv2.contourArea(c)

        if area > 500:   # ignore very small regions

            x, y, w, h = cv2.boundingRect(c)

            bbox = (x, y, w, h)

            diameter = max(w, h)

            break

    # Tumor severity score
    if coverage < 5:
        severity = "Low"
    elif coverage < 15:
        severity = "Moderate"
    else:
        severity = "High"

    return tumor_pixels, tumor_area, coverage, diameter, severity, bbox