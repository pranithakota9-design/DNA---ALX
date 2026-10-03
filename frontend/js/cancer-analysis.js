/**
 * DNA-ALX Cancer Risk & Variant Analysis Client Script
 */

document.addEventListener("DOMContentLoaded", () => {
  const sampleId = "DNA-2026-0042";
  const tbody = document.getElementById("variants-tbody");
  const modal = document.getElementById("explanation-modal");
  const closeModal = document.getElementById("close-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");

  if (closeModal) {
    closeModal.onclick = () => modal.classList.add("hidden");
  }
  window.onclick = (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  };

  const sampleVariants = [
    { variant_id: "SIM_VAR_001", ref: "A", alt: "G", pos: 14, gene: "SIM_GENE_A", effect: "High", pop_freq: 0.002, ev_records: 8, consistency: 88, priority: "High", contribution: "+14 points", conservation: 0.88, lit_count: 6, completeness: 95 },
    { variant_id: "SIM_VAR_003", ref: "G", alt: "A", pos: 28, gene: "SIM_GENE_C", effect: "Moderate", pop_freq: 0.012, ev_records: 6, consistency: 82, priority: "Medium", contribution: "+10 points", conservation: 0.72, lit_count: 3, completeness: 90 },
    { variant_id: "SIM_VAR_006", ref: "T", alt: "G", pos: 42, gene: "SIM_GENE_F", effect: "Moderate", pop_freq: 0.018, ev_records: 5, consistency: 78, priority: "Medium", contribution: "+9 points", conservation: 0.65, lit_count: 2, completeness: 85 },
    { variant_id: "SIM_VAR_010", ref: "T", alt: "A", pos: 55, gene: "SIM_GENE_J", effect: "High", pop_freq: 0.003, ev_records: 7, consistency: 85, priority: "High", contribution: "+13 points", conservation: 0.84, lit_count: 5, completeness: 92 },
    { variant_id: "SIM_VAR_013", ref: "-", alt: "A", pos: 68, gene: "SIM_GENE_M", effect: "Moderate", pop_freq: 0.015, ev_records: 4, consistency: 75, priority: "Medium", contribution: "+8 points", conservation: 0.60, lit_count: 2, completeness: 80 },
    { variant_id: "SIM_VAR_002", ref: "C", alt: "T", pos: 82, gene: "SIM_GENE_B", effect: "Low", pop_freq: 0.045, ev_records: 3, consistency: 65, priority: "Low", contribution: "+3 points", conservation: 0.35, lit_count: 1, completeness: 75 },
    { variant_id: "SIM_VAR_004", ref: "T", alt: "C", pos: 96, gene: "SIM_GENE_D", effect: "Low", pop_freq: 0.052, ev_records: 2, consistency: 60, priority: "Low", contribution: "+3 points", conservation: 0.30, lit_count: 0, completeness: 70 },
    { variant_id: "SIM_VAR_007", ref: "C", alt: "A", pos: 110, gene: "SIM_GENE_G", effect: "Low", pop_freq: 0.038, ev_records: 3, consistency: 68, priority: "Low", contribution: "+4 points", conservation: 0.40, lit_count: 1, completeness: 78 }
  ];

  if (tbody) {
    sampleVariants.forEach((v) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${v.variant_id}</strong></td>
        <td><code>${v.ref} → ${v.alt}</code></td>
        <td>${v.pos}</td>
        <td>${v.gene}</td>
        <td><span class="badge-${v.effect.toLowerCase()}">${v.effect}</span></td>
        <td>${v.pop_freq}</td>
        <td>${v.ev_records}</td>
        <td>${v.consistency}%</td>
        <td><span class="priority-badge priority-${v.priority.toLowerCase()}">${v.priority}</span></td>
        <td><strong>${v.contribution}</strong></td>
        <td><button class="btn-explain" data-id="${v.variant_id}">View Explanation</button></td>
      `;
      tbody.appendChild(tr);
    });

    tbody.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-explain")) {
        const id = e.target.getAttribute("data-id");
        const variant = sampleVariants.find((v) => v.variant_id === id);
        if (variant) {
          showVariantExplanation(variant);
        }
      }
    });
  }

  function showVariantExplanation(v) {
    modalTitle.innerText = `Variant Explanation: ${v.variant_id} (${v.ref} → ${v.alt})`;
    modalBody.innerHTML = `
      <div style="font-size: 13px; line-height: 1.6;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; background: #f8fafc; padding: 12px; border-radius: 8px;">
          <div><strong>Position:</strong> ${v.pos}</div>
          <div><strong>Gene Region:</strong> ${v.gene}</div>
          <div><strong>Functional Effect:</strong> ${v.effect}</div>
          <div><strong>Population Frequency:</strong> ${v.pop_freq}</div>
          <div><strong>Evidence Records:</strong> ${v.ev_records}</div>
          <div><strong>Evidence Consistency:</strong> ${v.consistency}%</div>
          <div><strong>Conservation Score:</strong> ${v.conservation}</div>
          <div><strong>Annotation Completeness:</strong> ${v.completeness}%</div>
        </div>

        <h3 style="font-size: 13px; font-weight: bold; margin-bottom: 6px;">Model Contribution: ${v.contribution}</h3>
        <p style="color: #475569; margin-bottom: 12px;">
          This candidate variant was assigned <strong>${v.priority} Research Priority</strong> due to its simulated functional impact, high evolutionary conservation (${v.conservation}), and low synthetic population prevalence (${v.pop_freq}).
        </p>

        <h3 style="font-size: 13px; font-weight: bold; margin-bottom: 6px;">Evidence Provenance:</h3>
        <ul style="color: #64748b; font-size: 12px; padding-left: 18px; margin-bottom: 16px;">
          <li>Source: Synthetic Dataset (Seed 42)</li>
          <li>Record Type: Synthetic Evidence Record</li>
          <li>Annotation Engine: DNA-ALX Prototype Annotation Engine</li>
          <li>Clinical Status: Strictly non-clinical demonstration locus</li>
        </ul>

        <div style="background: #fffbeb; border: 1px solid #fde68a; color: #92400e; padding: 8px; border-radius: 6px; font-size: 11px;">
          <strong>Educational Notice:</strong> These attributes describe the machine-learning model's internal weighting and do not represent a biological or medical diagnosis.
        </div>
      </div>
    `;
    modal.classList.remove("hidden");
  }
});
