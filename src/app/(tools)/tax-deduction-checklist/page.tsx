import { Metadata } from "next";
import { WebAppSchema } from "@/components/seo/WebAppSchema";
import { ToolHero } from "@/components/ui/ToolHero";
import { AdSlot } from "@/components/ui/AdSlot";
import { SeoContent } from "@/components/seo/SeoContent";
import { FaqAccordion } from "@/components/seo/FaqAccordion";
import { TaxChecklistWrapper } from "./TaxChecklistWrapper";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  title: "Freelance Tax Deductions Checklist — Free IRS Guide | FreelanceTaxChecklist",
  description: "Generate a free personalized freelance tax deduction checklist. Pick your profession, answer 6 questions, and get IRS form numbers and savings estimates instantly.",
  alternates: { canonical: "https://freelance-tax-checklist.adcmartinez1.workers.dev/tax-deduction-checklist" },
  openGraph: {
    title: "Freelance Tax Deductions Checklist — Free IRS Guide",
    description: "Generate a free personalized freelance tax deduction checklist. IRS form numbers and savings estimates included.",
    url: "https://freelance-tax-checklist.adcmartinez1.workers.dev/tax-deduction-checklist",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Tax Deductions Checklist — Free IRS Guide",
    description: "Personalized tax deduction checklist for freelancers. Free, instant, no signup.",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  { question: "Can I deduct my home office if I work from a coffee shop sometimes?", answer: "Yes. The home office deduction requires the space to be used regularly and exclusively for business — it does not require you to work only from home. If you have a dedicated room that meets the IRS definition, you can still claim it even if you occasionally work elsewhere." },
  { question: "What is the standard mileage rate for 2024?", answer: "The IRS standard mileage rate for business use in 2024 is 67 cents per mile. You can alternatively use the actual expense method, which tracks fuel, insurance, depreciation, and maintenance proportional to business use. Keep a mileage log for every business trip." },
  { question: "Is a SEP-IRA better than a Solo 401(k) for freelancers?", answer: "Both offer tax-deferred growth, but the Solo 401(k) generally allows higher limits for high earners because it accepts both employee and employer contributions (up to $69,000 in 2024). A SEP-IRA is simpler to administer with contributions up to 25% of net self-employment income." },
  { question: "Can I deduct a laptop I use for both personal and business use?", answer: "Yes, but only the business-use percentage. If you use a laptop 80% for work, you can deduct 80% of its cost. Under Section 179, you may deduct the full business portion in the year of purchase. Keep records showing the business vs. personal usage split." },
  { question: "Do I need to file quarterly estimated taxes as a freelancer?", answer: "If you expect to owe $1,000 or more in taxes for the year, the IRS requires quarterly estimated tax payments due in April, June, September, and January. A common strategy is to set aside 25–30% of each invoice into a dedicated savings account." },
  { question: "What records do I need to keep to support my deductions?", answer: "Keep records for at least 3 years from your filing date (7 years if you underreport income by more than 25%). For each deduction: original receipts, bank statements, a note of business purpose, and for home office or vehicle deductions, a usage log." },
];

export default function TaxDeductionChecklistPage() {
  return (
    <>
      <WebAppSchema
        name="Freelance Tax Deduction Checklist Generator"
        description="Generate a personalized IRS tax deduction checklist based on your freelance profession and situation."
        url="https://freelance-tax-checklist.adcmartinez1.workers.dev/tax-deduction-checklist"
        category="FinanceApplication"
      />
      <ToolHero
        title="Freelance Tax Deductions Checklist"
        subtitle="Select your freelance category, answer 6 quick questions, and get a personalized tax deduction checklist with IRS form numbers and estimated savings."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Tax Deduction Checklist", href: "/tax-deduction-checklist" },
        ]}
      />
      <main>
        <section style={{ maxWidth: "1152px", margin: "0 auto", padding: "48px 24px 80px" }}>
          <TaxChecklistWrapper />
        </section>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px 48px" }}>
          <AdSlot size="leaderboard" />
        </div>
        <SeoContent>
          <h2>What Are Freelance Tax Deductions?</h2>
          <p>The IRS allows self-employed individuals to deduct &ldquo;ordinary and necessary&rdquo; business expenses from their gross income under Schedule C (Form 1040). Unlike W-2 employees, freelancers bear the full 15.3% self-employment tax burden, making deductions especially valuable. Every dollar of legitimate deductions reduces not just your income tax but also your self-employment tax.</p>
          <p>The most overlooked deductions include the home office deduction (Form 8829), health insurance premiums (Schedule 1), and retirement contributions (a SEP-IRA can shelter up to 25% of net self-employment income). Many freelancers miss these entirely because they are unfamiliar with the forms involved or unsure whether they qualify.</p>
          <p>Above-the-line deductions — such as the self-employment tax deduction and health insurance premiums — reduce your adjusted gross income (AGI) directly, even if you take the standard deduction. For 2024, the Qualified Business Income (QBI) deduction under Section 199A may allow an additional 20% deduction of qualified business income for sole proprietors and pass-through entities.</p>
          <p>Proper record-keeping is essential for any audit. The IRS requires you to substantiate deductions with receipts, invoices, bank statements, and for mileage or home office claims, detailed logs. Keep these records for at least 3 years from the date you file.</p>

          <h2>How to Use the Freelance Tax Deduction Checklist Generator</h2>
          <ol>
            <li><strong>Select your freelance category</strong> from the six options: developer, designer, writer, consultant, driver, or photographer.</li>
            <li><strong>Answer six yes/no questions</strong> about your home office, equipment, vehicle, health insurance, retirement contributions, and software subscriptions.</li>
            <li><strong>Review your personalized checklist</strong> with IRS form numbers and estimated savings ranges for each deduction.</li>
            <li><strong>Check off items</strong> as you gather supporting documentation from your records.</li>
            <li><strong>Download or print the checklist</strong> to share with your tax preparer or use when filing yourself.</li>
          </ol>

          <h2>Frequently Asked Questions</h2>
          <FaqAccordion items={FAQ_ITEMS} />

          <h2>Disclaimer</h2>
          <p>This tool provides general educational information about common freelance tax deductions. It does not constitute tax, legal, or financial advice. Always consult a qualified tax professional (CPA or enrolled agent) before making decisions about your tax filing.</p>
        </SeoContent>
      </main>
    </>
  );
}
