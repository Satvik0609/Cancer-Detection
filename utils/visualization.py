import cv2

def create_overlay(image, mask):

    # resize mask to match original image size
    mask = cv2.resize(mask, (image.shape[1], image.shape[0]))

    # convert mask to color
    colored_mask = cv2.applyColorMap(mask, cv2.COLORMAP_JET)

    # blend original image and heatmap
    overlay = cv2.addWeighted(image, 0.7, colored_mask, 0.3, 0)

    return overlay


def draw_bounding_box(image, bbox):

    if bbox is None:
        return image

    x, y, w, h = bbox

    cv2.rectangle(image, (x, y), (x + w, y + h), (0,255,0), 2)

    return image