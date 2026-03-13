"""
Advanced AI Model Architecture
EfficientNetB3-based model for prostate MRI analysis
"""

import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import EfficientNetB3
from tensorflow.keras.layers import Dropout, GlobalAveragePooling2D, BatchNormalization, Dense
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.regularizers import l2
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from typing import Tuple

def create_advanced_model(input_shape: Tuple[int, int, int] = (224, 224, 3), 
                         num_classes: int = 2, 
                         learning_rate: float = 0.0001) -> Tuple[tf.keras.Model, tf.keras.Model]:
    """
    Create EfficientNetB3 model optimized for MRI prostate analysis
    
    Args:
        input_shape: Input image shape (height, width, channels)
        num_classes: Number of output classes
        learning_rate: Initial learning rate
        
    Returns:
        Tuple of (compiled_model, base_model)
    """
    
    input_layer = layers.Input(shape=input_shape)
    
    # EfficientNetB3 backbone - excellent for medical imaging
    base_model = EfficientNetB3(
        weights='imagenet', 
        include_top=False, 
        input_tensor=input_layer
    )
    base_model.trainable = False  # Start with frozen backbone
    
    # Enhanced head for medical imaging
    x = base_model.output
    x = GlobalAveragePooling2D(name='global_avg_pool')(x)
    x = BatchNormalization(name='bn_1')(x)
    x = Dropout(0.4, name='dropout_1')(x)
    
    # First dense layer
    x = Dense(1024, activation='relu', kernel_regularizer=l2(0.001), name='dense_1')(x)
    x = BatchNormalization(name='bn_2')(x)
    x = Dropout(0.5, name='dropout_2')(x)
    
    # Second dense layer
    x = Dense(512, activation='relu', kernel_regularizer=l2(0.001), name='dense_2')(x)
    x = BatchNormalization(name='bn_3')(x)
    x = Dropout(0.4, name='dropout_3')(x)
    
    # Third dense layer for fine-grained features
    x = Dense(256, activation='relu', kernel_regularizer=l2(0.001), name='dense_3')(x)
    x = BatchNormalization(name='bn_4')(x)
    x = Dropout(0.3, name='dropout_4')(x)
    
    # Output layer
    outputs = Dense(num_classes, activation='softmax', name='medical_classification')(x)
    
    # Create model
    model = models.Model(inputs=input_layer, outputs=outputs, name='MRI_Prostate_Classifier')
    
    # Compile with medical-optimized settings
    model.compile(
        optimizer=Adam(learning_rate=learning_rate, beta_1=0.9, beta_2=0.999),
        loss='categorical_crossentropy',
        metrics=['accuracy', 'precision', 'recall']
    )
    
    return model, base_model

def create_medical_callbacks(model_save_path: str = 'best_prostate_model.h5') -> list:
    """
    Create callbacks optimized for medical model training
    
    Args:
        model_save_path: Path to save the best model
        
    Returns:
        List of Keras callbacks
    """
    
    callbacks = [
        ModelCheckpoint(
            model_save_path,
            monitor='val_accuracy',
            save_best_only=True,
            save_weights_only=False,
            mode='max',
            verbose=1,
            save_freq='epoch'
        ),
        EarlyStopping(
            monitor='val_accuracy',
            patience=15,
            restore_best_weights=True,
            mode='max',
            verbose=1,
            min_delta=0.001
        ),
        ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=8,
            min_lr=1e-7,
            verbose=1,
            cooldown=3
        )
    ]
    
    return callbacks

def progressive_training_strategy(model: tf.keras.Model, 
                                base_model: tf.keras.Model,
                                train_generator,
                                val_generator,
                                initial_epochs: int = 20,
                                fine_tune_epochs: int = 15,
                                initial_lr: float = 0.0001) -> list:
    """
    Progressive training strategy for maximum accuracy
    
    Args:
        model: Compiled Keras model
        base_model: Base model (backbone)
        train_generator: Training data generator
        val_generator: Validation data generator
        initial_epochs: Epochs for initial training
        fine_tune_epochs: Epochs for fine-tuning
        initial_lr: Initial learning rate
        
    Returns:
        List of training histories
    """
    
    print("🚀 Starting Progressive Training Strategy for Medical Accuracy")
    
    # Phase 1: Train only classifier heads (frozen backbone)
    print("\\n📚 Phase 1: Training classifier heads (backbone frozen)")
    
    callbacks = create_medical_callbacks('phase1_model.h5')
    
    history_phase1 = model.fit(
        train_generator,
        epochs=initial_epochs,
        validation_data=val_generator,
        callbacks=callbacks,
        verbose=1
    )
    
    # Phase 2: Fine-tune top layers
    print("\\n🔓 Phase 2: Fine-tuning top layers")
    
    # Unfreeze top layers of backbone
    base_model.trainable = True
    for layer in base_model.layers[:-30]:
        layer.trainable = False
    
    # Lower learning rate for fine-tuning
    model.compile(
        optimizer=Adam(learning_rate=initial_lr/10),
        loss='categorical_crossentropy',
        metrics=['accuracy', 'precision', 'recall']
    )
    
    callbacks = create_medical_callbacks('phase2_model.h5')
    
    history_phase2 = model.fit(
        train_generator,
        epochs=fine_tune_epochs,
        validation_data=val_generator,
        callbacks=callbacks,
        verbose=1
    )
    
    return [history_phase1, history_phase2]

def evaluate_medical_model(model: tf.keras.Model, test_generator) -> dict:
    """
    Comprehensive evaluation for medical model
    
    Args:
        model: Trained Keras model
        test_generator: Test data generator
        
    Returns:
        Dictionary of evaluation metrics
    """
    
    print("📊 Comprehensive Medical Model Evaluation")
    
    # Evaluate on test set
    test_results = model.evaluate(test_generator, verbose=1)
    
    # Extract metrics
    test_loss = test_results[0]
    test_accuracy = test_results[1]
    test_precision = test_results[2] if len(test_results) > 2 else 0
    test_recall = test_results[3] if len(test_results) > 3 else 0
    
    # Calculate F1 score
    test_f1 = 2 * (test_precision * test_recall) / (test_precision + test_recall) if (test_precision + test_recall) > 0 else 0
    
    results = {
        'accuracy': test_accuracy,
        'precision': test_precision,
        'recall': test_recall,
        'f1_score': test_f1,
        'loss': test_loss
    }
    
    print("\\n🎯 MEDICAL MODEL EVALUATION RESULTS:")
    print(f"📊 Test Accuracy: {test_accuracy:.4f} ({test_accuracy*100:.2f}%)")
    print(f"📊 Test Precision: {test_precision:.4f}")
    print(f"📊 Test Recall: {test_recall:.4f}")
    print(f"📊 Test F1-Score: {test_f1:.4f}")
    print(f"📊 Test Loss: {test_loss:.4f}")
    
    # Medical accuracy assessment
    if test_accuracy >= 0.95:
        print("\\n🏆 SUCCESS: 95%+ MEDICAL ACCURACY ACHIEVED!")
        print("🎉 Model ready for clinical evaluation!")
    else:
        print(f"\\n📈 Current: {test_accuracy*100:.2f}% - Additional training recommended for clinical use")
    
    return results