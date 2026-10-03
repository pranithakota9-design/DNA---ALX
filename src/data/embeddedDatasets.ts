import { VariantAnnotation, VariantMapping, DnaPairSample, SyntheticGeneticSample } from "../types";

export const SYNTHETIC_ANNOTATIONS: VariantAnnotation[] = [
  {
    variant_id: "SIM_VAR_001",
    gene: "SIM_GENE_A",
    reference_base: "A",
    alternate_base: "G",
    simulated_condition: "Synthetic Condition A",
    simulated_significance: "Simulated Association",
    description: "Demonstration variant with high artificial weight (w=2.0)"
  },
  {
    variant_id: "SIM_VAR_002",
    gene: "SIM_GENE_B",
    reference_base: "C",
    alternate_base: "T",
    simulated_condition: "Synthetic Condition B",
    simulated_significance: "Simulated Benign",
    description: "Neutral simulated polymorphism for baseline control"
  },
  {
    variant_id: "SIM_VAR_003",
    gene: "SIM_GENE_C",
    reference_base: "G",
    alternate_base: "A",
    simulated_condition: "Synthetic Condition C",
    simulated_significance: "Simulated Association",
    description: "Demonstration variant with moderate artificial weight (w=1.5)"
  },
  {
    variant_id: "SIM_VAR_004",
    gene: "SIM_GENE_D",
    reference_base: "T",
    alternate_base: "C",
    simulated_condition: "Synthetic Condition D",
    simulated_significance: "Simulated Benign",
    description: "Simulated non-coding difference without synthetic association"
  },
  {
    variant_id: "SIM_VAR_005",
    gene: "SIM_GENE_E",
    reference_base: "A",
    alternate_base: "C",
    simulated_condition: "Synthetic Condition E",
    simulated_significance: "Simulated Modifier",
    description: "Demonstration background polymorphism"
  },
  {
    variant_id: "SIM_VAR_006",
    gene: "SIM_GENE_F",
    reference_base: "T",
    alternate_base: "G",
    simulated_condition: "Synthetic Condition F",
    simulated_significance: "Simulated Association",
    description: "Demonstration variant with elevated synthetic weight (w=1.8)"
  },
  {
    variant_id: "SIM_VAR_007",
    gene: "SIM_GENE_G",
    reference_base: "C",
    alternate_base: "A",
    simulated_condition: "Synthetic Condition G",
    simulated_significance: "Simulated Benign",
    description: "Simulated synonymous transition"
  },
  {
    variant_id: "SIM_VAR_008",
    gene: "SIM_GENE_H",
    reference_base: "G",
    alternate_base: "T",
    simulated_condition: "Synthetic Condition H",
    simulated_significance: "Simulated Benign",
    description: "Simulated non-pathogenic transversion"
  },
  {
    variant_id: "SIM_VAR_009",
    gene: "SIM_GENE_I",
    reference_base: "A",
    alternate_base: "T",
    simulated_condition: "Synthetic Condition I",
    simulated_significance: "Simulated Modifier",
    description: "Simulated regulatory polymorphism"
  },
  {
    variant_id: "SIM_VAR_010",
    gene: "SIM_GENE_J",
    reference_base: "T",
    alternate_base: "A",
    simulated_condition: "Synthetic Condition J",
    simulated_significance: "Simulated Association",
    description: "Demonstration variant with highest synthetic weight (w=2.2)"
  },
  {
    variant_id: "SIM_VAR_011",
    gene: "SIM_GENE_K",
    reference_base: "C",
    alternate_base: "G",
    simulated_condition: "Synthetic Condition K",
    simulated_significance: "Simulated Benign",
    description: "Simulated structural variant"
  },
  {
    variant_id: "SIM_VAR_012",
    gene: "SIM_GENE_L",
    reference_base: "G",
    alternate_base: "C",
    simulated_condition: "Synthetic Condition L",
    simulated_significance: "Simulated Benign",
    description: "Simulated intronic polymorphism"
  },
  {
    variant_id: "SIM_VAR_013",
    gene: "SIM_GENE_M",
    reference_base: "A",
    alternate_base: "C",
    simulated_condition: "Synthetic Condition M",
    simulated_significance: "Simulated Association",
    description: "Demonstration variant with positive synthetic weight (w=1.2)"
  },
  {
    variant_id: "SIM_VAR_014",
    gene: "SIM_GENE_N",
    reference_base: "T",
    alternate_base: "G",
    simulated_condition: "Synthetic Condition N",
    simulated_significance: "Simulated Benign",
    description: "Simulated silent variation"
  },
  {
    variant_id: "SIM_VAR_015",
    gene: "SIM_GENE_O",
    reference_base: "C",
    alternate_base: "T",
    simulated_condition: "Synthetic Condition O",
    simulated_significance: "Simulated Benign",
    description: "Simulated neutral SNP"
  },
  {
    variant_id: "SIM_VAR_016",
    gene: "SIM_GENE_P",
    reference_base: "A",
    alternate_base: "T",
    simulated_condition: "Synthetic Condition P",
    simulated_significance: "Simulated Modifier",
    description: "Demonstration test locus P"
  },
  {
    variant_id: "SIM_VAR_017",
    gene: "SIM_GENE_Q",
    reference_base: "G",
    alternate_base: "C",
    simulated_condition: "Synthetic Condition Q",
    simulated_significance: "Simulated Benign",
    description: "Demonstration test locus Q"
  },
  {
    variant_id: "SIM_VAR_018",
    gene: "SIM_GENE_R",
    reference_base: "T",
    alternate_base: "A",
    simulated_condition: "Synthetic Condition R",
    simulated_significance: "Simulated Association",
    description: "Demonstration secondary marker"
  },
  {
    variant_id: "SIM_VAR_019",
    gene: "SIM_GENE_S",
    reference_base: "C",
    alternate_base: "G",
    simulated_condition: "Synthetic Condition S",
    simulated_significance: "Simulated Benign",
    description: "Demonstration tertiary marker"
  },
  {
    variant_id: "SIM_VAR_020",
    gene: "SIM_GENE_T",
    reference_base: "G",
    alternate_base: "A",
    simulated_condition: "Synthetic Condition T",
    simulated_significance: "Simulated Benign",
    description: "Demonstration quaternary marker"
  }
];

export const VARIANT_MAPPINGS: VariantMapping[] = [
  { difference_pattern: "A>G", variant_id: "SIM_VAR_001", ml_feature: "variant_A" },
  { difference_pattern: "C>T", variant_id: "SIM_VAR_002", ml_feature: "variant_B" },
  { difference_pattern: "G>A", variant_id: "SIM_VAR_003", ml_feature: "variant_C" },
  { difference_pattern: "T>C", variant_id: "SIM_VAR_004", ml_feature: "variant_D" },
  { difference_pattern: "A>C", variant_id: "SIM_VAR_005", ml_feature: "variant_E" },
  { difference_pattern: "T>G", variant_id: "SIM_VAR_006", ml_feature: "variant_F" },
  { difference_pattern: "C>A", variant_id: "SIM_VAR_007", ml_feature: "variant_G" },
  { difference_pattern: "G>T", variant_id: "SIM_VAR_008", ml_feature: "variant_H" },
  { difference_pattern: "A>T", variant_id: "SIM_VAR_009", ml_feature: "variant_I" },
  { difference_pattern: "T>A", variant_id: "SIM_VAR_010", ml_feature: "variant_J" },
  { difference_pattern: "C>G", variant_id: "SIM_VAR_011", ml_feature: "variant_K" },
  { difference_pattern: "G>C", variant_id: "SIM_VAR_012", ml_feature: "variant_L" },
  { difference_pattern: "+A",  variant_id: "SIM_VAR_013", ml_feature: "variant_M" },
  { difference_pattern: "-T",  variant_id: "SIM_VAR_014", ml_feature: "variant_N" },
  { difference_pattern: "+C",  variant_id: "SIM_VAR_015", ml_feature: "variant_O" },
];

export const DEMO_DNA_PAIRS: DnaPairSample[] = [
  {
    sample_id: "DNA-SEQ-DEMO-01",
    reference_sequence: "ATGCGTACGTAGCTAGCTAG",
    sample_sequence:    "ATGCGTTCGTAGCTAGCTAG",
    simulated_difference_type: "Single Substitution (A>T at pos 7)"
  },
  {
    sample_id: "DNA-SEQ-DEMO-02",
    reference_sequence: "TGAAAACGAGCCTATGACACTTACTTAATTTGCGTCGAGATTTCTGTTACGATATGGCGT",
    sample_sequence:    "TGAAAACGAGCCTATGACACTTACTTAATTTACGTCGAGATTTCTGTTACGATATGGCGT",
    simulated_difference_type: "Substitution (G>A at pos 32)"
  },
  {
    sample_id: "DNA-SEQ-DEMO-03",
    reference_sequence: "AGACGCCTGTAGAAGCCCGATCTGAATGCTTTCAGGGGAAGGGGCCCTTCTAGCCATATC",
    sample_sequence:    "AGACGCCTTTAGAAGCCCGATCTGAATGCTTTCAAGGGAAGGGGCCCTTCTCGCCATATC",
    simulated_difference_type: "Multiple Differences (3 positions)"
  },
  {
    sample_id: "DNA-SEQ-DEMO-04",
    reference_sequence: "GGCGAGGTGGACGAGGTGCATTCCTCCGGGTGCCCTGTGCGCAATGGGCCCCTGGCTAAT",
    sample_sequence:    "GGCGAGGTGGACGAGGTGCATTCCTCCGGGTGCCCTGTGCGCAATGGGGCCCCTGGCTAAT",
    simulated_difference_type: "Insertion (+G at pos 48)"
  },
  {
    sample_id: "DNA-SEQ-DEMO-05",
    reference_sequence: "CTTATCTCACCAAAAGTTGCGGCCACTACGGCCGGAATATGTTACTGGGGAGCACTATGA",
    sample_sequence:    "CTTATCTCACCAAAAGTTGCGGCCACTACGGCCGGAATATGTTACTGGGAGCACTATGA",
    simulated_difference_type: "Deletion (-G at pos 50)"
  }
];

export const DEMO_SAMPLE_FEATURES = {
  sample_id: "DNA-2026-DEMO",
  variant_A: 1,
  variant_B: 0,
  variant_C: 1,
  variant_D: 0,
  variant_E: 0,
  variant_F: 1,
  variant_G: 0,
  variant_H: 0,
  variant_I: 0,
  variant_J: 1,
  variant_K: 0,
  variant_L: 0,
  variant_M: 1,
  variant_N: 0,
  variant_O: 0
};

export const FEATURE_IMPORTANCES_DATA: Record<string, number> = {
  variant_J: 0.235,
  variant_A: 0.210,
  variant_F: 0.185,
  variant_C: 0.155,
  variant_M: 0.115,
  variant_B: 0.012,
  variant_D: 0.011,
  variant_N: 0.011,
  variant_O: 0.011,
  variant_E: 0.010,
  variant_G: 0.010,
  variant_H: 0.009,
  variant_I: 0.009,
  variant_K: 0.009,
  variant_L: 0.008
};

export const MODEL_METRICS_DATA = {
  algorithm: "Random Forest Classifier",
  n_estimators: 200,
  random_state: 42,
  train_split: 0.80,
  test_split: 0.20,
  accuracy: 0.8856,
  precision: 0.8736,
  recall: 0.8636,
  f1_score: 0.8686,
  confusion_matrix: {
    tn: 102,
    fp: 11,
    fn: 12,
    tp: 76
  }
};

// 25 representative samples from the 1000 generated dataset for instant client exploration
export const DATASET_PREVIEW_RECORDS: SyntheticGeneticSample[] = [
  { sample_id: "DNA-2026-0001", variant_A: 0, variant_B: 1, variant_C: 1, variant_D: 1, variant_E: 0, variant_F: 0, variant_G: 0, variant_H: 1, variant_I: 0, variant_J: 1, variant_K: 1, variant_L: 0, variant_M: 1, variant_N: 1, variant_O: 0, age_group: "older", sex: "F", synthetic_risk_score: 4.843, risk_label: 1, risk_category: "Moderate" },
  { sample_id: "DNA-2026-0002", variant_A: 0, variant_B: 1, variant_C: 0, variant_D: 0, variant_E: 0, variant_F: 1, variant_G: 0, variant_H: 0, variant_I: 1, variant_J: 1, variant_K: 0, variant_L: 0, variant_M: 0, variant_N: 0, variant_O: 0, age_group: "adult", sex: "M", synthetic_risk_score: 4.739, risk_label: 1, risk_category: "Moderate" },
  { sample_id: "DNA-2026-0003", variant_A: 0, variant_B: 0, variant_C: 0, variant_D: 0, variant_E: 1, variant_F: 1, variant_G: 1, variant_H: 1, variant_I: 1, variant_J: 1, variant_K: 1, variant_L: 0, variant_M: 0, variant_N: 0, variant_O: 1, age_group: "adult", sex: "M", synthetic_risk_score: 4.708, risk_label: 1, risk_category: "Moderate" },
  { sample_id: "DNA-2026-0004", variant_A: 0, variant_B: 1, variant_C: 0, variant_D: 0, variant_E: 0, variant_F: 0, variant_G: 0, variant_H: 0, variant_I: 0, variant_J: 1, variant_K: 1, variant_L: 0, variant_M: 1, variant_N: 1, variant_O: 0, age_group: "older", sex: "F", synthetic_risk_score: 3.156, risk_label: 0, risk_category: "Moderate" },
  { sample_id: "DNA-2026-0005", variant_A: 0, variant_B: 0, variant_C: 1, variant_D: 1, variant_E: 0, variant_F: 0, variant_G: 0, variant_H: 0, variant_I: 0, variant_J: 0, variant_K: 0, variant_L: 1, variant_M: 0, variant_N: 0, variant_O: 0, age_group: "young", sex: "M", synthetic_risk_score: 1.108, risk_label: 0, risk_category: "Low" },
  { sample_id: "DNA-2026-0006", variant_A: 1, variant_B: 0, variant_C: 0, variant_D: 0, variant_E: 0, variant_F: 0, variant_G: 1, variant_H: 0, variant_I: 0, variant_J: 0, variant_K: 1, variant_L: 0, variant_M: 1, variant_N: 0, variant_O: 0, age_group: "older", sex: "F", synthetic_risk_score: 4.112, risk_label: 1, risk_category: "Moderate" },
  { sample_id: "DNA-2026-0007", variant_A: 0, variant_B: 1, variant_C: 0, variant_D: 0, variant_E: 0, variant_F: 1, variant_G: 0, variant_H: 1, variant_I: 0, variant_J: 0, variant_K: 0, variant_L: 0, variant_M: 0, variant_N: 1, variant_O: 0, age_group: "adult", sex: "M", synthetic_risk_score: 3.318, risk_label: 1, risk_category: "Moderate" },
  { sample_id: "DNA-2026-0008", variant_A: 0, variant_B: 1, variant_C: 0, variant_D: 1, variant_E: 0, variant_F: 0, variant_G: 1, variant_H: 0, variant_I: 0, variant_J: 1, variant_K: 0, variant_L: 0, variant_M: 1, variant_N: 0, variant_O: 0, age_group: "young", sex: "F", synthetic_risk_score: 2.984, risk_label: 0, risk_category: "Moderate" },
  { sample_id: "DNA-2026-0009", variant_A: 0, variant_B: 0, variant_C: 0, variant_D: 1, variant_E: 1, variant_F: 1, variant_G: 0, variant_H: 0, variant_I: 1, variant_J: 0, variant_K: 1, variant_L: 1, variant_M: 1, variant_N: 0, variant_O: 0, age_group: "adult", sex: "F", synthetic_risk_score: 4.169, risk_label: 1, risk_category: "Moderate" },
  { sample_id: "DNA-2026-0010", variant_A: 0, variant_B: 0, variant_C: 0, variant_D: 0, variant_E: 0, variant_F: 1, variant_G: 1, variant_H: 0, variant_I: 0, variant_J: 0, variant_K: 0, variant_L: 0, variant_M: 0, variant_N: 1, variant_O: 0, age_group: "adult", sex: "M", synthetic_risk_score: 2.598, risk_label: 0, risk_category: "Moderate" },
  { sample_id: "DNA-2026-0011", variant_A: 0, variant_B: 0, variant_C: 1, variant_D: 1, variant_E: 0, variant_F: 0, variant_G: 0, variant_H: 0, variant_I: 1, variant_J: 0, variant_K: 0, variant_L: 0, variant_M: 0, variant_N: 0, variant_O: 1, age_group: "adult", sex: "F", synthetic_risk_score: 0.972, risk_label: 0, risk_category: "Low" },
  { sample_id: "DNA-2026-0012", variant_A: 1, variant_B: 0, variant_C: 1, variant_D: 0, variant_E: 0, variant_F: 1, variant_G: 0, variant_H: 0, variant_I: 0, variant_J: 1, variant_K: 0, variant_L: 0, variant_M: 1, variant_N: 0, variant_O: 0, age_group: "older", sex: "F", synthetic_risk_score: 8.842, risk_label: 1, risk_category: "High" },
  { sample_id: "DNA-2026-0013", variant_A: 1, variant_B: 1, variant_C: 1, variant_D: 0, variant_E: 0, variant_F: 0, variant_G: 0, variant_H: 0, variant_I: 1, variant_J: 1, variant_K: 0, variant_L: 0, variant_M: 0, variant_N: 0, variant_O: 0, age_group: "adult", sex: "M", synthetic_risk_score: 6.241, risk_label: 1, risk_category: "High" },
  { sample_id: "DNA-2026-0014", variant_A: 0, variant_B: 0, variant_C: 0, variant_D: 0, variant_E: 0, variant_F: 0, variant_G: 0, variant_H: 0, variant_I: 0, variant_J: 0, variant_K: 0, variant_L: 0, variant_M: 0, variant_N: 0, variant_O: 0, age_group: "young", sex: "F", synthetic_risk_score: 0.124, risk_label: 0, risk_category: "Low" },
  { sample_id: "DNA-2026-0015", variant_A: 1, variant_B: 0, variant_C: 0, variant_D: 1, variant_E: 0, variant_F: 1, variant_G: 0, variant_H: 0, variant_I: 0, variant_J: 0, variant_K: 1, variant_L: 0, variant_M: 0, variant_N: 1, variant_O: 0, age_group: "adult", sex: "M", synthetic_risk_score: 4.312, risk_label: 1, risk_category: "Moderate" }
];
