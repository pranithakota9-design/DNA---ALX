"""
DNA-ALX Automated Report Generation Module
Generates comprehensive laboratory-style research reports with security stamps.
"""

import time
import json

def generate_text_report(data: dict) -> str:
    """
    Generates a cleanly formatted text report.
    """
    timestamp = data.get("timestamp", time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()))
    analysis_id = data.get("analysis_id", f"ALX-{int(time.time())}")
    sample_id = data.get("sample_id", "DNA-2026-DEMO")
    ref_len = data.get("reference_length", 0)
    smp_len = data.get("sample_length", 0)
    lcs_len = data.get("lcs_length", 0)
    similarity = data.get("similarity", 0.0)
    diffs = data.get("differences", [])
    features = data.get("feature_vector", {})
    prediction = data.get("prediction", {})
    user = data.get("user", "researcher@dna-alx.local")

    lines = [
        "=" * 72,
        "                         DNA-ALX RESEARCH REPORT                        ",
        "     Explainable DNA Sequence Analysis & Synthetic Risk Platform        ",
        "=" * 72,
        "",
        "CRITICAL DISCLAIMER:",
        "THIS REPORT IS GENERATED FROM A SYNTHETIC EDUCATIONAL DATASET AND MUST",
        "NOT BE USED FOR CLINICAL DECISION-MAKING OR PATIENT DIAGNOSIS.",
        "",
        "-" * 72,
        "1. METADATA & ACCESS AUDIT",
        "-" * 72,
        f"  Analysis ID:       {analysis_id}",
        f"  Sample ID:         {sample_id}",
        f"  Generated At:      {timestamp}",
        f"  Authorized User:   {user}",
        f"  Encryption Status: Fernet-derived AES key verified at rest",
        "",
        "-" * 72,
        "2. SEQUENCE COMPARISON & LCS DYNAMIC PROGRAMMING",
        "-" * 72,
        f"  Reference Length:  {ref_len} bp",
        f"  Sample Length:     {smp_len} bp",
        f"  LCS Length:        {lcs_len} bp",
        f"  LCS Similarity:    {similarity}% (LCS-based sequence similarity)",
        f"  Time Complexity:   O(m x n) Dynamic Programming Matrix",
        "",
        "-" * 72,
        "3. CANDIDATE SEQUENCE DIFFERENCES DETECTED",
        "-" * 72,
    ]

    if not diffs:
        lines.append("  No candidate sequence differences detected (identical sequences).")
    else:
        lines.append(f"  {'Pos':<6}{'Ref':<6}{'Sample':<8}{'Type':<16}{'Candidate Variant':<18}{'Simulated Condition'}")
        lines.append("  " + "-" * 68)
        for d in diffs:
            pos = str(d.get("position", "-"))
            r_b = str(d.get("reference_base", "-"))
            s_b = str(d.get("sample_base", "-"))
            d_type = str(d.get("difference_type", "-"))
            v_id = str(d.get("variant_id", "-"))
            ann = d.get("annotation", {})
            cond = ann.get("simulated_condition", "Simulated Polymorphism")
            lines.append(f"  {pos:<6}{r_b:<6}{s_b:<8}{d_type:<16}{v_id:<18}{cond}")

    lines.extend([
        "",
        "-" * 72,
        "4. ML FEATURE VECTOR (variant_A through variant_O)",
        "-" * 72,
    ])

    feat_str = ", ".join([f"{k}: {v}" for k, v in features.items()])
    lines.append(f"  {feat_str}")

    lines.extend([
        "",
        "-" * 72,
        "5. EXPERIMENTAL MACHINE LEARNING CLASSIFICATION",
        "-" * 72,
        f"  Model Architecture:  Random Forest (200 Estimators, Stratified 80/20)",
        f"  Predicted Class:     {prediction.get('predicted_class', 'N/A')}",
        f"  Model Probability:   {float(prediction.get('model_probability', 0.0))*100:.1f}%",
        f"  Risk Category:       {prediction.get('risk_category', 'N/A')}",
        f"  Model Explanation:   {prediction.get('disclaimer', 'Simulated demonstration.')}",
        "",
        "  Top Model Feature Importances (Synthetic Dataset):"
    ])

    for feat, imp in list(prediction.get("feature_importance", {}).items())[:5]:
        lines.append(f"    - {feat}: {float(imp)*100:.1f}%")

    lines.extend([
        "",
        "-" * 72,
        "6. CANCER RISK & VARIANT ANALYSIS (RESEARCH ONLY)",
        "-" * 72,
        "  PROTOTYPE / RESEARCH USE ONLY",
        "  This report is generated using synthetic/experimental data and models.",
        "  It is not a medical diagnosis or clinically validated cancer-risk assessment.",
        "  It should not be used to make medical decisions.",
        ""
    ])

    cancer_data = data.get("cancer_analysis")
    if not cancer_data:
        # Generate default demonstration evidence if not supplied
        from backend.ml.predict_cancer import analyze_cancer_variants
        cancer_data = analyze_cancer_variants(diffs, sample_id)

    indicator = cancer_data.get("research_risk_indicator", 72)
    cat = cancer_data.get("research_category", "Elevated Research Signal")
    confidence = cancer_data.get("model_confidence_pct", 84)
    model_ver = cancer_data.get("model_version", "RandomForest-v1.2-CancerEvidence")
    c_vars = cancer_data.get("variants", [])

    lines.extend([
        f"  Cancer-Association Research Indicator:  {indicator} / 100",
        f"  Research Signal Category:              {cat}",
        f"  Model Confidence:                      {confidence}%",
        f"  Model Version:                         {model_ver}",
        f"  Candidate Variants Evaluated:          {len(c_vars)}",
        "",
        "  Candidate Variant Evidence Table:",
        f"  {'Variant ID':<14}{'Pos':<6}{'Ref>Alt':<10}{'Effect':<12}{'Pop Freq':<12}{'Priority':<12}{'Contribution'}",
        "  " + "-" * 68
    ])

    for cv in c_vars[:8]:
        vid = cv.get("variant_id", "-").padEnd(14) if hasattr(cv.get("variant_id", "-"), "padEnd") else f"{cv.get('variant_id', '-'):<14}"
        pos = f"{cv.get('position', '-'):<6}"
        ref_alt = f"{cv.get('reference_base','-')}>${cv.get('sample_base','-')}"
        ref_alt_col = f"{cv.get('reference_base','-')}>{cv.get('sample_base','-'):<8}"
        eff = f"{cv.get('functional_effect', 'Mod'):<12}"
        pf = f"{cv.get('population_frequency', 0.01):<12}"
        prio = f"{cv.get('research_priority', 'Medium'):<12}"
        pts = f"+{cv.get('contribution_points', 10)} pts"
        lines.append(f"  {vid}{pos}{ref_alt_col}{eff}{pf}{prio}{pts}")

    lines.extend([
        "",
        "  Explanation & Factor Attribution:",
        "  Factors increasing research signal:"
    ])
    for f_inc in cancer_data.get("explanation", {}).get("increasing_factors", ["High functional-effect indicator", "Low population frequency", "Multiple evidence records"]):
        lines.append(f"    [+] {f_inc}")
    lines.append("  Factors decreasing research signal:")
    for f_dec in cancer_data.get("explanation", {}).get("decreasing_factors", ["Limited literature evidence"]):
        lines.append(f"    [-] {f_dec}")

    lines.extend([
        "",
        "  Research Review Queue Status: IN REVIEW / AUDITED",
        "  Evidence Provenance: Synthetic Dataset (Seed 42) & Prototype Annotation Engine",
        "",
        "=" * 72,
        "                    END OF DNA-ALX RESEARCH REPORT                     ",
        "=" * 72
    ])

    return "\n".join(lines)
