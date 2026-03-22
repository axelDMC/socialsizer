import type { Metadata } from "next";
import { SITE, TOOLS } from "@/lib/constants";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { ToolCard } from "@/components/ui/ToolCard";

export const metadata: Metadata = {
  title: `About ${SITE.name}`,
  description: `Learn about ${SITE.name} — ${SITE.description}`,
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: `About ${SITE.name}`,
    description: `Learn about ${SITE.name} — ${SITE.description}`,
    url: `${SITE.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <div
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))",
          borderBottom: "1px solid var(--border)",
          paddingTop: "48px",
          paddingBottom: "40px",
        }}
      >
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: "16px" }}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
              ]}
            />
          </div>
          <h1>About {SITE.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ maxWidth: "720px" }}>
          <p
            style={{
              fontSize: "17px",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginBottom: "24px",
            }}
          >
            {SITE.name} is a collection of free, browser-based tools designed to
            make everyday tasks faster and simpler. No accounts, no subscriptions
            — just open the tool and get things done.
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginBottom: "24px",
            }}
          >
            We built {SITE.name} because resizing images for social media shouldn&apos;t
            require paying for Canva, learning Photoshop, or uploading your content
            to third-party services. Every creator, marketer, and small business owner
            deserves free, simple tools that respect their privacy.
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginBottom: "48px",
            }}
          >
            Our tools are 100% client-side. Your images never touch our servers — they
            never even leave your browser. No tracking, no analytics, no selling your
            data. Just open, use, and go. If you like what we&apos;ve built, share it.
            If you have ideas for new tools, contact us on GitHub.
          </p>

          {/* Privacy section */}
          <div
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "28px",
              marginBottom: "48px",
            }}
          >
            <h2
              style={{
                marginBottom: "12px",
                borderLeft: "3px solid var(--accent)",
                paddingLeft: "12px",
              }}
            >
              Privacy First
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              Every tool on {SITE.name} runs entirely in your browser. Your data
              is never uploaded to our servers, never stored, and never shared.
              What happens in your browser stays in your browser.
            </p>
          </div>
        </div>

        {/* Tools */}
        {TOOLS.length > 0 && (
          <div>
            <h2
              style={{
                marginBottom: "24px",
                borderLeft: "3px solid var(--accent)",
                paddingLeft: "12px",
              }}
            >
              Our Tools
            </h2>
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
          </div>
        )}
      </div>
    </main>
  );
}
