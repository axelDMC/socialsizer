"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { SITE, TOOLS } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 200ms ease",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          width: "min(80vw, 320px)",
          background: "var(--bg-secondary)",
          borderLeft: "1px solid var(--border)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms ease",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: "18px",
              color: "var(--text-primary)",
            }}
          >
            {SITE.name}
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              onClick={onClose}
              style={{
                display: "block",
                padding: "12px 16px",
                borderRadius: "10px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 500,
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--bg-tertiary)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--text-secondary)";
              }}
            >
              {tool.name}
            </Link>
          ))}
          <Link
            href="/about"
            onClick={onClose}
            style={{
              display: "block",
              padding: "12px 16px",
              borderRadius: "10px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 500,
              transition: "all 150ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "var(--bg-tertiary)";
              (e.currentTarget as HTMLElement).style.color =
                "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color =
                "var(--text-secondary)";
            }}
          >
            About
          </Link>
        </nav>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <Link
              href="/privacy"
              onClick={onClose}
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              onClick={onClose}
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
