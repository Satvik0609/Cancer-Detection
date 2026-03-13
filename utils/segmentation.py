# import cv2
# import numpy as np

# def segment_tumor(image):

#     # Convert image to grayscale
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

#     # Apply Gaussian blur to reduce noise
#     blur = cv2.GaussianBlur(gray, (5,5), 0)

#     # Apply threshold to separate lesion region
#     _, mask = cv2.threshold(blur, 120, 255, cv2.THRESH_BINARY)

#     return mask




# #below is updated code



# # import cv2
# # import numpy as np

# # def segment_tumor(image):

# #     # Convert image to grayscale
# #     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# #     # Apply Gaussian blur to reduce noise
# #     blur = cv2.GaussianBlur(gray, (5,5), 0)

# #     # Otsu automatic thresholding
# #     _, mask = cv2.threshold(
# #         blur,
# #         0,
# #         255,
# #         cv2.THRESH_BINARY + cv2.THRESH_OTSU
# #     )

# #     # Remove small noise using morphological opening
# #     kernel = np.ones((3,3), np.uint8)
# #     mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=2)

# #     # Fill gaps using dilation
# #     mask = cv2.dilate(mask, kernel, iterations=1)

# #     return mask