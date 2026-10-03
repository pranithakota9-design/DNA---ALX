"""
Unit tests for DNA-ALX Backtracking and Dynamic Programming
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.algorithms.lcs import compute_lcs
from backend.algorithms.backtracking import trace_backtracking_path
from backend.algorithms.dp_explanation import explain_dp_cell

def test_backtracking_reconstruction():
    ref = "ATGCGTACGT"
    smp = "ATGCGGACGT"
    lcs_res = compute_lcs(ref, smp)
    path = trace_backtracking_path(ref, smp, lcs_res["dp_table"])

    assert len(path) > 0
    matched_chars = [step["character"] for step in path if step["action"] == "MATCH"]
    reconstructed = "".join(matched_chars)
    assert reconstructed == lcs_res["lcs_sequence"]

def test_dp_cell_explanation():
    ref = "ACGT"
    smp = "ACGT"
    lcs_res = compute_lcs(ref, smp)
    exp = explain_dp_cell(ref, smp, lcs_res["dp_table"], 1, 1)
    assert exp["decision"] == "MATCH"
    assert exp["value"] == 1

if __name__ == "__main__":
    test_backtracking_reconstruction()
    test_dp_cell_explanation()
    print("All Backtracking & DP tests passed successfully!")
