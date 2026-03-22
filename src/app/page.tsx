import type { Metadata } from "next";
import { Zap, Shield, Heart } from "lucide-react";
import { SITE, TOOLS } from "@/lib/constants";
import { ToolCard } from "@/components/ui/ToolCard";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              background: "var(--accent-muted)",
              border: "1px solid rgba(52,211,153,0.2)",
              marginBottom: "24px",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--accent)",
              letterSpacing: "0.02em",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            Free tools, no signup required
          </div>

          <h1 style={{ marginBottom: "20px" }}>Your Freelance Tax Deduction Checklist</h1>

          <p
            style={{
              fontSize: "18px",
              color: "var(--text-secondary)",
              maxWidth: "560px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Answer 6 quick questions and get a personalized IRS deduction checklist with form numbers and savings estimates. Free, instant, no signup.
          </p>

          {TOOLS.length > 0 && (
            <a
              href={`/${TOOLS[0].slug}`}
              className="hero-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "12px",
                background: "var(--accent)",
                color: "#000",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Get started free →
            </a>
          )}
        </div>
      </section>

      {/* Tools Grid */}
      <section style={{ paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          {TOOLS.length > 0 ? (
            <>
              <h2 style={{ marginBottom: "32px" }}>All Tools</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "16px",
                }}
              >
                {TOOLS.map((tool) => (
                  <ToolCard
                    key={tool.slug}
                    title={tool.name}
                    description={tool.description}
                    href={`/${tool.slug}`}
                    icon={tool.icon}
                  />
                ))}
              </div>
            </>
          ) : (
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "48px 32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛠️</div>
              <h3 style={{ marginBottom: "8px" }}>Tools coming soon</h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  maxWidth: "400px",
                  margin: "0 auto",
                }}
              >
                This template is ready for your tools. Add entries to the TOOLS
                array in{" "}
                <code
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "var(--bg-tertiary)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  src/lib/constants.ts
                </code>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why section */}
      <section
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ marginBottom: "12px" }}>Why {SITE.name}?</h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "40px",
              maxWidth: "560px",
            }}
          >
            Built for speed, privacy, and simplicity. No accounts, no
            subscriptions, no nonsense.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              {
                icon: Zap,
                title: "Fast",
                desc: "Instant results. No waiting, no loading screens. Everything runs in your browser.",
              },
              {
                icon: Shield,
                title: "Private",
                desc: "Your data stays in your browser. We never store, process, or transmit your files.",
              },
              {
                icon: Heart,
                title: "Free",
                desc: "No signup, no limits, no credit card. Every tool is completely free forever.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: "var(--accent-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={20} color="var(--accent)" />
                </div>
                <h3 style={{ marginBottom: "8px" }}>{title}</h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ marginBottom: "12px" }}>How It Works</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "40px" }}>
            Three steps to get what you need.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                num: "1",
                title: "Choose a tool",
                desc: "Pick the tool that fits your task from our growing collection.",
              },
              {
                num: "2",
                title: "Enter your data",
                desc: "Paste text, upload a file, or type in what you need to process.",
              },
              {
                num: "3",
                title: "Get results",
                desc: "Results appear instantly. Copy, download, or share in one click.",
              },
            ].map(({ num, title, desc }) => (
              <div
                key={num}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "var(--accent-muted)",
                    border: "1px solid rgba(52,211,153,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--accent)",
                  }}
                >
                  {num}
                </div>
                <div>
                  <h3 style={{ marginBottom: "6px" }}>{title}</h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: 1.6,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
