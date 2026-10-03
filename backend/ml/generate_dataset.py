#!/usr/bin/env python3
"""
DNA-ALX Synthetic Dataset Generator
Educational & Demonstration Dataset Generator for DNA-ALX Prototype.

IMPORTANT:
These datasets are exclusively for an educational prototype.
They do not represent real patients, real biological variants, or real clinical diagnoses.
"""

import os
import random
import math
import json
import csv

RANDOM_SEED = 42

def generate_datasets(output_dir="data"):
    os.makedirs(output_dir, exist_ok=True)
    random.seed(RANDOM_SEED)

    # 1. GENERATE MAIN SYNTHETIC GENETIC DATASET (1000 samples)
    variants = [f"variant_{chr(65 + i)}" for i in range(15)]  # variant_A to variant_O
    age_groups = ["young", "adult", "older"]
    sexes = ["M", "F"]
    age_weights = {"young": 0.0, "adult": 0.4, "older": 0.9}

    rows = []
    # Header
    header = ["sample_id"] + variants + ["age_group", "sex", "synthetic_risk_score", "risk_label", "risk_category"]

    for i in range(1, 1001):
        sample_id = f"DNA-2026-{i:04d}"
        
        # 30% probability of variant present
        var_vals = [1 if random.random() < 0.30 else 0 for _ in range(15)]
        
        age = random.choice(age_groups)
        sex = random.choice(sexes)
        
        # Artificial scoring rule:
        # 2.0*variant_A + 1.5*variant_C + 1.8*variant_F + 2.2*variant_J + 1.2*variant_M
        # mapping index: A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7, I=8, J=9, K=10, L=11, M=12, N=13, O=14
        score = (
            2.0 * var_vals[0] +
            1.5 * var_vals[2] +
            1.8 * var_vals[5] +
            2.2 * var_vals[9] +
            1.2 * var_vals[12] +
            age_weights[age]
        )
        
        # Noise ~ Normal(0, 0.65)
        # Using Box-Muller transform for standard python random
        u1 = random.random()
        u2 = random.random()
        z = math.sqrt(-2.0 * math.log(max(u1, 1e-9))) * math.cos(2.0 * math.pi * u2)
        noise = z * 0.65
        
        synthetic_risk_score = round(score + noise, 3)
        risk_label = 1 if synthetic_risk_score >= 3.2 else 0
        
        if synthetic_risk_score < 2.5:
            risk_category = "Low"
        elif synthetic_risk_score < 5.0:
            risk_category = "Moderate"
        else:
            risk_category = "High"
            
        row = [sample_id] + var_vals + [age, sex, synthetic_risk_score, risk_label, risk_category]
        rows.append(row)

    genetic_variants_path = os.path.join(output_dir, "synthetic_genetic_variants.csv")
    with open(genetic_variants_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(rows)

    # 2. SYNTHETIC VARIANT ANNOTATION DATASET (25 variants)
    annotation_rows = [
        ["variant_id", "gene", "reference_base", "alternate_base", "simulated_condition", "simulated_significance", "description"],
        ["SIM_VAR_001", "SIM_GENE_A", "A", "G", "Synthetic Condition A", "Simulated Association", "Demonstration variant with high artificial weight (w=2.0)"],
        ["SIM_VAR_002", "SIM_GENE_B", "C", "T", "Synthetic Condition B", "Simulated Benign", "Neutral simulated polymorphism for baseline control"],
        ["SIM_VAR_003", "SIM_GENE_C", "G", "A", "Synthetic Condition C", "Simulated Association", "Demonstration variant with moderate artificial weight (w=1.5)"],
        ["SIM_VAR_004", "SIM_GENE_D", "T", "C", "Synthetic Condition D", "Simulated Benign", "Simulated non-coding difference without synthetic association"],
        ["SIM_VAR_005", "SIM_GENE_E", "A", "C", "Synthetic Condition E", "Simulated Modifier", "Demonstration background polymorphism"],
        ["SIM_VAR_006", "SIM_GENE_F", "T", "G", "Synthetic Condition F", "Simulated Association", "Demonstration variant with elevated synthetic weight (w=1.8)"],
        ["SIM_VAR_007", "SIM_GENE_G", "C", "A", "Synthetic Condition G", "Simulated Benign", "Simulated synonymous transition"],
        ["SIM_VAR_008", "SIM_GENE_H", "G", "T", "Synthetic Condition H", "Simulated Benign", "Simulated non-pathogenic transversion"],
        ["SIM_VAR_009", "SIM_GENE_I", "A", "T", "Synthetic Condition I", "Simulated Modifier", "Simulated regulatory polymorphism"],
        ["SIM_VAR_010", "SIM_GENE_J", "T", "A", "Synthetic Condition J", "Simulated Association", "Demonstration variant with highest synthetic weight (w=2.2)"],
        ["SIM_VAR_011", "SIM_GENE_K", "C", "G", "Synthetic Condition K", "Simulated Benign", "Simulated structural variant"],
        ["SIM_VAR_012", "SIM_GENE_L", "G", "C", "Synthetic Condition L", "Simulated Benign", "Simulated intronic polymorphism"],
        ["SIM_VAR_013", "SIM_GENE_M", "A", "C", "Synthetic Condition M", "Simulated Association", "Demonstration variant with positive synthetic weight (w=1.2)"],
        ["SIM_VAR_014", "SIM_GENE_N", "T", "G", "Synthetic Condition N", "Simulated Benign", "Simulated silent variation"],
        ["SIM_VAR_015", "SIM_GENE_O", "C", "T", "Synthetic Condition O", "Simulated Benign", "Simulated neutral SNP"],
        ["SIM_VAR_016", "SIM_GENE_P", "A", "T", "Synthetic Condition P", "Simulated Modifier", "Demonstration test locus P"],
        ["SIM_VAR_017", "SIM_GENE_Q", "G", "C", "Synthetic Condition Q", "Simulated Benign", "Demonstration test locus Q"],
        ["SIM_VAR_018", "SIM_GENE_R", "T", "A", "Synthetic Condition R", "Simulated Association", "Demonstration secondary marker"],
        ["SIM_VAR_019", "SIM_GENE_S", "C", "G", "Synthetic Condition S", "Simulated Benign", "Demonstration tertiary marker"],
        ["SIM_VAR_020", "SIM_GENE_T", "G", "A", "Synthetic Condition T", "Simulated Benign", "Demonstration quaternary marker"],
        ["SIM_VAR_021", "SIM_GENE_U", "A", "G", "Synthetic Condition U", "Simulated Association", "Demonstration reserve variant U"],
        ["SIM_VAR_022", "SIM_GENE_V", "T", "C", "Synthetic Condition V", "Simulated Benign", "Demonstration reserve variant V"],
        ["SIM_VAR_023", "SIM_GENE_W", "C", "A", "Synthetic Condition W", "Simulated Benign", "Demonstration reserve variant W"],
        ["SIM_VAR_024", "SIM_GENE_X", "G", "T", "Synthetic Condition X", "Simulated Modifier", "Demonstration reserve variant X"]
    ]
    annotations_path = os.path.join(output_dir, "synthetic_variant_annotations.csv")
    with open(annotations_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerows(annotation_rows)

    # 3. DNA VARIANT MAPPING (at least 15 mappings connecting differences to variants and ml features)
    mapping_rows = [
        ["difference_pattern", "variant_id", "ml_feature"],
        ["A>G", "SIM_VAR_001", "variant_A"],
        ["C>T", "SIM_VAR_002", "variant_B"],
        ["G>A", "SIM_VAR_003", "variant_C"],
        ["T>C", "SIM_VAR_004", "variant_D"],
        ["A>C", "SIM_VAR_005", "variant_E"],
        ["T>G", "SIM_VAR_006", "variant_F"],
        ["C>A", "SIM_VAR_007", "variant_G"],
        ["G>T", "SIM_VAR_008", "variant_H"],
        ["A>T", "SIM_VAR_009", "variant_I"],
        ["T>A", "SIM_VAR_010", "variant_J"],
        ["C>G", "SIM_VAR_011", "variant_K"],
        ["G>C", "SIM_VAR_012", "variant_L"],
        ["+A",  "SIM_VAR_013", "variant_M"],
        ["-T",  "SIM_VAR_014", "variant_N"],
        ["+C",  "SIM_VAR_015", "variant_O"],
        ["-A",  "SIM_VAR_016", "variant_P_extra"],
        ["+G",  "SIM_VAR_017", "variant_Q_extra"]
    ]
    mapping_path = os.path.join(output_dir, "dna_variant_mapping.csv")
    with open(mapping_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerows(mapping_rows)

    # 4. SYNTHETIC DNA SEQUENCE DATASET (100 synthetic pairs, ~60 bases each)
    bases = ["A", "T", "G", "C"]
    dna_rows = [["sample_id", "reference_sequence", "sample_sequence", "simulated_difference_type"]]

    diff_types = ["identical", "substitution", "insertion", "deletion", "multiple"]
    for i in range(1, 101):
        sample_id = f"DNA-SEQ-{i:03d}"
        ref_seq = "".join(random.choices(bases, k=60))
        diff_type = diff_types[(i - 1) % len(diff_types)]
        
        sample_list = list(ref_seq)
        if diff_type == "identical":
            sample_seq = ref_seq
        elif diff_type == "substitution":
            pos = random.randint(10, 48)
            curr = sample_list[pos]
            alt = random.choice([b for b in bases if b != curr])
            sample_list[pos] = alt
            sample_seq = "".join(sample_list)
        elif diff_type == "insertion":
            pos = random.randint(10, 48)
            inserted_base = random.choice(bases)
            sample_list.insert(pos, inserted_base)
            sample_seq = "".join(sample_list)
        elif diff_type == "deletion":
            pos = random.randint(10, 48)
            del sample_list[pos]
            sample_seq = "".join(sample_list)
        elif diff_type == "multiple":
            # 2 to 3 substitutions or indels
            pos1 = random.randint(5, 20)
            sample_list[pos1] = random.choice([b for b in bases if b != sample_list[pos1]])
            pos2 = random.randint(25, 40)
            sample_list[pos2] = random.choice([b for b in bases if b != sample_list[pos2]])
            pos3 = random.randint(45, 55)
            sample_list[pos3] = random.choice([b for b in bases if b != sample_list[pos3]])
            sample_seq = "".join(sample_list)

        dna_rows.append([sample_id, ref_seq, sample_seq, diff_type])

    dna_path = os.path.join(output_dir, "synthetic_dna_samples.csv")
    with open(dna_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerows(dna_rows)

    # 5. DEMO SAMPLE JSON
    demo_sample = {
        "sample_id": "DNA-2026-DEMO",
        "variant_A": 1,
        "variant_B": 0,
        "variant_C": 1,
        "variant_D": 0,
        "variant_E": 0,
        "variant_F": 1,
        "variant_G": 0,
        "variant_H": 0,
        "variant_I": 0,
        "variant_J": 1,
        "variant_K": 0,
        "variant_L": 0,
        "variant_M": 1,
        "variant_N": 0,
        "variant_O": 0
    }
    demo_path = os.path.join(output_dir, "demo_sample.json")
    with open(demo_path, "w", encoding="utf-8") as f:
        json.dump(demo_sample, f, indent=4)

    # 6. DATASET README.md
    readme_path = os.path.join(output_dir, "DATASET_README.md")
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write("""# DNA-ALX Synthetic Dataset Documentation

**DISCLAIMER: SYNTHETIC DATASET — NOT REAL PATIENT DATA**
* Variant-disease relationships in this dataset are simulated for software demonstration only.
* Machine-learning results generated from this dataset are not medical predictions.
* This dataset is generated exclusively for educational and hackathon prototyping of DNA-ALX.
* Do not use for clinical diagnostics, patient care, or real biological conclusions.

---

## 1. Dataset Overview & Purpose
The DNA-ALX datasets demonstrate a continuous computational pipeline connecting:
1. Dynamic Programming for Longest Common Subsequence (LCS)
2. Backtracking for sequence difference detection
3. Synthetic candidate variant annotation lookup
4. Machine Learning feature vector construction
5. Supervised classification with model explainability

All genetic associations, risk scores, labels, and variant annotations are completely synthetic and mathematically simulated.

---

## 2. Generated Files
- `synthetic_genetic_variants.csv`: 1,000 synthetic patient records containing 15 simulated variant features (`variant_A` through `variant_O`), simulated demographic factors (`age_group`, `sex`), a continuous `synthetic_risk_score`, a binary `risk_label`, and a 3-tier `risk_category`.
- `synthetic_variant_annotations.csv`: 24 synthetic genomic loci with simulated conditions and demonstration descriptions.
- `synthetic_dna_samples.csv`: 100 paired synthetic DNA sequences (~60 bp each) exhibiting substitutions, insertions, deletions, multiple mutations, and identical pairs for LCS benchmarking.
- `dna_variant_mapping.csv`: Maps detected nucleotide difference patterns (e.g., `A>G`) to synthetic variant identifiers (`SIM_VAR_001`) and ML feature columns (`variant_A`).
- `demo_sample.json`: Pre-configured high-risk educational sample for instantaneous prototype verification.

---

## 3. Mathematical Generation Rules (Seed: 42)
To make the synthetic dataset learnable without data leakage:

### Base Genetic Features
- `variant_A` through `variant_O` are simulated Bernoulli trials with $P(1) \\approx 0.30$.
- Fixed seed: `RANDOM_SEED = 42`.

### Artificial Scoring Function
$$\\text{risk\\_score} = 2.0 \\times \\text{variant\\_A} + 1.5 \\times \\text{variant\\_C} + 1.8 \\times \\text{variant\\_F} + 2.2 \\times \\text{variant\\_J} + 1.2 \\times \\text{variant\\_M} + \\text{age\\_factor}$$

Where:
- $\\text{young} = 0.0$
- $\\text{adult} = 0.4$
- $\\text{older} = 0.9$

### Random Perturbation
$$\\text{noise} \\sim \\mathcal{N}(0, 0.65^2)$$
$$\\text{synthetic\\_risk\\_score} = \\text{risk\\_score} + \\text{noise}$$

### Target Formulation
- `risk_label` = 1 if $\\text{synthetic\\_risk\\_score} \\ge 3.2$, otherwise 0.
- `risk_category`:
  - `synthetic_risk_score` < 2.5 $\\rightarrow$ **Low**
  - 2.5 $\\le$ `synthetic_risk_score` < 5.0 $\\rightarrow$ **Moderate**
  - `synthetic_risk_score` $\\ge$ 5.0 $\\rightarrow$ **High**

### Machine Learning Notice
Only `variant_A` through `variant_O` (and optionally encoded age/sex) are used as training features. `sample_id`, `synthetic_risk_score`, and `risk_category` are strictly excluded to prevent data leakage.

---

## 4. Connection Between Sequence & ML Pipeline
```
Reference DNA + Sample DNA
             ↓
     LCS Dynamic Programming
             ↓
     Backtracking & Differences (e.g. A>G)
             ↓
     dna_variant_mapping.csv (A>G -> SIM_VAR_001 -> variant_A)
             ↓
     synthetic_variant_annotations.csv (SIM_VAR_001 details)
             ↓
     Feature Vector: [variant_A=1, variant_B=0, ...]
             ↓
     Random Forest Classifier
             ↓
     Explainable Prediction (Class, Probability, Feature Importance)
```

---

## 5. Ethical Guidelines & Limitations
- These sequences and variant markers have no biological validity.
- Any similarity to real genomic sequences or clinical diseases is purely coincidental.
- The pipeline serves as a pedagogical reference for algorithm design and secure health-data engineering.
""")

    # 7. VALIDATE DATASETS
    validate_generated_data(output_dir)

def validate_generated_data(data_dir="data"):
    # Validate synthetic_genetic_variants.csv
    gen_path = os.path.join(data_dir, "synthetic_genetic_variants.csv")
    with open(gen_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        gen_rows = list(reader)
        
    assert len(gen_rows) == 1000, f"Expected 1000 rows, got {len(gen_rows)}"
    sample_ids = set()
    for row in gen_rows:
        sample_id = row["sample_id"]
        assert sample_id not in sample_ids, f"Duplicate sample_id: {sample_id}"
        sample_ids.add(sample_id)
        
        # Check binary variants
        for k in [f"variant_{chr(65+i)}" for i in range(15)]:
            assert row[k] in ("0", "1"), f"Invalid variant value: {row[k]}"
            
        assert row["risk_label"] in ("0", "1"), f"Invalid risk_label: {row['risk_label']}"
        assert row["risk_category"] in ("Low", "Moderate", "High"), f"Invalid category: {row['risk_category']}"
        assert not any(v == "" for v in row.values()), "Missing value found in genetic dataset"

    # Validate synthetic_variant_annotations.csv
    ann_path = os.path.join(data_dir, "synthetic_variant_annotations.csv")
    with open(ann_path, "r", encoding="utf-8") as f:
        ann_rows = list(csv.DictReader(f))
    assert len(ann_rows) >= 20, f"Expected >= 20 annotations, got {len(ann_rows)}"
    ann_ids = set()
    for row in ann_rows:
        assert row["variant_id"] not in ann_ids, f"Duplicate variant_id: {row['variant_id']}"
        ann_ids.add(row["variant_id"])
        assert not any(v == "" for v in row.values()), "Missing value in annotations"

    # Validate synthetic_dna_samples.csv
    dna_path = os.path.join(data_dir, "synthetic_dna_samples.csv")
    with open(dna_path, "r", encoding="utf-8") as f:
        dna_rows = list(csv.DictReader(f))
    assert len(dna_rows) == 100, f"Expected 100 DNA samples, got {len(dna_rows)}"
    allowed_bases = set("ATGC")
    for row in dna_rows:
        assert set(row["reference_sequence"]).issubset(allowed_bases), "Invalid DNA base in ref"
        assert set(row["sample_sequence"]).issubset(allowed_bases), "Invalid DNA base in sample"

    # Validate dna_variant_mapping.csv
    map_path = os.path.join(data_dir, "dna_variant_mapping.csv")
    with open(map_path, "r", encoding="utf-8") as f:
        map_rows = list(csv.DictReader(f))
    assert len(map_rows) >= 15, f"Expected >= 15 mappings, got {len(map_rows)}"

    print("Dataset generated successfully.")
    print(f"Genetic samples: {len(gen_rows)}")
    print(f"DNA samples: {len(dna_rows)}")
    print(f"Synthetic variants: {len(ann_rows)}")

if __name__ == "__main__":
    generate_datasets()
