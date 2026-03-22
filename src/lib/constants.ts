export const SITE = {
  name: "FreelanceTaxChecklist",
  url: "https://freelance-tax-checklist.adcmartinez1.workers.dev",
  description: "Free freelance tax deduction checklist generator. Select your profession, answer 6 questions, and get a personalized IRS deduction list with form numbers and savings estimates.",
  tagline: "Your personalized freelance tax deduction checklist",
} as const;

export interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const TOOLS: Tool[] = [
  {
    name: "Tax Deduction Checklist",
    slug: "tax-deduction-checklist",
    description: "Get a personalized IRS tax deduction checklist based on your freelance profession and situation.",
    icon: "ClipboardList",
  },
];
