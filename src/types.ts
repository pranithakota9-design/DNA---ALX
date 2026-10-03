export type UserRole = "ADMIN" | "RESEARCHER" | "VIEWER";

export interface UserSession {
  email: string;
  role: UserRole;
  token: string;
}

export interface SequenceDifference {
  position: number;
  reference_base: string;
  sample_base: string;
  difference_type: "Substitution" | "Insertion" | "Deletion" | "No Difference";
  difference_pattern: string;
  variant_id: string;
  ml_feature: string;
  annotation?: VariantAnnotation;
}

export interface VariantAnnotation {
  variant_id: string;
  gene: string;
  reference_base: string;
  alternate_base: string;
  simulated_condition: string;
  simulated_significance: string;
  description: string;
}

export interface VariantMapping {
  difference_pattern: string;
  variant_id: string;
  ml_feature: string;
}

export interface BacktrackingStep {
  from: [number, number];
  to: [number, number];
  action: "MATCH" | "MOVE_UP" | "MOVE_LEFT";
  character: string;
  detail: string;
  cell_val: number;
}

export interface LCSResult {
  reference: string;
  sample: string;
  m: number;
  n: number;
  lcs_sequence: string;
  lcs_length: number;
  similarity: number;
  dp_table: number[][];
  runtime_ms: number;
  peak_memory_kb: number;
  backtracking_path: BacktrackingStep[];
  differences: SequenceDifference[];
}

export interface DPCellExplanation {
  cell: [number, number];
  value: number;
  ref_char?: string;
  smp_char?: string;
  decision: "BASE_CASE" | "MATCH" | "MISMATCH";
  explanation: string;
  formula: string;
  dependencies?: {
    diagonal: { cell: [number, number]; value: number };
    up: { cell: [number, number]; value: number };
    left: { cell: [number, number]; value: number };
  };
}

export interface PredictionResult {
  predicted_class: 0 | 1;
  model_probability: number;
  risk_category: "Low" | "Moderate" | "High";
  simulated_score: number;
  detected_features: string[];
  absent_features: string[];
  feature_importance: Record<string, number>;
  disclaimer: string;
}

export interface AuditLogEntry {
  id: number;
  timestamp: string;
  user_id: string;
  action: string;
  sample_id: string;
  status: "SUCCESS" | "FAILED" | "UNAUTHORIZED";
  ip_address: string;
  details?: string;
}

export interface DnaPairSample {
  sample_id: string;
  reference_sequence: string;
  sample_sequence: string;
  simulated_difference_type: string;
}

export interface SyntheticGeneticSample {
  sample_id: string;
  variant_A: number;
  variant_B: number;
  variant_C: number;
  variant_D: number;
  variant_E: number;
  variant_F: number;
  variant_G: number;
  variant_H: number;
  variant_I: number;
  variant_J: number;
  variant_K: number;
  variant_L: number;
  variant_M: number;
  variant_N: number;
  variant_O: number;
  age_group: "young" | "adult" | "older";
  sex: "M" | "F";
  synthetic_risk_score: number;
  risk_label: 0 | 1;
  risk_category: "Low" | "Moderate" | "High";
}

export type CancerResearchCategory =
  | "Lower Research Signal"
  | "Moderate Research Signal"
  | "Elevated Research Signal"
  | "High Research Signal";

export type ReviewStatus = "NEW" | "UNDER REVIEW" | "REVIEWED" | "NEEDS MORE EVIDENCE";

export interface CancerVariantEvidence {
  variant_id: string;
  position: number;
  reference_base: string;
  sample_base: string;
  variant_type: string;
  gene: string;
  functional_effect: "High" | "Moderate" | "Low";
  functional_effect_score: number;
  population_frequency: number;
  quality_score: number;
  evidence_count: number;
  evidence_consistency_pct: number;
  annotation_completeness_pct: number;
  conservation_score: number;
  literature_evidence_count: number;
  research_priority: "High" | "Medium" | "Low";
  contribution_points: number;
  evidence_provenance: {
    source: string;
    record_type: string;
    annotation_engine: string;
    clinical_status: string;
  };
  increasing_factors: string[];
  decreasing_factors: string[];
}

export interface CancerAnalysisResult {
  sample_id: string;
  analysis_status: "Completed" | "Pending" | "Error";
  candidate_variant_count: number;
  research_risk_indicator: number; // 0-100
  research_category: CancerResearchCategory;
  model_confidence_pct: number;
  priority_distribution: { High: number; Medium: number; Low: number };
  variants: CancerVariantEvidence[];
  explanation: {
    increasing_factors: string[];
    decreasing_factors: string[];
    summary: string;
  };
  disclaimer: string;
}

export interface VariantReviewItem {
  variant_id: string;
  priority: "High" | "Medium" | "Low";
  status: ReviewStatus;
  reviewer_id: string;
  review_notes: string;
  updated_at: string;
}

