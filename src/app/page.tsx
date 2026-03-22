import type { Metadata } from "next";
import { Lock, Zap, ImageDown } from "lucide-react";
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

          <h1 style={{ marginBottom: "20px" }}>Resize Once. Post Everywhere.</h1>

          <p
            style={{
              fontSize: "18px",
              color: "var(--text-secondary)",
              maxWidth: "560px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            The free, private social media image resizer. Every platform. Every format. No upload required.
          </p>

          {TOOLS.length > 0 && (
            <a
              href={TOOLS[0].slug}
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
              Resize your image free →
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
          ) : null}
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
                icon: Lock,
                title: "100% Private",
                desc: "Your images never leave your browser. All processing happens locally via Canvas API.",
              },
              {
                icon: Zap,
                title: "One Click, All Formats",
                desc: "Export to 20+ platform formats at once. Download individually or as a single ZIP archive.",
              },
              {
                icon: ImageDown,
                title: "No Account Needed",
                desc: "No sign-up, no watermark, no limits. Free forever, supported by non-intrusive ads.",
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
            Three steps to get every format you need.
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
                title: "Upload your image",
                desc: "Drag and drop or click to upload any JPG, PNG, or WebP file from your device.",
              },
              {
                num: "2",
                title: "Select your formats",
                desc: "Pick the platforms and formats you need, or click Select All for everything at once.",
              },
              {
                num: "3",
                title: "Download as ZIP",
                desc: "Click Download All to get every resized image in a single ZIP. No account needed.",
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
