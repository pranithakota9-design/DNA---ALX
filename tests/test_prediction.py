"""
Unit tests for Machine Learning prediction
"""

import sys
import os
import json
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.ml.predict import predict_sample
from backend.ml.preprocessing import validate_features

def test_feature_validation():
    valid = {f"variant_{chr(65+i)}": 0 for i in range(15)}
    valid["variant_A"] = 1
    vec = validate_features(valid)
    assert len(vec) == 15
    assert vec[0] == 1

def test_demo_prediction():
    with open("data/demo_sample.json", "r") as f:
        demo_sample = json.load(f)
    res = predict_sample(demo_sample)
    assert res["predicted_class"] in (0, 1)
    assert 0.0 <= res["model_probability"] <= 1.0
    assert res["risk_category"] in ("Low", "Moderate", "High")
    assert "disclaimer" in res

if __name__ == "__main__":
    test_feature_validation()
    test_demo_prediction()
    print("All Prediction tests passed successfully!")
