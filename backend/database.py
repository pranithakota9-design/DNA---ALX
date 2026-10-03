"""
DNA-ALX Database Layer (SQLite)
Manages persistence for users, samples, analyses, predictions, and audit logs.
"""

import sqlite3
import os
import json
import time

DB_PATH = "data/dna_alx.db"

def get_connection():
    os.makedirs(os.path.dirname(DB_PATH) or ".", exist_ok=True)
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    """)

    # Samples table (DNA stored in encrypted form)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS samples (
        id TEXT PRIMARY KEY,
        sample_id TEXT UNIQUE NOT NULL,
        encrypted_reference TEXT NOT NULL,
        encrypted_sample TEXT NOT NULL,
        owner_id TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    """)

    # Analyses table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS analyses (
        id TEXT PRIMARY KEY,
        sample_id TEXT NOT NULL,
        lcs_sequence TEXT NOT NULL,
        lcs_length INTEGER NOT NULL,
        similarity REAL NOT NULL,
        created_at TEXT NOT NULL
    );
    """)

    # Predictions table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS predictions (
        id TEXT PRIMARY KEY,
        analysis_id TEXT NOT NULL,
        predicted_class INTEGER NOT NULL,
        probability REAL NOT NULL,
        risk_category TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    """)

    # Audit logs table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        sample_id TEXT NOT NULL,
        status TEXT NOT NULL,
        ip_address TEXT NOT NULL,
        timestamp TEXT NOT NULL
    );
    """)

    # Cancer analyses table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS cancer_analyses (
        id TEXT PRIMARY KEY,
        sample_id TEXT NOT NULL,
        research_indicator INTEGER NOT NULL,
        research_category TEXT NOT NULL,
        model_confidence REAL NOT NULL,
        model_version TEXT NOT NULL,
        created_at TEXT NOT NULL,
        created_by TEXT NOT NULL
    );
    """)

    # Cancer variant evidence table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS cancer_variant_evidence (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        analysis_id TEXT NOT NULL,
        variant_id TEXT NOT NULL,
        population_frequency REAL NOT NULL,
        functional_effect REAL NOT NULL,
        quality_score REAL NOT NULL,
        evidence_count INTEGER NOT NULL,
        evidence_consistency REAL NOT NULL,
        annotation_completeness REAL NOT NULL,
        conservation_score REAL NOT NULL,
        literature_evidence_count INTEGER NOT NULL,
        contribution_points INTEGER NOT NULL,
        research_priority TEXT NOT NULL
    );
    """)

    # Variant review queue table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS variant_reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        variant_id TEXT UNIQUE NOT NULL,
        status TEXT NOT NULL,
        reviewer_id TEXT NOT NULL,
        review_notes TEXT,
        priority TEXT NOT NULL,
        updated_at TEXT NOT NULL
    );
    """)

    # Model runs audit table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS model_runs (
        id TEXT PRIMARY KEY,
        model_name TEXT NOT NULL,
        version TEXT NOT NULL,
        metrics_json TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    """)

    conn.commit()
    conn.close()

# Initialize on import
init_db()
