#!/usr/bin/env python3
"""
DNA-ALX Application Startup Script
Checks datasets, trains model if needed, and launches the server.
"""

import os
import sys
import subprocess

def main():
    print("==================================================")
    print("                    DNA-ALX                       ")
    print(" Explainable DNA Sequence & Synthetic Risk Platform")
    print("==================================================")

    # 1. Check datasets
    dataset_file = "data/synthetic_genetic_variants.csv"
    if not os.path.exists(dataset_file):
        print("[INIT] Datasets not found. Generating synthetic datasets...")
        from backend.ml.generate_dataset import generate_datasets
        generate_datasets()
    else:
        print("[OK] Synthetic genetic datasets ready.")

    cancer_dataset_file = "data/synthetic_cancer_variant_evidence.csv"
    if not os.path.exists(cancer_dataset_file):
        print("[INIT] Cancer evidence dataset not found. Generating...")
        from backend.ml.generate_cancer_dataset import generate_cancer_variant_dataset
        generate_cancer_variant_dataset()
    else:
        print("[OK] Synthetic cancer evidence dataset ready.")

    # 2. Check models
    model_file = "backend/ml/model.pkl"
    if not os.path.exists(model_file):
        print("[INIT] Model not found. Training Random Forest model...")
        from backend.ml.train import train_model
        train_model()
    else:
        print("[OK] Genetic model ready.")

    cancer_model_file = "backend/ml/cancer_model.pkl"
    if not os.path.exists(cancer_model_file):
        print("[INIT] Cancer model not found. Training Random Forest model...")
        from backend.ml.train_cancer_model import train_cancer_model
        train_cancer_model()
    else:
        print("[OK] Cancer research model ready.")

    print("\n[OK] Demo Researcher account: demo@dna-alx.local / Demo@12345")
    print("[OK] DNA-ALX pipeline initialized successfully.")
    print("Starting FastAPI backend with uvicorn (or use Vite for unified frontend)...")
    
    try:
        import uvicorn
        uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
    except ImportError:
        print("Note: uvicorn not installed in current python env. Pure Python and web app operational.")

if __name__ == "__main__":
    main()
