export type FreelanceCategory =
  | "developer"
  | "designer"
  | "writer"
  | "consultant"
  | "driver"
  | "photographer";

export type QuestionId =
  | "homeOffice"
  | "equipment"
  | "vehicle"
  | "healthInsurance"
  | "retirement"
  | "softwareSubscriptions";

export interface Question {
  id: QuestionId;
  label: string;
  hint: string;
}

export interface Deduction {
  name: string;
  description: string;
  irsForm: string;
  savingsMin: number;
  savingsMax: number;
  alwaysApplies: boolean;
  requiredAnswers: Partial<Record<QuestionId, boolean>>;
}

export const QUESTIONS: Question[] = [
  { id: "homeOffice", label: "Do you have a dedicated home office space?", hint: "A room or defined area used exclusively and regularly for work." },
  { id: "equipment", label: "Did you purchase equipment this year?", hint: "Computers, cameras, desks, monitors, or any work-related hardware." },
  { id: "vehicle", label: "Do you use a vehicle for work?", hint: "Driving to clients, job sites, or purchasing supplies." },
  { id: "healthInsurance", label: "Do you pay for your own health insurance?", hint: "As a self-employed person not eligible for employer coverage." },
  { id: "retirement", label: "Did you contribute to a retirement account?", hint: "SEP-IRA, Solo 401(k), or SIMPLE IRA." },
  { id: "softwareSubscriptions", label: "Do you pay for software or online subscriptions?", hint: "SaaS tools, design apps, IDEs, stock libraries, cloud storage." },
];

const UNIVERSAL_DEDUCTIONS: Deduction[] = [
  { name: "Self-Employment Tax Deduction", description: "Deduct half of your SE tax from your gross income.", irsForm: "Schedule SE", savingsMin: 500, savingsMax: 3000, alwaysApplies: true, requiredAnswers: {} },
  { name: "Business Bank Fees", description: "Monthly fees for a dedicated business bank account.", irsForm: "Schedule C Line 27a", savingsMin: 50, savingsMax: 300, alwaysApplies: true, requiredAnswers: {} },
  { name: "Professional Development", description: "Online courses, books, and conferences related to your field.", irsForm: "Schedule C Line 27a", savingsMin: 200, savingsMax: 2000, alwaysApplies: true, requiredAnswers: {} },
  { name: "Business Phone", description: "Percentage of your phone bill used for business purposes.", irsForm: "Schedule C Line 25", savingsMin: 200, savingsMax: 800, alwaysApplies: true, requiredAnswers: {} },
  { name: "Marketing and Advertising", description: "Website hosting, domain registration, paid ads, business cards.", irsForm: "Schedule C Line 8", savingsMin: 100, savingsMax: 2000, alwaysApplies: true, requiredAnswers: {} },
];

const CONDITIONAL_DEDUCTIONS: Deduction[] = [
  { name: "Home Office Deduction", description: "Deduct the business-use percentage of rent/mortgage, utilities, and internet.", irsForm: "Form 8829", savingsMin: 500, savingsMax: 3500, alwaysApplies: false, requiredAnswers: { homeOffice: true } },
  { name: "Home Internet (Business Portion)", description: "Business portion of your home internet service.", irsForm: "Schedule C Line 25", savingsMin: 200, savingsMax: 600, alwaysApplies: false, requiredAnswers: { homeOffice: true } },
  { name: "Equipment — Section 179", description: "Fully deduct qualifying equipment in the purchase year instead of depreciating.", irsForm: "Form 4562", savingsMin: 500, savingsMax: 15000, alwaysApplies: false, requiredAnswers: { equipment: true } },
  { name: "Vehicle — Standard Mileage", description: "Deduct 67 cents per business mile driven (2024 IRS rate).", irsForm: "Schedule C Part II / Form 2106", savingsMin: 300, savingsMax: 4000, alwaysApplies: false, requiredAnswers: { vehicle: true } },
  { name: "Health Insurance Premiums", description: "100% of premiums deductible if not eligible for an employer plan.", irsForm: "Schedule 1 Line 17", savingsMin: 1500, savingsMax: 8000, alwaysApplies: false, requiredAnswers: { healthInsurance: true } },
  { name: "Retirement Contributions — SEP-IRA", description: "Contribute up to 25% of net self-employment income, tax-deferred.", irsForm: "Schedule 1 Line 16 / Form 5498", savingsMin: 1000, savingsMax: 15000, alwaysApplies: false, requiredAnswers: { retirement: true } },
  { name: "Software Subscriptions", description: "Business-use SaaS tools, cloud storage, and professional subscriptions.", irsForm: "Schedule C Line 27a", savingsMin: 100, savingsMax: 3000, alwaysApplies: false, requiredAnswers: { softwareSubscriptions: true } },
];

export const DEDUCTIONS: Record<FreelanceCategory, Deduction[]> = {
  developer: [
    ...UNIVERSAL_DEDUCTIONS, ...CONDITIONAL_DEDUCTIONS,
    { name: "Cloud Hosting & Server Costs", description: "AWS, Vercel, DigitalOcean, and other cloud infrastructure costs.", irsForm: "Schedule C Line 27a", savingsMin: 200, savingsMax: 2400, alwaysApplies: true, requiredAnswers: {} },
    { name: "Code Signing Certificates", description: "SSL/TLS certificates and code signing costs for professional use.", irsForm: "Schedule C Line 27a", savingsMin: 50, savingsMax: 500, alwaysApplies: true, requiredAnswers: {} },
  ],
  designer: [
    ...UNIVERSAL_DEDUCTIONS, ...CONDITIONAL_DEDUCTIONS,
    { name: "Design Software Subscriptions", description: "Adobe Creative Cloud, Figma, Sketch, and other design tool subscriptions.", irsForm: "Schedule C Line 27a", savingsMin: 500, savingsMax: 2000, alwaysApplies: true, requiredAnswers: {} },
    { name: "Stock Photo & Asset Licenses", description: "Stock photography, icon packs, font licenses, and design asset purchases.", irsForm: "Schedule C Line 27a", savingsMin: 100, savingsMax: 800, alwaysApplies: true, requiredAnswers: {} },
  ],
  writer: [
    ...UNIVERSAL_DEDUCTIONS, ...CONDITIONAL_DEDUCTIONS,
    { name: "Research Materials & Books", description: "Books, journals, subscriptions, and research materials related to writing topics.", irsForm: "Schedule C Line 27a", savingsMin: 100, savingsMax: 500, alwaysApplies: true, requiredAnswers: {} },
    { name: "Proofreading & Writing Tools", description: "Grammarly, Hemingway, plagiarism checkers, and similar writing software.", irsForm: "Schedule C Line 27a", savingsMin: 50, savingsMax: 300, alwaysApplies: true, requiredAnswers: {} },
  ],
  consultant: [
    ...UNIVERSAL_DEDUCTIONS, ...CONDITIONAL_DEDUCTIONS,
    { name: "Business Travel — Flights & Hotels", description: "Flights, hotels, and transportation when visiting clients or conferences.", irsForm: "Schedule C Line 24a", savingsMin: 500, savingsMax: 5000, alwaysApplies: true, requiredAnswers: {} },
    { name: "Client Meals (50% Deductible)", description: "Meals with clients or prospects discussing business — 50% of actual cost.", irsForm: "Schedule C Line 24b", savingsMin: 200, savingsMax: 2000, alwaysApplies: true, requiredAnswers: {} },
  ],
  driver: [
    ...UNIVERSAL_DEDUCTIONS, ...CONDITIONAL_DEDUCTIONS,
    { name: "Vehicle Depreciation", description: "Annual depreciation on your vehicle using the actual expense method.", irsForm: "Form 4562", savingsMin: 1000, savingsMax: 5000, alwaysApplies: true, requiredAnswers: {} },
    { name: "Car Insurance (Business Portion)", description: "Percentage of car insurance attributable to business use.", irsForm: "Schedule C Line 15", savingsMin: 300, savingsMax: 1200, alwaysApplies: true, requiredAnswers: {} },
    { name: "Fuel Receipts", description: "Actual fuel costs if using the actual expense method instead of standard mileage.", irsForm: "Schedule C Line 9", savingsMin: 500, savingsMax: 3000, alwaysApplies: true, requiredAnswers: {} },
  ],
  photographer: [
    ...UNIVERSAL_DEDUCTIONS, ...CONDITIONAL_DEDUCTIONS,
    { name: "Camera Equipment & Lenses", description: "Camera bodies, lenses, tripods, lighting, and other photography gear.", irsForm: "Schedule C / Form 4562", savingsMin: 500, savingsMax: 10000, alwaysApplies: true, requiredAnswers: {} },
    { name: "Studio Rental Fees", description: "Rental fees for studio space, shooting locations, or storage units for equipment.", irsForm: "Schedule C Line 20b", savingsMin: 500, savingsMax: 3000, alwaysApplies: true, requiredAnswers: {} },
    { name: "Editing Software", description: "Lightroom, Photoshop, Capture One, and other photo editing subscriptions.", irsForm: "Schedule C Line 27a", savingsMin: 100, savingsMax: 600, alwaysApplies: true, requiredAnswers: {} },
  ],
};
