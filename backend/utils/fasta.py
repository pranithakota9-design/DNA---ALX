"""
DNA-ALX FASTA Parser Utility
Parses FASTA formatted strings and file streams.
"""

def parse_fasta(fasta_content: str):
    """
    Parses single or multi-record FASTA content.
    Returns list of dicts: [{"header": str, "sequence": str}]
    """
    lines = fasta_content.strip().splitlines()
    records = []
    current_header = "Synthetic_Sequence"
    current_seq_parts = []

    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line.startswith(">"):
            if current_seq_parts:
                records.append({
                    "header": current_header,
                    "sequence": "".join(current_seq_parts).upper()
                })
                current_seq_parts = []
            current_header = line[1:].strip()
        else:
            current_seq_parts.append(line)

    if current_seq_parts:
        records.append({
            "header": current_header,
            "sequence": "".join(current_seq_parts).upper()
        })

    return records
