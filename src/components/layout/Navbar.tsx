"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { SITE, TOOLS } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTools = TOOLS.slice(0, 4);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          height: "64px",
          display: "flex",
          alignItems: "center",
          background: scrolled
            ? "rgba(8, 8, 13, 0.85)"
            : "rgba(8, 8, 13, 0.6)",
          backdropFilter: "blur(20px) saturate(150%)",
          WebkitBackdropFilter: "blur(20px) saturate(150%)",
          transition: "background 200ms ease",
        }}
        className="navbar-header"
      >
        <div
          style={{
            maxWidth: "1152px",
            width: "100%",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "2px",
                background: "var(--accent)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontWeight: 800,
                fontSize: "18px",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              {SITE.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flex: 1,
            }}
            className="navbar-desktop-nav"
          >
            {navTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.slug}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 150ms",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--text-primary)";
                  el.style.background = "var(--bg-tertiary)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--text-secondary)";
                  el.style.background = "transparent";
                }}
              >
                {tool.name}
              </Link>
            ))}
            <Link
              href="/about"
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--text-primary)";
                el.style.background = "var(--bg-tertiary)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--text-secondary)";
                el.style.background = "transparent";
              }}
            >
              About
            </Link>
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="navbar-mobile-btn"
              style={{
                width: 40,
                height: 40,
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Responsive styles */}
      <style>{`
        .navbar-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .light .navbar-header {
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        @media (max-width: 768px) {
          .navbar-desktop-nav {
            display: none !important;
          }
          .navbar-mobile-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
