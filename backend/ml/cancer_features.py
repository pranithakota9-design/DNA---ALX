"""
DNA-ALX Cancer Variant Feature Engineering Module
Converts raw synthetic variant evidence into normalized, model-ready feature vectors.
Includes explainability contribution logic and factor attribution.
"""

# Feature definitions for the cancer research model
CANCER_FEATURE_COLUMNS = [
    "population_frequency",
    "functional_effect",
    "quality_score",
    "evidence_count",
    "evidence_consistency",
    "annotation_completeness",
    "conservation_score",
    "literature_evidence_count"
]

FEATURE_BOUNDS = {
    "population_frequency": (0.0, 1.0),
    "functional_effect": (0.0, 1.0),
    "quality_score": (0.0, 1.0),
    "evidence_count": (0, 100),
    "evidence_consistency": (0.0, 1.0),
    "annotation_completeness": (0.0, 1.0),
    "conservation_score": (0.0, 1.0),
    "literature_evidence_count": (0, 100)
}

def normalize_cancer_features(raw_features: dict) -> dict:
    """
    Validates, clamps, and normalizes raw evidence attributes into [0.0, 1.0] range.
    Handles missing values with domain-appropriate synthetic defaults.
    """
    normalized = {}

    # Population frequency: default 0.01 (rare-ish), normalized inverted (rarer = closer to 1.0 for risk)
    pop_freq = float(raw_features.get("population_frequency", 0.01))
    pop_freq = max(0.0, min(1.0, pop_freq))
    normalized["population_frequency"] = pop_freq

    # Functional effect: 0.0 to 1.0
    func_eff = float(raw_features.get("functional_effect", 0.5))
    normalized["functional_effect"] = max(0.0, min(1.0, func_eff))

    # Quality score: 0.0 to 1.0 (default 0.90)
    qual = float(raw_features.get("quality_score", 0.90))
    normalized["quality_score"] = max(0.0, min(1.0, qual))

    # Evidence count: 0 to 50 scale -> normalize to 0-1
    ev_count = float(raw_features.get("evidence_count", 5))
    normalized["evidence_count"] = max(0.0, min(1.0, ev_count / 25.0))

    # Evidence consistency: 0.0 to 1.0 (default 0.75)
    ev_cons = float(raw_features.get("evidence_consistency", 0.75))
    normalized["evidence_consistency"] = max(0.0, min(1.0, ev_cons))

    # Annotation completeness: 0.0 to 1.0 (default 0.80)
    ann_comp = float(raw_features.get("annotation_completeness", 0.80))
    normalized["annotation_completeness"] = max(0.0, min(1.0, ann_comp))

    # Conservation score: 0.0 to 1.0 (default 0.60)
    cons = float(raw_features.get("conservation_score", 0.60))
    normalized["conservation_score"] = max(0.0, min(1.0, cons))

    # Literature evidence count: 0 to 20 scale -> normalize to 0-1
    lit_count = float(raw_features.get("literature_evidence_count", 3))
    normalized["literature_evidence_count"] = max(0.0, min(1.0, lit_count / 15.0))

    return normalized

def calculate_variant_contribution(norm_features: dict) -> dict:
    """
    Computes explainable research contribution points and identifying factors.
    Returns:
        {
            "contribution_points": int,
            "research_priority": "High" | "Medium" | "Low",
            "increasing_factors": list of str,
            "decreasing_factors": list of str
        }
    """
    # Weighted point components summing up to ~30 points per variant max
    func = norm_features["functional_effect"]
    pop = norm_features["population_frequency"]
    cons = norm_features["conservation_score"]
    ev_cons = norm_features["evidence_consistency"]
    ev_cnt = norm_features["evidence_count"]
    lit = norm_features["literature_evidence_count"]
    ann = norm_features["annotation_completeness"]

    pts = 0
    increasing = []
    decreasing = []

    # Functional effect (+8 max)
    if func >= 0.7:
        pts += 8
        increasing.append("High functional-effect indicator (predicted disruption)")
    elif func >= 0.4:
        pts += 4
    else:
        pts += 1
        decreasing.append("Low functional effect (likely neutral/synonymous)")

    # Population frequency (+6 max for rare)
    if pop < 0.005:
        pts += 6
        increasing.append("Low simulated population frequency (<0.5%)")
    elif pop < 0.02:
        pts += 3
    else:
        decreasing.append("Common population frequency (>2.0%)")

    # Conservation (+5 max)
    if cons >= 0.75:
        pts += 5
        increasing.append("High evolutionary conservation score")
    elif cons >= 0.5:
        pts += 3
    else:
        decreasing.append("Poor sequence conservation across homologues")

    # Evidence consistency (+4 max)
    if ev_cons >= 0.8:
        pts += 4
        increasing.append("High synthetic evidence consistency across databases")
    elif ev_cons < 0.6:
        decreasing.append("Conflicting / low consistency in synthetic records")

    # Evidence count (+3 max)
    if ev_cnt >= 0.4:
        pts += 3
        increasing.append("Multiple independent synthetic evidence records")
    else:
        decreasing.append("Limited evidence count")

    # Literature (+2 max)
    if lit >= 0.3:
        pts += 2
        increasing.append("Simulated literature citations present")
    else:
        decreasing.append("Limited literature evidence")

    # Priority tier
    if pts >= 18:
        priority = "High"
    elif pts >= 10:
        priority = "Medium"
    else:
        priority = "Low"

    return {
        "contribution_points": pts,
        "research_priority": priority,
        "increasing_factors": increasing,
        "decreasing_factors": decreasing
    }
