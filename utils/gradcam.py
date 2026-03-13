import tensorflow as tf
import numpy as np
import cv2

def generate_gradcam(model, image, layer_name="Conv_1"):

    img = np.expand_dims(image, axis=0)

    grad_model = tf.keras.models.Model(
        [model.inputs],
        [model.get_layer(layer_name).output, model.output]
    )

    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img)
        loss = predictions[:,0]

    grads = tape.gradient(loss, conv_outputs)

    pooled_grads = tf.reduce_mean(grads, axis=(0,1,2))

    conv_outputs = conv_outputs[0]

    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]

    heatmap = tf.squeeze(heatmap)

    heatmap = np.maximum(heatmap, 0)

    heatmap /= np.max(heatmap)

    heatmap = cv2.resize(heatmap, (128,128))

    heatmap = np.uint8(255 * heatmap)

    return heatmap