import type { Metadata } from "next"
import { ImageResizerTool } from "./_components/ImageResizerTool"
import { ToolHero } from "@/components/ui/ToolHero"
import { AdSlot } from "@/components/ui/AdSlot"
import { SeoContent } from "@/components/seo/SeoContent"
import { WebAppSchema } from "@/components/seo/WebAppSchema"
import { FaqAccordion } from "@/components/seo/FaqAccordion"
import { SITE, TOOLS } from "@/lib/constants"
import Link from "next/link"

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function formatRatio(w: number, h: number): string {
  const d = gcd(w, h)
  const rw = w / d
  const rh = h / d
  if (rw > 20 || rh > 20) {
    return rh > rw
      ? `${(h / w).toFixed(2)}:1`
      : `${(w / h).toFixed(2)}:1`
  }
  return `${rw}:${rh}`
}

const SIZE_GUIDE = [
  {
    platform: "Instagram",
    color: "#e1306c",
    formats: [
      { name: "Square Post",    w: 1080, h: 1080, bestFor: "Feed, grid consistency" },
      { name: "Portrait Post",  w: 1080, h: 1350, bestFor: "Max feed real estate" },
      { name: "Story / Reel",   w: 1080, h: 1920, bestFor: "Stories, Reels" },
      { name: "Landscape Post", w: 1080, h: 566,  bestFor: "Wide / panoramic shots" },
    ],
  },
  {
    platform: "Twitter / X",
    color: "#1d9bf0",
    formats: [
      { name: "Post Image",      w: 1200, h: 675, bestFor: "Tweet images" },
      { name: "Header / Banner", w: 1500, h: 500, bestFor: "Profile header" },
      { name: "Profile Photo",   w: 400,  h: 400, bestFor: "Profile picture" },
    ],
  },
  {
    platform: "LinkedIn",
    color: "#0a66c2",
    formats: [
      { name: "Post Image",     w: 1200, h: 627, bestFor: "Feed posts" },
      { name: "Cover Photo",    w: 1584, h: 396, bestFor: "Company page cover" },
      { name: "Profile Banner", w: 1128, h: 191, bestFor: "Personal profile banner" },
    ],
  },
  {
    platform: "Facebook",
    color: "#1877f2",
    formats: [
      { name: "Post Image",  w: 1200, h: 630,  bestFor: "Feed posts" },
      { name: "Cover Photo", w: 851,  h: 315,  bestFor: "Page cover" },
      { name: "Story",       w: 1080, h: 1920, bestFor: "Stories" },
      { name: "Event Cover", w: 1920, h: 1005, bestFor: "Event pages" },
    ],
  },
  {
    platform: "YouTube",
    color: "#ff0000",
    formats: [
      { name: "Thumbnail",       w: 1280, h: 720,  bestFor: "Video thumbnails" },
      { name: "Channel Art",     w: 2560, h: 1440, bestFor: "Channel banner" },
      { name: "Community Post",  w: 1080, h: 1080, bestFor: "Community tab" },
    ],
  },
  {
    platform: "Web / Other",
    color: "#34d399",
    formats: [
      { name: "OG Image",      w: 1200, h: 630,  bestFor: "Link previews everywhere" },
      { name: "Pinterest Pin", w: 1000, h: 1500, bestFor: "Pinterest posts" },
      { name: "TikTok Cover",  w: 1080, h: 1920, bestFor: "TikTok video cover" },
    ],
  },
]

export const metadata: Metadata = {
  title: "Social Media Image Resizer — Resize Free | SocialSizer",
  description:
    "Resize images for Instagram, Twitter, LinkedIn, Facebook, YouTube and more in one click. Completely free, completely private, download as ZIP. No upload.",
  alternates: { canonical: `${SITE.url}/resize` },
  openGraph: {
    title: "Social Media Image Resizer — Resize Free | SocialSizer",
    description:
      "Resize images for Instagram, Twitter, LinkedIn, Facebook, YouTube and more in one click. Completely free, completely private, download as ZIP. No upload.",
    url: `${SITE.url}/resize`,
    type: "website",
    images: [{ url: `${SITE.url}/og.png` }],
  },
  twitter: { card: "summary_large_image" },
}

const faqItems = [
  {
    question: "Is SocialSizer really free?",
    answer:
      "Yes, completely free. No account, no watermark, no limits. We support ourselves through non-intrusive ads.",
  },
  {
    question: "Do my images get uploaded to a server?",
    answer:
      "Never. All resizing happens locally in your browser using the Canvas API. Your images are private and never transmitted anywhere.",
  },
  {
    question: "What image formats can I upload?",
    answer:
      "You can upload JPG, PNG, and WebP files. The tool processes the first frame of animated images. File size limit is 20MB for performance reasons.",
  },
  {
    question: "What format are the exported images?",
    answer:
      "By default PNG (lossless). You can switch to JPEG and adjust quality from 70–100% for smaller file sizes when transparency is not needed.",
  },
  {
    question: "Can I resize to a custom size?",
    answer:
      "Currently SocialSizer focuses on official platform presets. A custom size tool is on the roadmap — bookmark us and check back soon.",
  },
  {
    question: "Why does my image look cropped?",
    answer:
      "By default, Crop to Fill mode fills the entire canvas by cropping the edges. Switch to Fit with Padding to show the full image with black bars instead.",
  },
]

const relatedTool = TOOLS.find((t) => t.slug === "/og-image")

export default function ResizePage() {
  return (
    <>
      <WebAppSchema
        name="Social Media Image Resizer"
        description="Resize any image to Instagram, Twitter, LinkedIn, Facebook and YouTube formats instantly. Free, private, no upload needed. Download as ZIP."
        url={`${SITE.url}/resize`}
        category="ImageApplication"
      />
      <main>
        <ToolHero
          title="Social Media Image Resizer"
          subtitle="Upload once. Get every format. Download all as ZIP."
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Image Resizer", href: "/resize" },
          ]}
        />
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <ImageResizerTool />
        </section>
        <AdSlot size="leaderboard" />
        <SeoContent>
          <h2>What Is a Social Media Image Resizer?</h2>
          <p>
            Every social media platform has its own image dimension requirements — and getting
            them wrong costs you reach. Instagram automatically crops portrait images to a
            square preview in the feed. Twitter compresses oversized photos into blurry
            thumbnails. LinkedIn silently zooms in on images that don&apos;t match its 1.91:1
            ratio. The result is lost engagement, unprofessional-looking posts, and wasted
            time re-editing the same image over and over.
          </p>
          <p>
            A social media image resizer solves this by letting you upload a single source
            image and instantly export it at every platform&apos;s exact recommended size.
            SocialSizer supports 20 presets across Instagram, Twitter/X, LinkedIn, Facebook,
            YouTube, and the web — including OG images for link previews.
          </p>
          <p>
            Professional content creators always resize before posting. A correctly-sized
            image loads faster (the platform doesn&apos;t have to generate multiple crops),
            displays sharper (no lossy re-compression), and fills the frame exactly as you
            designed it. For brands posting across 4–5 platforms daily, manual resizing in
            Photoshop or Canva can consume 30–60 minutes per campaign. SocialSizer cuts that
            to under 30 seconds.
          </p>
          <p>
            The tool offers two resize modes. <strong>Crop to Fill</strong> center-crops
            your image to exactly fill the canvas — ideal when your subject is centered and
            you want a professional, tight composition. <strong>Fit with Padding</strong>
            shows your entire image scaled down to fit, with black (or white in light mode)
            bars on the sides — ideal for infographics, text-heavy images, or artwork where
            cropping would lose important detail.
          </p>
          <p>
            You can export as PNG (lossless, best for graphics and text) or JPEG (smaller
            file size, best for photographs). The JPEG quality slider lets you balance file
            size against visual quality from 70% (compact) to 100% (maximum quality).
          </p>
          <p>
            Most importantly: <strong>your images never leave your browser.</strong> All
            processing happens locally via the HTML5 Canvas API. There is no server, no
            upload, no account, no watermark. SocialSizer works entirely offline after the
            page loads.
          </p>

          <h2>How to Use the Social Media Image Resizer</h2>
          <ol>
            <li>Upload or drag-and-drop your image (JPG, PNG, or WebP)</li>
            <li>Select the social media formats you need (or click &quot;Select All&quot;)</li>
            <li>Choose Crop to Fill or Fit with Padding depending on your content</li>
            <li>Click &quot;Download All Selected&quot; to get a ZIP with every format</li>
            <li>Upload directly to your social media platforms — pixel-perfect every time</li>
          </ol>

          <h2>Social Media Image Size Guide (2026)</h2>
          <div style={{
            border: "1px solid var(--border)",
            borderRadius: "16px",
            overflow: "hidden",
            marginTop: "24px",
            overflowX: "auto",
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "520px" }}>
              <thead>
                <tr style={{ background: "var(--bg-tertiary)" }}>
                  <th style={{ textAlign: "left", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", padding: "10px 16px 10px 40px", fontWeight: 600, whiteSpace: "nowrap" }}>Format</th>
                  <th style={{ textAlign: "center", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", padding: "10px 16px", fontWeight: 600, whiteSpace: "nowrap" }}>Dimensions</th>
                  <th style={{ textAlign: "center", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", padding: "10px 16px", fontWeight: 600, whiteSpace: "nowrap" }}>Ratio</th>
                  <th style={{ textAlign: "left", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", padding: "10px 16px", fontWeight: 600, whiteSpace: "nowrap" }}>Best For</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.flatMap(({ platform, color, formats }) => [
                  <tr key={`hdr-${platform}`} style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
                    <td colSpan={4} style={{ padding: "8px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{
                          display: "inline-block",
                          width: "8px", height: "8px",
                          borderRadius: "50%",
                          background: color,
                          flexShrink: 0,
                          boxShadow: `0 0 8px ${color}99`,
                        }} />
                        <span style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color,
                          letterSpacing: "0.03em",
                        }}>{platform}</span>
                      </div>
                    </td>
                  </tr>,
                  ...formats.map((fmt, i) => (
                    <tr
                      key={`${platform}-${fmt.name}`}
                      style={{
                        background: i % 2 !== 0 ? "var(--bg-tertiary)" : "transparent",
                        borderTop: "1px solid var(--border)",
                      }}
                    >
                      <td style={{ padding: "11px 16px 11px 40px", fontSize: "14px", color: "var(--text-primary)", fontWeight: 500 }}>
                        {fmt.name}
                      </td>
                      <td style={{ padding: "11px 16px", textAlign: "center" }}>
                        <span style={{
                          fontFamily: "var(--font-geist-mono, monospace)",
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                          background: "var(--bg-tertiary)",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          padding: "3px 8px",
                          whiteSpace: "nowrap",
                          display: "inline-block",
                        }}>
                          {fmt.w} × {fmt.h}
                        </span>
                      </td>
                      <td style={{ padding: "11px 16px", textAlign: "center" }}>
                        <span style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--text-muted)",
                          fontVariantNumeric: "tabular-nums",
                          whiteSpace: "nowrap",
                        }}>
                          {formatRatio(fmt.w, fmt.h)}
                        </span>
                      </td>
                      <td style={{ padding: "11px 16px", fontSize: "13px", color: "var(--text-muted)" }}>
                        {fmt.bestFor}
                      </td>
                    </tr>
                  )),
                ])}
              </tbody>
            </table>
          </div>

          <h2>Frequently Asked Questions</h2>
          <FaqAccordion items={faqItems} />

          {relatedTool && (
            <>
              <h2>Related Tools</h2>
              <div>
                <Link href={relatedTool.slug} className="block p-4 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300">
                  <div className="font-semibold text-white">{relatedTool.name}</div>
                  <div className="text-sm text-[#86868b] mt-1">{relatedTool.description}</div>
                </Link>
              </div>
            </>
          )}
        </SeoContent>
        <AdSlot size="rectangle" />
      </main>
    </>
  )
}
