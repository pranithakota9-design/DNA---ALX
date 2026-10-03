"""
DNA-ALX Backtracking Module
Reconstructs the LCS alignment path and records step-by-step navigational decisions.
"""

def trace_backtracking_path(reference: str, sample: str, dp_table: list):
    """
    Traces the optimal path from dp[m][n] to (0, 0) and records each decision.
    """
    reference = reference.upper().strip()
    sample = sample.upper().strip()
    m = len(reference)
    n = len(sample)

    path = []
    i, j = m, n

    while i > 0 or j > 0:
        curr_val = dp_table[i][j]
        if i > 0 and j > 0 and reference[i - 1] == sample[j - 1]:
            char = reference[i - 1]
            path.append({
                "from": [i, j],
                "to": [i - 1, j - 1],
                "action": "MATCH",
                "character": char,
                "detail": f"Matched base '{char}'. Diagonal step (+1) from ({i-1}, {j-1})",
                "cell_val": curr_val
            })
            i -= 1
            j -= 1
        elif i > 0 and (j == 0 or dp_table[i - 1][j] >= dp_table[i][j - 1]):
            path.append({
                "from": [i, j],
                "to": [i - 1, j],
                "action": "MOVE_UP",
                "character": reference[i - 1],
                "detail": f"Mismatch/gap. Moved UP to ({i-1}, {j}) taking dp[{i-1}][{j}] = {dp_table[i-1][j]}",
                "cell_val": curr_val
            })
            i -= 1
        else:
            path.append({
                "from": [i, j],
                "to": [i, j - 1],
                "action": "MOVE_LEFT",
                "character": sample[j - 1],
                "detail": f"Mismatch/gap. Moved LEFT to ({i}, {j-1}) taking dp[{i}][{j-1}] = {dp_table[i][j-1]}",
                "cell_val": curr_val
            })
            j -= 1

    path.reverse()
    return path
