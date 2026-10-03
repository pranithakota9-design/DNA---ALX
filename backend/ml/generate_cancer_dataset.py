#!/usr/bin/env python3
"""
Synthetic Cancer Variant Evidence Dataset Generator for DNA-ALX
Generates reproducible synthetic variant evidence records for educational & research demonstration.

DISCLAIMER:
THIS DATASET IS ENTIRELY SYNTHETIC AND IS CREATED ONLY FOR SOFTWARE DEMONSTRATION,
MACHINE-LEARNING EXPERIMENTATION, AND EDUCATIONAL PURPOSES.
IT DOES NOT REPRESENT REAL CLINICAL OUTCOMES OR REAL PATIENT MUTATIONS.
"""

import os
import csv
import random
import math

RANDOM_SEED = 42

def generate_cancer_variant_dataset(output_path="data/synthetic_cancer_variant_evidence.csv", num_records=1000):
    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    random.seed(RANDOM_SEED)

    header = [
        "variant_id",
        "population_frequency",
        "functional_effect",
        "quality_score",
        "evidence_count",
        "evidence_consistency",
        "annotation_completeness",
        "conservation_score",
        "literature_evidence_count",
        "synthetic_cancer_association_score",
        "research_category"
    ]

    rows = []
    for i in range(1, num_records + 1):
        # Generate artificial synthetic variant ID
        var_id = f"SIM_VAR_{i:04d}"

        # Population frequency: rare variants (0.0001 to 0.05) vs common polymorphisms
        is_rare = random.random() < 0.40
        if is_rare:
            pop_freq = round(random.uniform(0.0001, 0.005), 5)
        else:
            pop_freq = round(random.uniform(0.005, 0.08), 5)

        # Functional effect: 0.1 (low/synonymous) to 0.95 (high/nonsense/frameshift)
        func_effect = round(random.betavariate(2, 2.5), 3)
        func_effect = max(0.05, min(0.98, func_effect))

        # Quality score: 0.60 to 0.99
        qual_score = round(random.uniform(0.70, 0.99), 3)

        # Evidence count: 1 to 24 records
        evidence_count = random.randint(1, 24)

        # Evidence consistency: 0.45 to 0.99
        evidence_consistency = round(random.uniform(0.50, 0.98), 3)

        # Annotation completeness: 0.50 to 1.00
        ann_completeness = round(random.uniform(0.60, 1.00), 3)

        # Conservation score (e.g. GERP/PhyloP analog): 0.10 to 0.98
        conservation = round(random.uniform(0.15, 0.98), 3)

        # Literature evidence count: 0 to 16
        lit_count = random.randint(0, 16)

        # Synthetic scoring function:
        # Inverted population frequency (rarer = higher signal)
        inv_pop = max(0.0, 1.0 - (pop_freq / 0.08))
        
        # Weighted synthetic signal components
        raw_score = (
            30.0 * func_effect +
            18.0 * inv_pop +
            16.0 * conservation +
            14.0 * evidence_consistency +
            10.0 * (min(evidence_count, 15) / 15.0) +
            8.0 * (min(lit_count, 10) / 10.0) +
            4.0 * ann_completeness
        )

        # Gaussian perturbation: noise ~ N(0, 3.5)
        u1 = max(random.random(), 1e-9)
        u2 = random.random()
        noise = math.sqrt(-2.0 * math.log(u1)) * math.cos(2.0 * math.pi * u2) * 3.5

        final_score = round(max(5.0, min(98.0, raw_score + noise)), 1)

        # 4 Research Categories defined in prompt:
        # 0-30: Lower Research Signal
        # 31-60: Moderate Research Signal
        # 61-80: Elevated Research Signal
        # 81-100: High Research Signal
        if final_score <= 30.0:
            category = "Lower Research Signal"
        elif final_score <= 60.0:
            category = "Moderate Research Signal"
        elif final_score <= 80.0:
            category = "Elevated Research Signal"
        else:
            category = "High Research Signal"

        rows.append([
            var_id,
            pop_freq,
            func_effect,
            qual_score,
            evidence_count,
            evidence_consistency,
            ann_completeness,
            conservation,
            lit_count,
            final_score,
            category
        ])

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(rows)

    print(f"Generated {len(rows)} records in {output_path}")

    # Validate output
    assert len(rows) >= 1000, f"Expected >= 1000 records, got {len(rows)}"
    cats = {r[-1] for r in rows}
    print(f"Categories found: {cats}")

if __name__ == "__main__":
    generate_cancer_variant_dataset()
