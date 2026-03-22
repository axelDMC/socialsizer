export const SITE = {
  name: "SocialSizer",
  url: "https://socialsizer.adcmartinez1.workers.dev",
  description: "Free browser-based tool to resize any image for Instagram, Twitter, LinkedIn, Facebook, YouTube and more. No upload. 100% private.",
  tagline: "Resize once. Post everywhere.",
  socialX: "https://x.com/Axel1863670",
  socialLinkedIn: "https://linkedin.com/in/axeldmc",
}

export interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const TOOLS: Tool[] = [
  {
    name: "Social Media Image Resizer",
    slug: "/resize",
    description: "Resize any image to all major social media formats instantly. Download individually or as a ZIP.",
    icon: "ImageDown",
  },
  {
    name: "OG Image Resizer",
    slug: "/og-image",
    description: "Resize your image to the perfect 1200x630 Open Graph size for link previews on any platform.",
    icon: "Globe",
  },
]
