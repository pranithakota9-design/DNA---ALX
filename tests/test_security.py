"""
Unit tests for DNA-ALX Security Architecture
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.security.authentication import hash_password, verify_password, create_access_token, verify_access_token
from backend.security.encryption import encrypt_dna, decrypt_dna
from backend.security.authorization import check_permission

def test_password_hashing():
    pwd = "DemoPassword123!"
    hashed, salt = hash_password(pwd)
    assert verify_password(pwd, hashed) is True
    assert verify_password("WrongPassword", hashed) is False

def test_jwt_lifecycle():
    token = create_access_token("usr_123", "test@dna-alx.local", "RESEARCHER")
    payload = verify_access_token(token)
    assert payload is not None
    assert payload["sub"] == "usr_123"
    assert payload["role"] == "RESEARCHER"

def test_dna_encryption():
    raw_dna = "ATGCGTACGTAGCTAGCTAG"
    encrypted = encrypt_dna(raw_dna)
    assert encrypted != raw_dna
    assert "$" in encrypted
    decrypted = decrypt_dna(encrypted)
    assert decrypted == raw_dna

def test_role_permissions():
    assert check_permission("ADMIN", "can_view_audit_logs") is True
    assert check_permission("RESEARCHER", "can_view_audit_logs") is False
    assert check_permission("RESEARCHER", "can_upload_dna") is True
    assert check_permission("VIEWER", "can_upload_dna") is False

if __name__ == "__main__":
    test_password_hashing()
    test_jwt_lifecycle()
    test_dna_encryption()
    test_role_permissions()
    print("All Security tests passed successfully!")
