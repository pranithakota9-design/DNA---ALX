"""
DNA-ALX Authentication & Token Management
Secures user authentication with salted hashing and signature verification.
"""

import hashlib
import hmac
import base64
import json
import time
import os

JWT_SECRET = os.getenv("JWT_SECRET_KEY", "dna-alx-hackathon-secure-secret-2026")

def hash_password(password: str, salt: str = None) -> tuple:
    """
    Hashes password with SHA-256 + cryptographic salt.
    """
    if not salt:
        salt = base64.b64encode(os.urandom(16)).decode("utf-8")
    pwd_bytes = (password + salt).encode("utf-8")
    hashed = hashlib.sha256(pwd_bytes).hexdigest()
    return f"{salt}${hashed}", salt

def verify_password(plain_password: str, hashed_value: str) -> bool:
    try:
        salt, _ = hashed_value.split("$")
        computed_hash, _ = hash_password(plain_password, salt)
        return hmac.compare_digest(computed_hash, hashed_value)
    except Exception:
        return False

def create_access_token(user_id: str, email: str, role: str, expires_in_minutes: int = 120) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    now = int(time.time())
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "iat": now,
        "exp": now + (expires_in_minutes * 60)
    }

    b64_header = base64.urlsafe_b64encode(json.dumps(header).encode("utf-8")).decode("utf-8").rstrip("=")
    b64_payload = base64.urlsafe_b64encode(json.dumps(payload).encode("utf-8")).decode("utf-8").rstrip("=")
    signing_input = f"{b64_header}.{b64_payload}"

    sig = hmac.new(JWT_SECRET.encode("utf-8"), signing_input.encode("utf-8"), hashlib.sha256).digest()
    b64_sig = base64.urlsafe_b64encode(sig).decode("utf-8").rstrip("=")
    return f"{signing_input}.{b64_sig}"

def verify_access_token(token: str):
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None
        signing_input = f"{parts[0]}.{parts[1]}"
        expected_sig = hmac.new(JWT_SECRET.encode("utf-8"), signing_input.encode("utf-8"), hashlib.sha256).digest()
        computed_b64_sig = base64.urlsafe_b64encode(expected_sig).decode("utf-8").rstrip("=")

        if not hmac.compare_digest(computed_b64_sig, parts[2]):
            return None

        # Decode payload with padding
        payload_b64 = parts[1] + "=" * ((4 - len(parts[1]) % 4) % 4)
        payload = json.loads(base64.urlsafe_b64decode(payload_b64.encode("utf-8")).decode("utf-8"))

        if payload.get("exp", 0) < int(time.time()):
            return None  # Expired

        return payload
    except Exception:
        return None
