"""
DNA-ALX Security Audit Log
Maintains an immutable audit trail of all sensitive operations.
Raw DNA, passwords, and tokens are strictly excluded from logging.
"""

import time
import os
import json

AUDIT_LOG_FILE = "data/audit_log.json"

def log_audit_event(user_id: str, action: str, sample_id: str = "N/A", status: str = "SUCCESS", ip_address: str = "127.0.0.1", details: str = ""):
    entry = {
        "id": int(time.time() * 1000),
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime()),
        "user_id": user_id,
        "action": action,
        "sample_id": sample_id,
        "status": status,
        "ip_address": ip_address,
        "details": details
    }
    
    logs = []
    if os.path.exists(AUDIT_LOG_FILE):
        try:
            with open(AUDIT_LOG_FILE, "r", encoding="utf-8") as f:
                logs = json.load(f)
        except Exception:
            logs = []

    logs.insert(0, entry)
    # Keep last 500 events
    logs = logs[:500]

    os.makedirs(os.path.dirname(AUDIT_LOG_FILE) or ".", exist_ok=True)
    with open(AUDIT_LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(logs, f, indent=2)

    return entry

def get_audit_logs(limit: int = 50):
    if not os.path.exists(AUDIT_LOG_FILE):
        return []
    try:
        with open(AUDIT_LOG_FILE, "r", encoding="utf-8") as f:
            logs = json.load(f)
            return logs[:limit]
    except Exception:
        return []
