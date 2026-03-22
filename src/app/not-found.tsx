"use client";

import Link from "next/link";
import { SITE, TOOLS } from "@/lib/constants";

export default function NotFound() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          fontSize: "80px",
          fontWeight: 800,
          color: "var(--border-hover)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          marginBottom: "16px",
        }}
      >
        404
      </div>
      <h1 style={{ fontSize: "28px", marginBottom: "12px" }}>Page Not Found</h1>
      <p
        style={{
          color: "var(--text-secondary)",
          maxWidth: "400px",
          marginBottom: "32px",
          lineHeight: 1.7,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      <Link
        href="/"
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
          marginBottom: "40px",
          transition: "filter 200ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
        }}
      >
        ← Back to Home
      </Link>

      {TOOLS.length > 0 && (
        <div>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Popular Tools
          </p>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {TOOLS.slice(0, 4).map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "all 150ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border-hover)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-secondary)";
                }}
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <p style={{ marginTop: "48px", fontSize: "13px", color: "var(--text-muted)" }}>
        {SITE.name} — {SITE.tagline}
      </p>
    </section>
  );
}
