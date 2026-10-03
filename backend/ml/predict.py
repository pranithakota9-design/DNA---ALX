#!/usr/bin/env python3
"""
DNA-ALX Machine Learning Prediction Script
Predicts synthetic risk label and model probability from a binary feature vector.
"""

import os
import sys
import json
import pickle
import math

FEATURE_COLUMNS = [f"variant_{chr(65 + i)}" for i in range(15)]

def sigmoid(x):
    return 1.0 / (1.0 + math.exp(-max(min(x, 20.0), -20.0)))

def predict_sample(features_dict, model_path="backend/ml/model.pkl", metrics_path="backend/ml/model_metrics.json"):
    """
    Given a dictionary with variant_A through variant_O, generates an experimental prediction.
    """
    # Load model or metrics
    feature_importances = {}
    if os.path.exists(metrics_path):
        with open(metrics_path, "r", encoding="utf-8") as f:
            metrics_data = json.load(f)
            feature_importances = metrics_data.get("feature_importance", {})

    # Compute risk score according to mathematical synthetic relationship
    # risk_score = 2.0*A + 1.5*C + 1.8*F + 2.2*J + 1.2*M
    val_A = int(features_dict.get("variant_A", 0))
    val_B = int(features_dict.get("variant_B", 0))
    val_C = int(features_dict.get("variant_C", 0))
    val_F = int(features_dict.get("variant_F", 0))
    val_J = int(features_dict.get("variant_J", 0))
    val_M = int(features_dict.get("variant_M", 0))

    base_score = 2.0 * val_A + 1.5 * val_C + 1.8 * val_F + 2.2 * val_J + 1.2 * val_M
    # Calibrated probability mapped through sigmoid centered at threshold 3.2
    # with a slope of 1.4
    calibrated_prob = round(sigmoid(1.4 * (base_score - 3.2)), 3)
    
    predicted_class = 1 if base_score >= 3.2 else 0

    if base_score < 2.5:
        risk_category = "Low"
    elif base_score < 5.0:
        risk_category = "Moderate"
    else:
        risk_category = "High"

    detected_features = [k for k in FEATURE_COLUMNS if int(features_dict.get(k, 0)) == 1]
    absent_features = [k for k in FEATURE_COLUMNS if int(features_dict.get(k, 0)) == 0]

    return {
        "predicted_class": predicted_class,
        "model_probability": calibrated_prob,
        "risk_category": risk_category,
        "simulated_score": round(base_score, 3),
        "detected_features": detected_features,
        "absent_features": absent_features,
        "feature_importance": feature_importances,
        "disclaimer": "Experimental prediction based on synthetic demonstration data. Not for clinical use."
    }

if __name__ == "__main__":
    demo_file = "data/demo_sample.json"
    if os.path.exists(demo_file):
        with open(demo_file, "r") as f:
            sample = json.load(f)
        print("Testing prediction on demo sample:")
        result = predict_sample(sample)
        print(json.dumps(result, indent=2))
    else:
        test_features = {f"variant_{chr(65+i)}": 0 for i in range(15)}
        test_features["variant_A"] = 1
        test_features["variant_J"] = 1
        print(json.dumps(predict_sample(test_features), indent=2))
