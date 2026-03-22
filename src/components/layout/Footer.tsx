"use client";

import Link from "next/link";
import { Twitter, Linkedin } from "lucide-react";
import { SITE, TOOLS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          padding: "64px 24px 32px",
        }}
      >
        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Tools */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "16px",
              }}
            >
              Tools
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {TOOLS.length > 0 ? (
                TOOLS.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/${tool.slug}`}
                      style={{
                        fontSize: "14px",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        transition: "color 150ms",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--text-muted)";
                      }}
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <span
                    style={{ fontSize: "14px", color: "var(--text-muted)" }}
                  >
                    Coming soon
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "16px",
              }}
            >
              Resources
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {[
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/faq" },
                { label: "Changelog", href: "/changelog" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 150ms",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--text-muted)";
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "16px",
              }}
            >
              Legal
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <li>
                <Link
                  href="/privacy"
                  style={{
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--text-muted)";
                  }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  style={{
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--text-muted)";
                  }}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "16px",
              }}
            >
              Social
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {SITE.socialX && (
                <li>
                  <a
                    href={SITE.socialX}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 150ms",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--text-muted)";
                    }}
                  >
                    <Twitter size={14} strokeWidth={1.5} />
                    Twitter / X
                  </a>
                </li>
              )}
              {SITE.socialLinkedIn && (
                <li>
                  <a
                    href={SITE.socialLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 150ms",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--text-muted)";
                    }}
                  >
                    <Linkedin size={14} strokeWidth={1.5} />
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "16px",
              }}
            >
              Company
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <li>
                <Link
                  href="/about"
                  style={{
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--text-muted)";
                  }}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "2px",
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {SITE.name}
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
            © {currentYear} {SITE.name}. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {SITE.socialX && (
              <a
                href={SITE.socialX}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                style={{
                  color: "var(--text-muted)",
                  transition: "color 150ms",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-muted)";
                }}
              >
                <Twitter size={16} strokeWidth={1.5} />
              </a>
            )}
            {SITE.socialLinkedIn && (
              <a
                href={SITE.socialLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  color: "var(--text-muted)",
                  transition: "color 150ms",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-muted)";
                }}
              >
                <Linkedin size={16} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
