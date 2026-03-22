"use client";

import { useState, useEffect } from "react";
import { Code2, Paintbrush, PenLine, Briefcase, Car, Camera, ArrowLeft, Download, Check } from "lucide-react";
import { QUESTIONS, DEDUCTIONS, type FreelanceCategory, type QuestionId, type Deduction } from "@/lib/tax-data";

const CATEGORIES: {
  id: FreelanceCategory;
  label: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}[] = [
  { id: "developer", label: "Developer", description: "Software engineer, web developer, app developer", Icon: Code2 },
  { id: "designer", label: "Designer", description: "Graphic, UI/UX, branding, or motion designer", Icon: Paintbrush },
  { id: "writer", label: "Writer", description: "Copywriter, blogger, journalist, content creator", Icon: PenLine },
  { id: "consultant", label: "Consultant", description: "Business, strategy, or management consultant", Icon: Briefcase },
  { id: "driver", label: "Driver", description: "Rideshare, delivery, or courier driver", Icon: Car },
  { id: "photographer", label: "Photographer", description: "Portrait, event, commercial, or product photographer", Icon: Camera },
];

function formatMoney(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function computeDeductions(category: FreelanceCategory, answers: Partial<Record<QuestionId, boolean>>): Deduction[] {
  return DEDUCTIONS[category].filter((d) => {
    if (d.alwaysApplies) return true;
    return Object.entries(d.requiredAnswers).every(([key, val]) => answers[key as QuestionId] === val);
  });
}

export default function TaxChecklistTool() {
  const [category, setCategory] = useState<FreelanceCategory | null>(null);
  const [answers, setAnswers] = useState<Partial<Record<QuestionId, boolean>>>({});
  const [step, setStep] = useState<"category" | "questions" | "results">("category");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "tax-print-styles";
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #tax-checklist-print, #tax-checklist-print * { visibility: visible; }
        #tax-checklist-print { position: absolute; left: 0; top: 0; width: 100%; padding: 24px; }
        .no-print { display: none !important; }
        .print-only { display: block !important; }
      }
      .print-only { display: none; }
    `;
    document.head.appendChild(style);
    return () => { document.getElementById("tax-print-styles")?.remove(); };
  }, []);

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  if (step === "category") {
    return (
      <div>
        <h2 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          What type of freelancer are you?
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "15px" }}>
          Select your category to get a tailored deduction checklist.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
          {CATEGORIES.map(({ id, label, description, Icon }) => (
            <button
              key={id}
              onClick={() => { setCategory(id); setAnswers({}); setStep("questions"); }}
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", cursor: "pointer", textAlign: "left", transition: "all 200ms", display: "flex", flexDirection: "column", gap: "12px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-hover)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              <Icon size={28} strokeWidth={1.5} />
              <div>
                <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--text-primary)", marginBottom: "4px" }}>{label}</div>
                <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === "questions") {
    return (
      <div>
        <button className="no-print" onClick={() => setStep("category")} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "14px", marginBottom: "24px", padding: "0" }}>
          <ArrowLeft size={16} /> Back
        </button>
        <h2 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          Tell us about your freelance setup
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "15px" }}>
          Answering as a{" "}
          <span style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa", borderRadius: "6px", padding: "2px 8px", fontSize: "13px", fontWeight: 600 }}>
            {category}
          </span>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
          {QUESTIONS.map((q) => (
            <div key={q.id} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px 24px" }}>
              <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--text-primary)", marginBottom: "4px" }}>{q.label}</div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>{q.hint}</div>
              <div style={{ display: "flex", gap: "8px" }}>
                {([true, false] as const).map((val) => {
                  const selected = answers[q.id] === val;
                  return (
                    <button
                      key={String(val)}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
                      style={{ height: "40px", padding: "0 20px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: selected ? 700 : 400, background: selected ? "var(--accent)" : "transparent", color: selected ? "#000" : "var(--text-secondary)", border: selected ? "1px solid var(--accent)" : "1px solid var(--border)", transition: "all 150ms" }}
                    >
                      {val ? "Yes" : "No"}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => { if (allAnswered) { setCheckedItems({}); setStep("results"); } }}
          disabled={!allAnswered}
          style={{ height: "52px", padding: "0 32px", borderRadius: "14px", fontSize: "15px", fontWeight: 600, cursor: allAnswered ? "pointer" : "not-allowed", background: allAnswered ? "#2563eb" : "rgba(37,99,235,0.4)", color: "#fff", border: "none", transition: "all 400ms cubic-bezier(0.16,1,0.3,1)", opacity: allAnswered ? 1 : 0.5 }}
        >
          Generate My Checklist
        </button>
      </div>
    );
  }

  const deductions = category ? computeDeductions(category, answers) : [];
  const totalMin = deductions.reduce((s, d) => s + d.savingsMin, 0);
  const totalMax = deductions.reduce((s, d) => s + d.savingsMax, 0);

  return (
    <div id="tax-checklist-print">
      <div className="print-only" style={{ marginBottom: "16px" }}>
        <strong>FreelanceTaxChecklist — Freelance Tax Deduction Checklist</strong>
        <br />
        <span style={{ fontSize: "13px" }}>Category: {category} | Generated: {new Date().toLocaleDateString()}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <button className="no-print" onClick={() => setStep("questions")} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "14px", marginBottom: "12px", padding: "0" }}>
            <ArrowLeft size={16} /> Back
          </button>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", margin: "0" }}>
            Your Tax Deduction Checklist
          </h2>
        </div>
        <button className="no-print" onClick={() => window.print()} style={{ display: "flex", alignItems: "center", gap: "8px", height: "44px", padding: "0 20px", borderRadius: "12px", fontSize: "14px", fontWeight: 500, cursor: "pointer", background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border)", transition: "all 200ms" }}>
          <Download size={16} /> Download PDF
        </button>
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}>
        <span style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa", borderRadius: "8px", padding: "6px 14px", fontSize: "14px", fontWeight: 600 }}>
          {deductions.length} deductions found
        </span>
        <span style={{ background: "rgba(22,163,74,0.1)", color: "#4ade80", borderRadius: "8px", padding: "6px 14px", fontSize: "14px", fontWeight: 600 }}>
          Est. savings: {formatMoney(totalMin)} &ndash; {formatMoney(totalMax)}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
        {deductions.map((d) => {
          const checked = checkedItems[d.name] ?? false;
          return (
            <div key={d.name} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: "16px", opacity: checked ? 0.6 : 1, transition: "opacity 200ms" }}>
              <button
                className="no-print"
                onClick={() => setCheckedItems((prev) => ({ ...prev, [d.name]: !checked }))}
                style={{ width: "20px", height: "20px", minWidth: "20px", borderRadius: "6px", border: checked ? "1px solid #2563eb" : "1px solid var(--border)", background: checked ? "#2563eb" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px", transition: "all 150ms", padding: "0" }}
              >
                {checked && <Check size={12} color="#fff" strokeWidth={3} />}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--text-primary)", textDecoration: checked ? "line-through" : "none", marginBottom: "4px" }}>{d.name}</div>
                <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>{d.description}</div>
                <span style={{ background: "rgba(255,255,255,0.04)", borderRadius: "6px", padding: "2px 8px", fontSize: "12px", fontFamily: "monospace", color: "#86868b" }}>{d.irsForm}</span>
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#4ade80", whiteSpace: "nowrap" }}>
                {formatMoney(d.savingsMin)} &ndash; {formatMoney(d.savingsMax)}
              </div>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: "12px", color: "#86868b", lineHeight: 1.6, borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
        Estimates are for informational purposes only and do not constitute tax advice. Consult a qualified tax professional before filing.
      </p>
    </div>
  );
}
