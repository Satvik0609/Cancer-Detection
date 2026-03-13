# Dataset Structure

Place your lung segmentation dataset in this directory with the following structure:

```
data/
├── positives/          # Original lung CT images
│   ├── 0.png
│   ├── 1.png
│   └── ...
├── masks/              # Corresponding segmentation masks
│   ├── 0.png
│   ├── 1.png
│   └── ...
└── README.md
```

## Dataset Requirements

- **Image Format**: PNG files (512x512 recommended)
- **Naming**: Corresponding images and masks should have the same filename
- **Mask Format**: Binary masks (0 for background, 255 for tumor regions)
- **Image Count**: Minimum 1000+ paired images for good training results

## Data Preprocessing

The training pipeline automatically handles:
- Image normalization (0-1 range)
- Resizing to model input dimensions
- Data augmentation (rotation, flipping, etc.)
- Train/validation splitting