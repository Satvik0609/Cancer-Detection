# Lung Tumor Segmentation Pipeline

This directory contains the lung tumor segmentation implementation using deep learning techniques.

## Overview

The lung segmentation pipeline uses a U-Net based architecture to identify and segment tumor regions in lung CT scan images. The model is trained on paired image-mask datasets to learn pixel-level tumor detection.

## Directory Structure

```
lung-segmentation/
├── notebooks/
│   └── lung_segmentation_training.ipynb    # Main training notebook
├── trained-models/
│   ├── tumor_segmentation.keras            # Trained segmentation model
│   └── segmentation_training_log.csv       # Training metrics log
├── data/
│   └── (place your dataset here)
└── README.md
```

## Features

- **U-Net Architecture**: Deep learning model for precise tumor segmentation
- **Data Preprocessing**: Automated image normalization and augmentation
- **Training Pipeline**: Complete training workflow with callbacks
- **Evaluation Metrics**: Dice coefficient, IoU score, and BCE-Dice loss
- **Visualization**: Real-time training progress and result visualization

## Requirements

```
tensorflow>=2.16.1
keras>=3.0.0
opencv-python
numpy
matplotlib
```

## Usage

1. Place your dataset in the `data/` directory
2. Open `notebooks/lung_segmentation_training.ipynb`
3. Run the cells to train or load the pre-trained model
4. Use the model for inference on new lung CT images

## Model Performance

The trained model achieves:
- High Dice coefficient for tumor segmentation
- Robust performance across different image qualities
- Real-time inference capability

## GPU Support

The pipeline automatically detects and uses GPU acceleration when available with CUDA-compatible hardware.