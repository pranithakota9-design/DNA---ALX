"""
DNA-ALX Sequence Validation Module
Strictly verifies nucleotide content, boundaries, and handles whitespace.
Only characters A, T, G, C are permitted.
"""

def validate_dna_sequence(sequence: str, max_length: int = 5000):
    """
    Validates a DNA sequence.
    Returns:
        dict: {"valid": bool, "sequence": str, "length": int, "error": str or None}
    """
    if not sequence or not sequence.strip():
        return {
            "valid": False,
            "sequence": "",
            "length": 0,
            "error": "Sequence is empty. Please enter a valid DNA nucleotide string."
        }

    # Clean whitespace and linebreaks
    cleaned = "".join(sequence.split()).upper()

    if len(cleaned) > max_length:
        return {
            "valid": False,
            "sequence": cleaned,
            "length": len(cleaned),
            "error": f"Sequence length ({len(cleaned)}) exceeds prototype maximum of {max_length} nucleotides."
        }

    allowed = set("ATGC")
    invalid_chars = sorted(list(set(cleaned) - allowed))
    if invalid_chars:
        return {
            "valid": False,
            "sequence": cleaned,
            "length": len(cleaned),
            "error": f"Invalid DNA sequence. Unsupported character(s): {', '.join(invalid_chars)}. Expected characters: A, T, G, C"
        }

    return {
        "valid": True,
        "sequence": cleaned,
        "length": len(cleaned),
        "error": None
    }
