"""
Unit tests for DNA sequence validation
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.utils.validation import validate_dna_sequence

def test_valid_dna():
    res = validate_dna_sequence("ATGCGTACGT")
    assert res["valid"] is True
    assert res["error"] is None

def test_lowercase_dna():
    res = validate_dna_sequence("atgcgtacgt")
    assert res["valid"] is True
    assert res["sequence"] == "ATGCGTACGT"

def test_invalid_characters():
    res = validate_dna_sequence("ATGCXGTAG")
    assert res["valid"] is False
    assert "Unsupported character" in res["error"]

def test_whitespace_removal():
    res = validate_dna_sequence("  ATG   CGT \n ACGT  ")
    assert res["valid"] is True
    assert res["sequence"] == "ATGCGTACGT"

def test_empty_sequence():
    res = validate_dna_sequence("")
    assert res["valid"] is False

if __name__ == "__main__":
    test_valid_dna()
    test_lowercase_dna()
    test_invalid_characters()
    test_whitespace_removal()
    test_empty_sequence()
    print("All Validation tests passed successfully!")
