"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export function ToolCard({ title, description, href, icon }: ToolCardProps) {
  const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as
    | ComponentType<LucideProps>
    | undefined;

  return (
    <Link
      href={href}
      style={{
        display: "block",
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "24px",
        textDecoration: "none",
        transition: "all 200ms ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-hover)";
        el.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.transform = "scale(1)";
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "10px",
          background: "var(--accent-muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
        aria-hidden="true"
      >
        {IconComponent ? (
          <IconComponent size={20} strokeWidth={1.5} />
        ) : null}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--text-primary)",
          margin: "0 0 8px 0",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </Link>
  );
}
