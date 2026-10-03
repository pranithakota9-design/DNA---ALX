"""
Unit tests for DNA-ALX Longest Common Subsequence (LCS)
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.algorithms.lcs import compute_lcs

def test_identical_sequences():
    seq = "ATGCGTACGT"
    res = compute_lcs(seq, seq)
    assert res["lcs_length"] == len(seq)
    assert res["lcs_sequence"] == seq
    assert res["similarity"] == 100.0

def test_different_sequences():
    ref = "AAAAA"
    smp = "CCCCC"
    res = compute_lcs(ref, smp)
    assert res["lcs_length"] == 0
    assert res["lcs_sequence"] == ""
    assert res["similarity"] == 0.0

def test_empty_sequences():
    res = compute_lcs("", "")
    assert res["lcs_length"] == 0
    assert res["lcs_sequence"] == ""

def test_one_character_sequences():
    res1 = compute_lcs("A", "A")
    assert res1["lcs_length"] == 1
    assert res1["lcs_sequence"] == "A"

    res2 = compute_lcs("A", "T")
    assert res2["lcs_length"] == 0
    assert res2["lcs_sequence"] == ""

if __name__ == "__main__":
    test_identical_sequences()
    test_different_sequences()
    test_empty_sequences()
    test_one_character_sequences()
    print("All LCS tests passed successfully!")
