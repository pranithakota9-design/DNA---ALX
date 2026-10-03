"""
DNA-ALX DNA Sequence Encryption Module
Encrypts genetic sequences at rest before database persistence.
Never stores raw plaintext DNA in database records.
"""

import os
import base64
import hashlib

# Prototype AES/XOR-derived cipher with cryptographic salt and round keys
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", "DNA_ALX_SECURE_STORAGE_KEY_2026")

def _get_key_stream(key: str, length: int, salt: bytes) -> bytes:
    derived = hashlib.pbkdf2_hmac("sha256", key.encode("utf-8"), salt, 10000, dklen=length)
    return derived

def encrypt_dna(sequence: str) -> str:
    """
    Encrypts a DNA string.
    Returns: salt$ciphertext (base64 encoded).
    """
    raw_bytes = sequence.strip().upper().encode("utf-8")
    salt = os.urandom(16)
    keystream = _get_key_stream(ENCRYPTION_KEY, len(raw_bytes), salt)
    
    # XOR encryption round
    encrypted_bytes = bytes([b ^ k for b, k in zip(raw_bytes, keystream)])
    
    salt_b64 = base64.b64encode(salt).decode("utf-8")
    cipher_b64 = base64.b64encode(encrypted_bytes).decode("utf-8")
    return f"{salt_b64}${cipher_b64}"

def decrypt_dna(encrypted_payload: str) -> str:
    """
    Decrypts an encrypted DNA payload.
    """
    try:
        salt_b64, cipher_b64 = encrypted_payload.split("$")
        salt = base64.b64decode(salt_b64.encode("utf-8"))
        encrypted_bytes = base64.b64decode(cipher_b64.encode("utf-8"))
        keystream = _get_key_stream(ENCRYPTION_KEY, len(encrypted_bytes), salt)
        decrypted_bytes = bytes([b ^ k for b, k in zip(encrypted_bytes, keystream)])
        return decrypted_bytes.decode("utf-8")
    except Exception as e:
        raise ValueError("Failed to decrypt sequence: invalid payload or key.") from e
