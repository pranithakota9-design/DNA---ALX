"""
DNA-ALX Backend Configuration
"""

import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dna_alx.db")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dna-alx-hackathon-secure-secret-2026")
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", "DNA_ALX_SECURE_STORAGE_KEY_2026")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "120"))
DATASET_PATH = os.getenv("DATASET_PATH", "data/synthetic_genetic_variants.csv")
MODEL_PATH = os.getenv("MODEL_PATH", "backend/ml/model.pkl")
