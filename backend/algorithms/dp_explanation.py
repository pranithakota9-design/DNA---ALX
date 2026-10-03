"""
DNA-ALX Dynamic Programming Cell Explanation Engine
Explains cell state, recurrence decision, and surrounding dependencies in real time.
"""

def explain_dp_cell(reference: str, sample: str, dp_table: list, i: int, j: int):
    """
    Returns an educational explanation for cell dp[i][j].
    """
    m = len(reference)
    n = len(sample)

    if i < 0 or i > m or j < 0 or j > n:
        return {"error": "Cell coordinates out of bounds."}

    val = dp_table[i][j]

    # Base case: 0-th row or column
    if i == 0 or j == 0:
        return {
            "cell": [i, j],
            "value": 0,
            "decision": "BASE_CASE",
            "explanation": f"dp[{i}][{j}] = 0 because comparing an empty prefix (length {0 if i==0 else j}) with any subsequence yields an LCS length of 0.",
            "formula": "dp[i][0] = 0, dp[0][j] = 0"
        }

    ref_char = reference[i - 1]
    smp_char = sample[j - 1]

    diag_val = dp_table[i - 1][j - 1]
    up_val = dp_table[i - 1][j]
    left_val = dp_table[i][j - 1]

    if ref_char == smp_char:
        decision = "MATCH"
        explanation = (
            f"Reference character '{ref_char}' at pos {i} matches Sample character '{smp_char}' at pos {j}. "
            f"The algorithm extends the subsequence by 1: dp[{i}][{j}] = dp[{i-1}][{j-1}] + 1 = {diag_val} + 1 = {val}."
        )
        formula = f"dp[{i}][{j}] = dp[{i-1}][{j-1}] + 1 = {diag_val} + 1 = {val}"
    else:
        decision = "MISMATCH"
        explanation = (
            f"Reference character '{ref_char}' at pos {i} differs from Sample character '{smp_char}' at pos {j}. "
            f"The algorithm takes the maximum of the top cell dp[{i-1}][{j}] ({up_val}) and left cell dp[{i}][{j-1}] ({left_val}): "
            f"max({up_val}, {left_val}) = {val}."
        )
        formula = f"dp[{i}][{j}] = max(dp[{i-1}][{j}], dp[{i}][{j-1}]) = max({up_val}, {left_val}) = {val}"

    return {
        "cell": [i, j],
        "value": val,
        "ref_char": ref_char,
        "smp_char": smp_char,
        "decision": decision,
        "explanation": explanation,
        "formula": formula,
        "dependencies": {
            "diagonal": {"cell": [i - 1, j - 1], "value": diag_val},
            "up": {"cell": [i - 1, j], "value": up_val},
            "left": {"cell": [i, j - 1], "value": left_val}
        }
    }
