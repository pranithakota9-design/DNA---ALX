"""
DNA-ALX LCS Algorithm Module
Computes Longest Common Subsequence using 2D Dynamic Programming.
"""

import time
import tracemalloc

def compute_lcs(reference: str, sample: str):
    """
    Computes the Longest Common Subsequence between reference and sample DNA sequences.

    Returns:
        dict: {
            "reference": str,
            "sample": str,
            "m": int,
            "n": int,
            "lcs_sequence": str,
            "lcs_length": int,
            "similarity": float,
            "dp_table": list of list of int,
            "runtime_ms": float,
            "peak_memory_kb": float
        }
    """
    reference = reference.upper().strip()
    sample = sample.upper().strip()
    m = len(reference)
    n = len(sample)

    tracemalloc.start()
    start_time = time.perf_counter()

    # Initialize (m+1) x (n+1) DP matrix with zeros
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Fill DP table
    for i in range(1, m + 1):
        ref_char = reference[i - 1]
        for j in range(1, n + 1):
            sample_char = sample[j - 1]
            if ref_char == sample_char:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Backtracking to reconstruct one LCS sequence
    lcs_chars = []
    i, j = m, n
    while i > 0 and j > 0:
        if reference[i - 1] == sample[j - 1]:
            lcs_chars.append(reference[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] >= dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    lcs_sequence = "".join(reversed(lcs_chars))
    lcs_length = dp[m][n]

    elapsed_ms = round((time.perf_counter() - start_time) * 1000.0, 3)
    current_mem, peak_mem = tracemalloc.get_traced_memory()
    tracemalloc.stop()

    max_len = max(m, n)
    similarity = round((lcs_length / max_len * 100.0), 2) if max_len > 0 else 100.0

    return {
        "reference": reference,
        "sample": sample,
        "m": m,
        "n": n,
        "lcs_sequence": lcs_sequence,
        "lcs_length": lcs_length,
        "similarity": similarity,
        "dp_table": dp,
        "runtime_ms": elapsed_ms,
        "peak_memory_kb": round(peak_mem / 1024.0, 2)
    }

if __name__ == "__main__":
    ref = "ATGCGTACGTAGCTAGCTAG"
    smp = "ATGCGTTCGTAGCTAGCTAG"
    res = compute_lcs(ref, smp)
    print("LCS length:", res["lcs_length"])
    print("LCS sequence:", res["lcs_sequence"])
    print("LCS similarity:", res["similarity"], "%")
