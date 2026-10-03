"""
DNA-ALX FastAPI Application Server
Provides REST APIs for sequence comparison, variant mapping, ML prediction, and security.
"""

import os
import json
import time
from backend.database import init_db
from backend.algorithms.lcs import compute_lcs
from backend.algorithms.backtracking import trace_backtracking_path
from backend.algorithms.dp_explanation import explain_dp_cell
from backend.algorithms.differences import detect_differences
from backend.ml.preprocessing import validate_features, map_variants_to_feature_vector
from backend.ml.predict import predict_sample
from backend.ml.predict_cancer import analyze_cancer_variants
from backend.security.authentication import hash_password, verify_password, create_access_token, verify_access_token
from backend.security.encryption import encrypt_dna, decrypt_dna
from backend.security.audit import log_audit_event, get_audit_logs
from backend.security.authorization import check_permission
from backend.utils.validation import validate_dna_sequence
from backend.utils.fasta import parse_fasta
from backend.utils.report import generate_text_report

# Initialize database schema
init_db()

try:
    from fastapi import FastAPI, HTTPException, Header, Depends
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    HAS_FASTAPI = True
except ImportError:
    HAS_FASTAPI = False

if HAS_FASTAPI:
    app = FastAPI(
        title="DNA-ALX API",
        description="Explainable DNA Sequence Analysis & Synthetic Genetic Risk Platform",
        version="1.0.0"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    class LoginRequest(BaseModel):
        email: str
        password: str

    class AnalysisRequest(BaseModel):
        sample_id: str = "DNA-2026-DEMO"
        reference_dna: str
        sample_dna: str

    class PredictRequest(BaseModel):
        features: dict

    @app.get("/api/health")
    def health_check():
        return {"status": "ok", "service": "DNA-ALX Backend", "disclaimer": "Synthetic educational prototype"}

    @app.post("/api/auth/login")
    def login(req: LoginRequest):
        # Demo account check
        if req.email == "demo@dna-alx.local" and req.password == "Demo@12345":
            token = create_access_token("usr_demo", req.email, "RESEARCHER")
            log_audit_event("usr_demo", "LOGIN", "N/A", "SUCCESS")
            return {
                "success": True,
                "token": token,
                "user": {"email": req.email, "role": "RESEARCHER"}
            }
        return {"success": False, "message": "Invalid credentials"}

    @app.post("/api/analysis/lcs")
    def run_lcs(req: AnalysisRequest):
        ref_val = validate_dna_sequence(req.reference_dna)
        smp_val = validate_dna_sequence(req.sample_dna)

        if not ref_val["valid"]:
            raise HTTPException(status_code=400, detail=ref_val["error"])
        if not smp_val["valid"]:
            raise HTTPException(status_code=400, detail=smp_val["error"])

        lcs_res = compute_lcs(ref_val["sequence"], smp_val["sequence"])
        path = trace_backtracking_path(ref_val["sequence"], smp_val["sequence"], lcs_res["dp_table"])
        diffs = detect_differences(ref_val["sequence"], smp_val["sequence"])

        log_audit_event("researcher", "RUN_LCS", req.sample_id, "SUCCESS")

        return {
            "success": True,
            "data": {
                "reference_length": lcs_res["m"],
                "sample_length": lcs_res["n"],
                "lcs_length": lcs_res["lcs_length"],
                "lcs_sequence": lcs_res["lcs_sequence"],
                "similarity": lcs_res["similarity"],
                "runtime_ms": lcs_res["runtime_ms"],
                "peak_memory_kb": lcs_res["peak_memory_kb"],
                "dp_table": lcs_res["dp_table"],
                "backtracking_path": path,
                "differences": diffs
            }
        }

    @app.post("/api/prediction")
    def run_prediction(req: PredictRequest):
        validated = validate_features(req.features)
        pred = predict_sample(req.features)
        log_audit_event("researcher", "RUN_PREDICTION", "N/A", "SUCCESS")
        return {"success": True, "data": pred}

    class CancerAnalyzeRequest(BaseModel):
        sample_id: str = "DNA-2026-0042"
        variants: list = []

    class ReviewUpdateRequest(BaseModel):
        status: str
        review_notes: str = ""

    # In-memory store + database sync for cancer analyses
    CANCER_ANALYSES_CACHE = {}
    VARIANT_REVIEWS_STORE = {
        "SIM_VAR_001": {"variant_id": "SIM_VAR_001", "status": "UNDER REVIEW", "priority": "High", "reviewer_id": "demo@dna-alx.local", "review_notes": "Elevated functional disruption in simulated locus.", "updated_at": "2026-10-03 08:15:00"},
        "SIM_VAR_003": {"variant_id": "SIM_VAR_003", "status": "NEW", "priority": "Medium", "reviewer_id": "unassigned", "review_notes": "Awaiting secondary evidence inspection.", "updated_at": "2026-10-03 08:10:00"},
        "SIM_VAR_006": {"variant_id": "SIM_VAR_006", "status": "REVIEWED", "priority": "High", "reviewer_id": "demo@dna-alx.local", "review_notes": "Conserved synthetic locus verified.", "updated_at": "2026-10-03 08:20:00"},
        "SIM_VAR_010": {"variant_id": "SIM_VAR_010", "status": "NEEDS MORE EVIDENCE", "priority": "High", "reviewer_id": "demo@dna-alx.local", "review_notes": "Literature evidence count low (<2 records).", "updated_at": "2026-10-03 08:22:00"},
        "SIM_VAR_002": {"variant_id": "SIM_VAR_002", "status": "REVIEWED", "priority": "Low", "reviewer_id": "demo@dna-alx.local", "review_notes": "Likely benign synthetic polymorphism.", "updated_at": "2026-10-03 08:05:00"},
        "SIM_VAR_004": {"variant_id": "SIM_VAR_004", "status": "NEW", "priority": "Low", "reviewer_id": "unassigned", "review_notes": "Non-coding difference.", "updated_at": "2026-10-03 08:02:00"},
        "SIM_VAR_007": {"variant_id": "SIM_VAR_007", "status": "NEW", "priority": "Low", "reviewer_id": "unassigned", "review_notes": "Synonymous simulated change.", "updated_at": "2026-10-03 08:00:00"},
        "SIM_VAR_013": {"variant_id": "SIM_VAR_013", "status": "UNDER REVIEW", "priority": "Medium", "reviewer_id": "demo@dna-alx.local", "review_notes": "Frameshift candidate in synthetic exon.", "updated_at": "2026-10-03 08:18:00"}
    }

    @app.post("/api/cancer/analyze")
    def analyze_cancer(req: CancerAnalyzeRequest):
        analysis_id = f"CA-{int(time.time() * 1000)}"
        result = analyze_cancer_variants(req.variants, req.sample_id)
        result["analysis_id"] = analysis_id
        result["model_version"] = "RandomForest-v1.2-CancerEvidence"
        result["timestamp"] = time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime())

        CANCER_ANALYSES_CACHE[analysis_id] = result
        log_audit_event("researcher", "CANCER_RISK_ANALYSIS", req.sample_id, "SUCCESS", details=f"Research indicator: {result['research_risk_indicator']}/100, Category: {result['research_category']}")

        return {"success": True, "data": result}

    @app.get("/api/cancer/{analysis_id}")
    def get_cancer_analysis(analysis_id: str):
        if analysis_id in CANCER_ANALYSES_CACHE:
            return {"success": True, "data": CANCER_ANALYSES_CACHE[analysis_id]}
        # Default fallback analysis for immediate access
        res = analyze_cancer_variants([], "DNA-2026-0042")
        res["analysis_id"] = analysis_id
        return {"success": True, "data": res}

    @app.get("/api/cancer/{analysis_id}/variants")
    def get_cancer_variants(analysis_id: str):
        analysis = CANCER_ANALYSES_CACHE.get(analysis_id, analyze_cancer_variants([], "DNA-2026-0042"))
        return {"success": True, "data": analysis.get("variants", [])}

    @app.get("/api/cancer/{analysis_id}/explanation")
    def get_cancer_explanation(analysis_id: str):
        analysis = CANCER_ANALYSES_CACHE.get(analysis_id, analyze_cancer_variants([], "DNA-2026-0042"))
        return {"success": True, "data": analysis.get("explanation", {})}

    @app.get("/api/cancer/{analysis_id}/features")
    def get_cancer_features(analysis_id: str):
        return {
            "success": True,
            "data": {
                "features": [
                    "population_frequency", "functional_effect", "quality_score",
                    "evidence_count", "evidence_consistency", "annotation_completeness",
                    "conservation_score", "literature_evidence_count"
                ],
                "excluded_features": ["sample_id", "target_labels", "synthetic_cancer_association_score", "research_category"]
            }
        }

    @app.get("/api/cancer/{analysis_id}/model")
    def get_cancer_model_info(analysis_id: str):
        metrics_file = "backend/ml/cancer_model_metrics.json"
        if os.path.exists(metrics_file):
            with open(metrics_file, "r") as f:
                return {"success": True, "data": json.load(f)}
        return {"success": True, "data": {"model": "Random Forest", "n_estimators": 200}}

    @app.get("/api/review-queue")
    def get_review_queue():
        return {"success": True, "data": list(VARIANT_REVIEWS_STORE.values())}

    @app.patch("/api/review-queue/{variant_id}")
    def update_variant_review(variant_id: str, req: ReviewUpdateRequest):
        if variant_id not in VARIANT_REVIEWS_STORE:
            VARIANT_REVIEWS_STORE[variant_id] = {
                "variant_id": variant_id,
                "status": req.status,
                "priority": "Medium",
                "reviewer_id": "demo@dna-alx.local",
                "review_notes": req.review_notes,
                "updated_at": time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())
            }
        else:
            VARIANT_REVIEWS_STORE[variant_id]["status"] = req.status
            if req.review_notes:
                VARIANT_REVIEWS_STORE[variant_id]["review_notes"] = req.review_notes
            VARIANT_REVIEWS_STORE[variant_id]["updated_at"] = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())

        # Audit log for every status change
        log_audit_event("researcher", "UPDATE_REVIEW_STATUS", variant_id, "SUCCESS", details=f"Status changed to {req.status}. Note: {req.review_notes}")
        return {"success": True, "data": VARIANT_REVIEWS_STORE[variant_id]}

    @app.get("/api/audit")
    def get_audit():
        return {"success": True, "logs": get_audit_logs()}
else:
    app = None
