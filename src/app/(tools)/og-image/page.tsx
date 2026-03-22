import type { Metadata } from "next"
import { OgImageTool } from "./_components/OgImageTool"
import { ToolHero } from "@/components/ui/ToolHero"
import { AdSlot } from "@/components/ui/AdSlot"
import { SeoContent } from "@/components/seo/SeoContent"
import { WebAppSchema } from "@/components/seo/WebAppSchema"
import { FaqAccordion } from "@/components/seo/FaqAccordion"
import { SITE, TOOLS } from "@/lib/constants"
import Link from "next/link"

export const metadata: Metadata = {
  title: "OG Image Resizer — Free 1200x630 Tool | SocialSizer",
  description:
    "Resize images to perfect 1200x630 Open Graph format for Twitter, Facebook, and LinkedIn previews. Instant, completely free, no upload required. Get it right.",
  alternates: { canonical: `${SITE.url}/og-image` },
  openGraph: {
    title: "OG Image Resizer — Free 1200x630 Tool | SocialSizer",
    description:
      "Resize images to perfect 1200x630 Open Graph format for Twitter, Facebook, and LinkedIn previews. Instant, completely free, no upload required. Get it right.",
    url: `${SITE.url}/og-image`,
    type: "website",
    images: [{ url: `${SITE.url}/og.png` }],
  },
  twitter: { card: "summary_large_image" },
}

const faqItems = [
  {
    question: "What is the OG image size?",
    answer: "The recommended Open Graph image size is 1200×630 pixels, a 1.91:1 ratio. This ensures crisp previews on Facebook, Twitter/X, LinkedIn, Slack, and Discord.",
  },
  {
    question: "Does Facebook compress OG images?",
    answer: "Yes, Facebook re-compresses images. Start with a high-quality PNG or JPEG at 85%+ quality to minimize visible degradation after their compression.",
  },
  {
    question: "Where do I add og:image to my website?",
    answer: "Add a <meta property=\"og:image\" content=\"https://yoursite.com/og.png\"> tag in the <head> section of your HTML. In Next.js, set it in the metadata export.",
  },
  {
    question: "What is the minimum OG image size?",
    answer: "The minimum is 200×200 pixels, but at that size previews look tiny. Always use 1200×630 for best results across all platforms.",
  },
  {
    question: "Why is my OG image not updating?",
    answer: "Platforms cache OG images aggressively. Use Facebook's Sharing Debugger (developers.facebook.com/tools/debug) or Twitter Card Validator to force a cache refresh.",
  },
]

const relatedTool = TOOLS.find((t) => t.slug === "/resize")

export default function OgImagePage() {
  return (
    <>
      <WebAppSchema
        name="OG Image Resizer"
        description="Resize any image to the perfect Open Graph 1200x630 format for Twitter, Facebook and LinkedIn link previews. Free, instant, no upload."
        url={`${SITE.url}/og-image`}
        category="ImageApplication"
      />
      <main>
        <ToolHero
          title="OG Image Resizer"
          subtitle="Perfect 1200x630 link previews for every platform."
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "OG Image Resizer", href: "/og-image" },
          ]}
        />
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <OgImageTool />
        </section>
        <AdSlot size="leaderboard" />
        <SeoContent>
          <h2>What Is an OG Image?</h2>
          <p>
            An OG image (Open Graph image) is the preview image that appears when you share a
            URL on social media or messaging platforms. When you paste a link into Twitter/X,
            Facebook, LinkedIn, Slack, Discord, or iMessage, the platform fetches your
            page&apos;s <code>og:image</code> meta tag and displays it as a rich preview card.
          </p>
          <p>
            The Open Graph protocol was created by Facebook in 2010 to standardize how web
            content is displayed when shared. Today, virtually every major platform and app
            reads og:image to build link previews.
          </p>
          <p>
            The recommended og:image size is <strong>1200×630 pixels</strong> — a 1.91:1 aspect
            ratio. This size renders correctly on Facebook (minimum 600×314), Twitter/X
            (minimum 300×157 for summary_large_image), LinkedIn, and all other major platforms.
            Images that don&apos;t match this ratio get cropped or letterboxed by the platform,
            which often cuts off important content.
          </p>
          <p>
            Common mistakes: using a 1:1 square image (it&apos;ll be cropped on Twitter), using
            a file that&apos;s too small (platforms ignore images under 200×200), or forgetting
            to bust the platform&apos;s cache after updating your og:image (the old image can
            persist for days). This tool outputs the exact 1200×630 format so you can skip
            all of these pitfalls.
          </p>

          <h2>How to Use the OG Image Resizer</h2>
          <ol>
            <li>Upload your source image (JPG, PNG, or WebP)</li>
            <li>Toggle between Crop to Fill or Fit with Padding</li>
            <li>Preview the result in real time at the correct ratio</li>
            <li>Click Download to save your 1200×630 OG image</li>
          </ol>

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
