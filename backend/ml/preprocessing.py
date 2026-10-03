"""
DNA-ALX Preprocessing Module
Extracts and validates feature vectors from synthetic genetic data and difference calls.
"""

import json

FEATURE_COLUMNS = [f"variant_{chr(65 + i)}" for i in range(15)]

def validate_features(feature_dict):
    """
    Validates that a feature dictionary contains all required variant keys (0 or 1).
    """
    vector = []
    for feat in FEATURE_COLUMNS:
        val = feature_dict.get(feat, 0)
        if val not in (0, 1, "0", "1", True, False):
            raise ValueError(f"Feature {feat} must be binary (0 or 1), got {val}")
        vector.append(int(val))
    return vector

def map_variants_to_feature_vector(detected_variant_ids, mapping_file="data/dna_variant_mapping.csv"):
    """
    Given a list of detected variant IDs, returns a dictionary of {variant_A: 0|1, ...}.
    """
    import csv
    mapping = {}
    try:
        with open(mapping_file, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                mapping[row["variant_id"]] = row["ml_feature"]
    except Exception:
        # Fallback mapping
        for i in range(15):
            var_id = f"SIM_VAR_{i+1:03d}"
            feat = f"variant_{chr(65 + i)}"
            mapping[var_id] = feat

    feature_dict = {f"variant_{chr(65 + i)}": 0 for i in range(15)}
    for var_id in detected_variant_ids:
        if var_id in mapping and mapping[var_id] in feature_dict:
            feature_dict[mapping[var_id]] = 1

    return feature_dict
