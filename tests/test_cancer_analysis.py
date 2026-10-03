"""
Unit tests for DNA-ALX Cancer Risk & Variant Analysis Module
"""

import sys
import os
import csv
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.ml.cancer_features import normalize_cancer_features, calculate_variant_contribution
from backend.ml.predict_cancer import analyze_cancer_variants

def test_cancer_dataset_exists_and_valid():
    dataset_path = "data/synthetic_cancer_variant_evidence.csv"
    assert os.path.exists(dataset_path), "Dataset does not exist!"
    with open(dataset_path, "r", encoding="utf-8") as f:
        reader = list(csv.DictReader(f))
    assert len(reader) >= 1000, f"Expected >= 1000 records, got {len(reader)}"
    allowed_categories = {
        "Lower Research Signal",
        "Moderate Research Signal",
        "Elevated Research Signal",
        "High Research Signal"
    }
    for row in reader[:50]:
        assert row["research_category"] in allowed_categories
        assert 0.0 <= float(row["population_frequency"]) <= 1.0
        assert 0.0 <= float(row["functional_effect"]) <= 1.0
        assert 0.0 <= float(row["quality_score"]) <= 1.0
        assert 0 <= float(row["synthetic_cancer_association_score"]) <= 100

def test_feature_normalization():
    raw = {
        "population_frequency": -0.5, # should clamp to 0.0
        "functional_effect": 1.5,     # should clamp to 1.0
        "quality_score": 0.95,
        "evidence_count": 50,
        "evidence_consistency": 0.85,
        "annotation_completeness": 0.9,
        "conservation_score": 0.7,
        "literature_evidence_count": 10
    }
    norm = normalize_cancer_features(raw)
    assert norm["population_frequency"] == 0.0
    assert norm["functional_effect"] == 1.0
    assert 0.0 <= norm["evidence_count"] <= 1.0
    assert 0.0 <= norm["literature_evidence_count"] <= 1.0

def test_variant_contribution():
    norm = {
        "population_frequency": 0.001,
        "functional_effect": 0.9,
        "quality_score": 0.95,
        "evidence_count": 0.8,
        "evidence_consistency": 0.92,
        "annotation_completeness": 0.95,
        "conservation_score": 0.88,
        "literature_evidence_count": 0.5
    }
    res = calculate_variant_contribution(norm)
    assert res["contribution_points"] > 10
    assert res["research_priority"] in ("High", "Medium", "Low")
    assert len(res["increasing_factors"]) > 0

def test_full_cancer_analysis_pipeline():
    result = analyze_cancer_variants([], "DNA-2026-0042")
    assert result["sample_id"] == "DNA-2026-0042"
    assert result["analysis_status"] == "Completed"
    assert 0 <= result["research_risk_indicator"] <= 100
    assert result["research_category"] in (
        "Lower Research Signal",
        "Moderate Research Signal",
        "Elevated Research Signal",
        "High Research Signal"
    )
    assert result["model_confidence_pct"] == 84
    assert len(result["variants"]) == 8
    assert "disclaimer" in result
    assert "not a medical diagnosis" in result["disclaimer"].lower()

if __name__ == "__main__":
    test_cancer_dataset_exists_and_valid()
    test_feature_normalization()
    test_variant_contribution()
    test_full_cancer_analysis_pipeline()
    print("All Cancer Risk & Variant Analysis tests passed successfully!")
