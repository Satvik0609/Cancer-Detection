"""
Prostate MRI Analysis Package
Medical-grade AI system for prostate cancer detection
"""

from .analysis import analyze_tumor_comprehensive, create_tumor_overlay, get_medical_risk_assessment
from .visualization import create_multi_panel_display, plot_training_history
from .model import create_advanced_model, create_medical_callbacks, progressive_training_strategy, evaluate_medical_model

__version__ = "1.0.0"
__author__ = "Cancer Detection Team"
__description__ = "Advanced AI system for prostate MRI analysis with 95%+ accuracy target"

__all__ = [
    'analyze_tumor_comprehensive',
    'create_tumor_overlay', 
    'get_medical_risk_assessment',
    'create_multi_panel_display',
    'plot_training_history',
    'create_advanced_model',
    'create_medical_callbacks',
    'progressive_training_strategy',
    'evaluate_medical_model'
]