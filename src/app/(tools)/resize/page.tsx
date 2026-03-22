import type { Metadata } from "next"
import { ImageResizerTool } from "./_components/ImageResizerTool"
import { ToolHero } from "@/components/ui/ToolHero"
import { AdSlot } from "@/components/ui/AdSlot"
import { SeoContent } from "@/components/seo/SeoContent"
import { WebAppSchema } from "@/components/seo/WebAppSchema"
import { FaqAccordion } from "@/components/seo/FaqAccordion"
import { SITE, TOOLS } from "@/lib/constants"
import Link from "next/link"

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
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#86868b", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Platform</th>
                <th style={{ textAlign: "left", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#86868b", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Format</th>
                <th style={{ textAlign: "right", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#86868b", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Width</th>
                <th style={{ textAlign: "right", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#86868b", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Height</th>
                <th style={{ textAlign: "left", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#86868b", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {[
                { p: "Instagram", n: "Square Post", w: 1080, h: 1080, b: "Feed, grid consistency" },
                { p: "Instagram", n: "Portrait Post", w: 1080, h: 1350, b: "Max feed real estate" },
                { p: "Instagram", n: "Story / Reel", w: 1080, h: 1920, b: "Stories, Reels" },
                { p: "Instagram", n: "Landscape Post", w: 1080, h: 566, b: "Wide/panoramic shots" },
                { p: "Twitter/X", n: "Post Image", w: 1200, h: 675, b: "Tweet images" },
                { p: "Twitter/X", n: "Header / Banner", w: 1500, h: 500, b: "Profile header" },
                { p: "Twitter/X", n: "Profile Photo", w: 400, h: 400, b: "Profile picture" },
                { p: "LinkedIn", n: "Post Image", w: 1200, h: 627, b: "Feed posts" },
                { p: "LinkedIn", n: "Cover Photo", w: 1584, h: 396, b: "Company page cover" },
                { p: "LinkedIn", n: "Profile Banner", w: 1128, h: 191, b: "Personal profile banner" },
                { p: "Facebook", n: "Post Image", w: 1200, h: 630, b: "Feed posts" },
                { p: "Facebook", n: "Cover Photo", w: 851, h: 315, b: "Page cover" },
                { p: "Facebook", n: "Story", w: 1080, h: 1920, b: "Stories" },
                { p: "Facebook", n: "Event Cover", w: 1920, h: 1005, b: "Event pages" },
                { p: "YouTube", n: "Thumbnail", w: 1280, h: 720, b: "Video thumbnails" },
                { p: "YouTube", n: "Channel Art", w: 2560, h: 1440, b: "Channel banner" },
                { p: "YouTube", n: "Community Post", w: 1080, h: 1080, b: "Community tab" },
                { p: "Web", n: "OG Image", w: 1200, h: 630, b: "Link previews everywhere" },
                { p: "Web", n: "Pinterest Pin", w: 1000, h: 1500, b: "Pinterest posts" },
                { p: "Web", n: "TikTok Cover", w: 1080, h: 1920, b: "TikTok video cover" },
              ].map((row, i) => (
                <tr key={row.p + row.n} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                  <td style={{ padding: "8px 12px", fontSize: "14px", color: "#86868b", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{row.p}</td>
                  <td style={{ padding: "8px 12px", fontSize: "14px", color: "#f5f5f7", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{row.n}</td>
                  <td style={{ padding: "8px 12px", fontSize: "14px", color: "#86868b", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{row.w}</td>
                  <td style={{ padding: "8px 12px", fontSize: "14px", color: "#86868b", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{row.h}</td>
                  <td style={{ padding: "8px 12px", fontSize: "14px", color: "#86868b", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
