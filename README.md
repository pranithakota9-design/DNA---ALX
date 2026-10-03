# DNA-ALX: Explainable DNA Sequence Analysis & Synthetic Genetic Risk Platform

> *"From DNA Sequence Comparison to Explainable Genetic Analysis"*
>
> **CRITICAL ETHICAL & EDUCATIONAL DISCLAIMER:**
> DNA-ALX is an educational and hackathon demonstration prototype.
> All datasets, genomic variants, risk scores, labels, and annotations are **synthetic and simulated**.
> This platform **does not diagnose disease**, does not predict real patient health outcomes, and is **not for clinical use**.

---

## 1. Project Overview & Problem Statement
Understanding how genetic sequence variations translate into algorithmic risk scores can often appear as an opaque "black box". DNA-ALX demystifies this end-to-end bioinformatics and machine-learning journey by providing an open, mathematically rigorous, and step-by-step explainable pipeline:
1. **Bioinformatics Layer:** Longest Common Subsequence (LCS) computed via 2-Dimensional Dynamic Programming.
2. **Backtracking Layer:** Reconstructing sequence alignment and pinpointing exact candidate differences (substitutions, insertions, deletions).
3. **Genomic Annotation Layer:** Mapping candidate differences to synthetic variant loci (`SIM_VAR_001` - `SIM_VAR_024`).
4. **Machine Learning Layer:** Converting detected variants into an un-leaked 15-feature binary vector (`variant_A` - `variant_O`) and running a 200-tree Random Forest Classifier.
5. **Explainability Layer:** Quantifying model feature importance, classification probabilities, and decision boundaries.
6. **Security & Audit Layer:** Protecting sequence privacy with salted hashing, token authorization (ADMIN, RESEARCHER, VIEWER), sequence encryption at rest, and immutable audit logs.

---

## 2. End-to-End Pipeline Workflow
```
DNA Sample Input (Paste or FASTA)
             ↓
     Strict Validation (Only A, T, G, C)
             ↓
     Reference DNA + Sample DNA
             ↓
     LCS via Dynamic Programming: O(m × n)
             ↓
     Interactive DP Matrix Inspection
             ↓
     Backtracking Decision Path
             ↓
     Reconstructed Sequence & Differences
             ↓
     Synthetic Variant Annotation Lookup
             ↓
     Feature Vector Assembly: [variant_A..variant_O]
             ↓
     Random Forest Ensemble (200 Trees)
             ↓
     Explainable Risk Classification (Low / Moderate / High)
             ↓
     Laboratory Report Generation + Immutable Audit Logging
```

---

## 3. Technology Stack
- **Algorithms & Bioinformatics:** Python 3.10+, Longest Common Subsequence (DP), Backtracking alignment.
- **Machine Learning:** Random Forest Classifier (200 estimators, stratified 80/20 train/test, seed=42).
- **Security:** Salted hashing, JWT-based RBAC, PBKDF2/AES-style encryption at rest, tamper-evident audit logging.
- **Web Interface:** React 19, TypeScript, Tailwind CSS, Lucide icons, Motion animations.

---

## 4. Synthetic Datasets (Generated with Seed 42)
All files reside in `data/`:
1. `synthetic_genetic_variants.csv`: 1,000 synthetic patient records with 15 genetic features, synthetic risk score, risk label, and risk category.
2. `synthetic_variant_annotations.csv`: 24 synthetic variants with simulated conditions and demonstration descriptions.
3. `synthetic_dna_samples.csv`: 100 paired DNA sequence benchmarks with substitutions, indels, and identical pairs.
4. `dna_variant_mapping.csv`: Mapping between sequence difference patterns and ML feature identifiers.
5. `demo_sample.json`: Deterministic demo feature payload for rapid verification.

---

## 5. Quick Start Instructions

### Running Python Tests
```bash
python3 tests/test_lcs.py
python3 tests/test_backtracking.py
python3 tests/test_validation.py
python3 tests/test_prediction.py
python3 tests/test_security.py
```

### Regenerating Datasets & Training Model
```bash
# 1. Regenerate synthetic datasets
python3 backend/ml/generate_dataset.py

# 2. Retrain ML model and output metrics
python3 backend/ml/train.py

# 3. Test prediction pipeline
python3 backend/ml/predict.py
```

### Running the Web Platform
```bash
# Development server (Port 3000)
npm run dev
```

---

## 6. Demo Account Credentials
- **Role:** Researcher
- **Email:** `demo@dna-alx.local`
- **Password:** `Demo@12345`
*(Available with 1-click Demo Login on the interface)*

---

## 7. Mathematical Scoring Rules (Simulated)
$$\text{risk\_score} = 2.0 \times \text{variant\_A} + 1.5 \times \text{variant\_C} + 1.8 \times \text{variant\_F} + 2.2 \times \text{variant\_J} + 1.2 \times \text{variant\_M} + \text{age\_factor}$$
$$\text{synthetic\_risk\_score} = \text{risk\_score} + \mathcal{N}(0, 0.65^2)$$
- $\ge 3.2 \rightarrow \text{Class 1 (Elevated Risk)}$
- $< 2.5 \rightarrow \text{Low}$ | $2.5 \le s < 5.0 \rightarrow \text{Moderate}$ | $\ge 5.0 \rightarrow \text{High}$
