# DNA-ALX Synthetic Dataset Documentation

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
- `synthetic_cancer_variant_evidence.csv`: 1,000 synthetic cancer variant evidence records containing 9 evidence dimensions (`population_frequency`, `functional_effect`, `quality_score`, `evidence_count`, `evidence_consistency`, `annotation_completeness`, `conservation_score`, `literature_evidence_count`), continuous `synthetic_cancer_association_score`, and 4-tier `research_category`.
- `synthetic_variant_annotations.csv`: 24 synthetic genomic loci with simulated conditions and demonstration descriptions.
- `synthetic_dna_samples.csv`: 100 paired synthetic DNA sequences (~60 bp each) exhibiting substitutions, insertions, deletions, multiple mutations, and identical pairs for LCS benchmarking.
- `dna_variant_mapping.csv`: Maps detected nucleotide difference patterns (e.g., `A>G`) to synthetic variant identifiers (`SIM_VAR_001`) and ML feature columns (`variant_A`).
- `demo_sample.json`: Pre-configured high-risk educational sample for instantaneous prototype verification.

---

## 3. Mathematical Generation Rules (Seed: 42)
To make the synthetic dataset learnable without data leakage:

### Base Genetic Features
- `variant_A` through `variant_O` are simulated Bernoulli trials with $P(1) \approx 0.30$.
- Fixed seed: `RANDOM_SEED = 42`.

### Artificial Scoring Function
$$\text{risk\_score} = 2.0 \times \text{variant\_A} + 1.5 \times \text{variant\_C} + 1.8 \times \text{variant\_F} + 2.2 \times \text{variant\_J} + 1.2 \times \text{variant\_M} + \text{age\_factor}$$

Where:
- $\text{young} = 0.0$
- $\text{adult} = 0.4$
- $\text{older} = 0.9$

### Random Perturbation
$$\text{noise} \sim \mathcal{N}(0, 0.65^2)$$
$$\text{synthetic\_risk\_score} = \text{risk\_score} + \text{noise}$$

### Target Formulation
- `risk_label` = 1 if $\text{synthetic\_risk\_score} \ge 3.2$, otherwise 0.
- `risk_category`:
  - `synthetic_risk_score` < 2.5 $\rightarrow$ **Low**
  - 2.5 $\le$ `synthetic_risk_score` < 5.0 $\rightarrow$ **Moderate**
  - `synthetic_risk_score` $\ge$ 5.0 $\rightarrow$ **High**

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
