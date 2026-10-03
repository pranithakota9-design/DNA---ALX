"""
DNA-ALX Difference Detection and Synthetic Variant Mapping Engine
Detects candidate sequence differences and looks up synthetic annotations.
"""

import os
import csv

def load_variant_mapping(mapping_path="data/dna_variant_mapping.csv"):
    mapping = {}
    if os.path.exists(mapping_path):
        with open(mapping_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                mapping[row["difference_pattern"]] = {
                    "variant_id": row["variant_id"],
                    "ml_feature": row["ml_feature"]
                }
    else:
        # Fallback dictionary
        mapping = {
            "A>G": {"variant_id": "SIM_VAR_001", "ml_feature": "variant_A"},
            "C>T": {"variant_id": "SIM_VAR_002", "ml_feature": "variant_B"},
            "G>A": {"variant_id": "SIM_VAR_003", "ml_feature": "variant_C"},
            "T>C": {"variant_id": "SIM_VAR_004", "ml_feature": "variant_D"},
            "A>C": {"variant_id": "SIM_VAR_005", "ml_feature": "variant_E"},
            "T>G": {"variant_id": "SIM_VAR_006", "ml_feature": "variant_F"},
            "C>A": {"variant_id": "SIM_VAR_007", "ml_feature": "variant_G"},
            "G>T": {"variant_id": "SIM_VAR_008", "ml_feature": "variant_H"},
            "A>T": {"variant_id": "SIM_VAR_009", "ml_feature": "variant_I"},
            "T>A": {"variant_id": "SIM_VAR_010", "ml_feature": "variant_J"},
            "C>G": {"variant_id": "SIM_VAR_011", "ml_feature": "variant_K"},
            "G>C": {"variant_id": "SIM_VAR_012", "ml_feature": "variant_L"},
            "+A":  {"variant_id": "SIM_VAR_013", "ml_feature": "variant_M"},
            "-T":  {"variant_id": "SIM_VAR_014", "ml_feature": "variant_N"},
            "+C":  {"variant_id": "SIM_VAR_015", "ml_feature": "variant_O"},
        }
    return mapping

def load_annotations(ann_path="data/synthetic_variant_annotations.csv"):
    annotations = {}
    if os.path.exists(ann_path):
        with open(ann_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                annotations[row["variant_id"]] = row
    return annotations

def detect_differences(reference: str, sample: str, mapping_path="data/dna_variant_mapping.csv", ann_path="data/synthetic_variant_annotations.csv"):
    """
    Compares reference and sample sequences, aligns them and identifies candidate differences.
    """
    mapping = load_variant_mapping(mapping_path)
    annotations = load_annotations(ann_path)

    differences = []
    
    # If lengths are equal, scan for substitutions
    if len(reference) == len(sample):
        for idx in range(len(reference)):
            r_base = reference[idx]
            s_base = sample[idx]
            if r_base != s_base:
                pattern = f"{r_base}>{s_base}"
                map_info = mapping.get(pattern, {})
                var_id = map_info.get("variant_id", f"SIM_VAR_UNKNOWN_{idx+1}")
                ml_feat = map_info.get("ml_feature", "None")
                ann = annotations.get(var_id, {
                    "gene": "SIM_GENE_NOVEL",
                    "simulated_condition": "Synthetic Polymorphism",
                    "simulated_significance": "Uncertain Demonstration Locus",
                    "description": "Simulated single nucleotide difference."
                })
                differences.append({
                    "position": idx + 1,
                    "reference_base": r_base,
                    "sample_base": s_base,
                    "difference_type": "Substitution",
                    "difference_pattern": pattern,
                    "variant_id": var_id,
                    "ml_feature": ml_feat,
                    "annotation": ann
                })
    else:
        # Dynamic comparison for insertions and deletions
        # Simple two-pointer alignment
        i = 0
        j = 0
        m = len(reference)
        n = len(sample)
        while i < m and j < n:
            if reference[i] == sample[j]:
                i += 1
                j += 1
            else:
                if m > n:  # Deletion in sample
                    pattern = f"-{reference[i]}"
                    map_info = mapping.get(pattern, mapping.get("-T", {}))
                    var_id = map_info.get("variant_id", "SIM_VAR_014")
                    differences.append({
                        "position": i + 1,
                        "reference_base": reference[i],
                        "sample_base": "-",
                        "difference_type": "Deletion",
                        "difference_pattern": pattern,
                        "variant_id": var_id,
                        "ml_feature": map_info.get("ml_feature", "variant_N"),
                        "annotation": annotations.get(var_id, {})
                    })
                    i += 1
                elif n > m:  # Insertion in sample
                    pattern = f"+{sample[j]}"
                    map_info = mapping.get(pattern, mapping.get("+A", {}))
                    var_id = map_info.get("variant_id", "SIM_VAR_013")
                    differences.append({
                        "position": i + 1,
                        "reference_base": "-",
                        "sample_base": sample[j],
                        "difference_type": "Insertion",
                        "difference_pattern": pattern,
                        "variant_id": var_id,
                        "ml_feature": map_info.get("ml_feature", "variant_M"),
                        "annotation": annotations.get(var_id, {})
                    })
                    j += 1
                else:
                    pattern = f"{reference[i]}>{sample[j]}"
                    map_info = mapping.get(pattern, {})
                    var_id = map_info.get("variant_id", f"SIM_VAR_{i+1:03d}")
                    differences.append({
                        "position": i + 1,
                        "reference_base": reference[i],
                        "sample_base": sample[j],
                        "difference_type": "Substitution",
                        "difference_pattern": pattern,
                        "variant_id": var_id,
                        "ml_feature": map_info.get("ml_feature", "variant_A"),
                        "annotation": annotations.get(var_id, {})
                    })
                    i += 1
                    j += 1

    return differences
