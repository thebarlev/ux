/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next"

import { LegalTemplate } from "@/app/_components/legal/LegalTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { JsonLd, webPageSchema } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "Terms of Use | Uxellent",
  description: "Read the Uxellent terms of use covering your rights, responsibilities, and the rules for using our website and services.",
  alternates: {
    canonical: "/en/terms",
    languages: heEnAlternateLanguages("/terms", "/en/terms"),
  },
}

export default function TermsPageEn() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="ltr">
      <JsonLd
        data={webPageSchema({
          name: "Terms of Use | Uxellent",
          description: "Uxellent Terms of Use - Last updated February 2026",
          url: "https://uxellent.com/en/terms",
          dateModified: "2026-02-16",
        })}
      />
      <div id="main" role="main">
        <LegalTemplate
          title="Terms of Use"
          subtitle="Last updated: 16 February 2026"
          dir="ltr"
        >
          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">1. General</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.1 About Uxellent and the Services</h3>
            <p>
              Bugo Media LTD, Company No. 515960508 ("Uxellent", "we" or "the Company") operates an online system for creating, managing, and sending digital accounting documents, including tax invoices, receipts, transaction invoices, and other business documents. The system is available via:
            </p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Our website: uxellent.com</li>
              <li>The online system: app.uxellent.com</li>
              <li>Digital signing service: dsign.uxellent.com</li>
            </ul>
            <p>The system, website, and digital signing service are collectively referred to as "the Services" or "the System".</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.2 Agreement to Terms</h3>
            <p>
              These terms of use ("Terms" or "Agreement") govern the relationship between Uxellent and anyone who uses the Services ("User", "you").
            </p>
            <p>
              By using the Services, you agree to these Terms in full. If you do not agree (in whole or in part), you may not use the Services.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.3 Additional Service-Specific Terms</h3>
            <p>
              In addition to these Terms, specific terms may apply to particular services. Such terms supplement and do not replace these Terms.
            </p>
            <p>
              In case of conflict between these Terms and other published instructions, these Terms prevail.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.4 Privacy Policy</h3>
            <p>
              Uxellent's Privacy Policy is available at <a href="https://uxellent.com/en/privacy" className="text-blue-600 underline">https://uxellent.com/en/privacy</a> and forms an integral part of these Terms.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.5 Support</h3>
            <p>We provide technical support via:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>In-app chat (app.uxellent.com)</li>
              <li>WhatsApp: 0545215193</li>
            </ul>
            <p><strong>Hours:</strong> Sun–Thu, 9:00–18:00</p>
            <p><strong>Response time:</strong> Up to 48 business hours</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.6 Reporting Problematic Content</h3>
            <p>
              If you encounter content that violates any law, please notify us at <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a> with details of the content and the nature of the violation.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">1.7 General Notes</h3>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Section headings are for convenience only and do not affect interpretation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">2. Services and License</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.1 What the Services Include</h3>
            <p>Uxellent grants a license to perform the following ("the License"):</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Create tax invoices, transaction invoices, and receipts</li>
              <li>Send documents by email or export to PDF</li>
              <li>Secure digital signing (via Dsign)</li>
              <li>Create documents in Hebrew and English</li>
              <li>Manage customer and transaction details</li>
              <li>Store documents in the system</li>
              <li>Customize documents (logo, notes, payment terms)</li>
            </ul>
            <p>The above list is not exhaustive. Additional features may be added from time to time.</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.2 Eligibility</h3>
            <p>The License is granted to users who:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Operate a legally registered business in Israel</li>
              <li>Are adults (18+)</li>
              <li>Agree to these Terms</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.3 Suitability</h3>
            <p>
              You must verify before use that the Services meet your needs. You have no claim against Uxellent for any mismatch with your needs or expectations.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.4 User Responsibility</h3>
            <p>
              You are solely and fully responsible for all use of the system by you and/or anyone on your behalf.
            </p>
            <p>
              Uxellent is not responsible for your use, the content you create, or the documents you produce.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.5 Not Accounting Advice</h3>
            <p><strong>Important:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>System content does not replace accounting, tax, or legal advice</li>
              <li>Uxellent does not provide advisory services of any kind</li>
              <li>The system is a document management tool only</li>
              <li>You must seek professional advice as needed</li>
            </ul>
            <p>
              Technical support responses do not constitute accounting, tax, or legal advice.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.6 System Recommendations</h3>
            <p>
              The system may suggest recommendations, defaults, or classifications (e.g., income/expense categories, document type, suggested fields).
            </p>
            <p><strong>You must review and verify every recommendation yourself.</strong></p>
            <p>
              Uxellent is not responsible for choices you make or could make in the system. You are solely responsible for document accuracy, classifications, and content.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.7 Changes to Services</h3>
            <p>We may change the Services at any time, including:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Visual design</li>
              <li>Functionality and features</li>
              <li>Adding or removing services</li>
              <li>Maintenance and updates that may cause temporary downtime</li>
            </ul>
            <p>
              <strong>Exception:</strong> If a change substantially prevents you from using paid services, you may cancel and receive a prorated refund for the unused period.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.8 Restriction or Termination</h3>
            <p>Uxellent may:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Warn users about improper or violating use</li>
              <li>Restrict access for users who breach the Terms</li>
              <li>Suspend or revoke the License (in whole or in part)</li>
              <li>Remove content or reverse actions that violate the Terms</li>
              <li>Block IP addresses or devices suspected of harmful activity</li>
            </ul>
            <p>At our sole discretion, without prior notice.</p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">3. User Account</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.1 Creating an Account</h3>
            <p>
              To use the Services, you must create a user account ("Account").
            </p>
            <p>When creating an account, you must provide:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Full name</li>
              <li>ID number</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business details (name, registration number, address)</li>
            </ul>
            <p><strong>Prohibited:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Providing false or incomplete information</li>
              <li>Creating an account in another person's name without consent (a criminal offense)</li>
              <li>Creating more than one account per business (same registration number)</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.2 Business Ownership</h3>
            <p>You represent and warrant:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Every business you open in your account is owned by you</li>
              <li>The business is legally registered in Israel</li>
              <li>You have legal authority to manage the business in the system</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.3 Password and Security</h3>
            <p><strong>Your obligations:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Keep your password confidential</li>
              <li>Use a strong password (8–16 characters)</li>
              <li>Do not share your password via email or messaging</li>
              <li>Notify us immediately of any suspected unauthorized access</li>
            </ul>
            <p><strong>You are responsible for all activity in your account, whether or not you authorized it.</strong></p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.4 Prohibited Use</h3>
            <p>You may not:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Use automated software (bots, crawlers) to browse or collect data</li>
              <li>Manipulate URLs to access internal pages</li>
              <li>Upload or publish content that violates law, copyright, trade secrets, or privacy</li>
              <li>Modify, edit, or interfere with the system's source code, design, or content</li>
              <li>Use the Services for fraud, deception, or illegal activity</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.5 Marketing Consent</h3>
            <p>You agree we may send to your email:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Notifications of actions you perform</li>
              <li>Technical updates and service notices</li>
              <li>Newsletter and marketing (opt-out available at any time)</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.6 Uxellent Access to Your Account</h3>
            <p>
              You agree that Uxellent representatives may access your account at any time for:
            </p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Technical checks</li>
              <li>Troubleshooting</li>
              <li>Support</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.7 Document Access After Subscription Ends</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
              <p className="font-semibold text-yellow-800">Important:</p>
              <p className="text-yellow-800">
                14 days after your subscription ends (for any reason), you will no longer be able to access documents you created.
              </p>
              <p className="text-yellow-800 mt-2">
                <strong>You must download all documents before this deadline.</strong>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">4. Free Trial</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.1 Free Trial Period</h3>
            <p>
              Uxellent offers a free trial of up to one year from account creation ("Free Trial").
            </p>
            <p>
              During this period, you may create up to 10 documents per calendar month at no charge.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.2 Terms and Limits</h3>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>The Free Trial is provided without any commitment from Uxellent, including availability or absence of faults</li>
              <li>Uxellent may change free trial terms at any time (including document limits or duration)</li>
              <li>Changes apply to new users; existing users keep current terms until the end of their year</li>
              <li>The Free Trial is offered once per user/business</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.3 End of Free Trial</h3>
            <p>
              After one year or exceeding the 10-document monthly limit, you must purchase a paid subscription to continue.
            </p>
            <p>
              Without a subscription, you cannot create new documents but may view existing ones for 14 additional days.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">5. Payment</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">5.1 Pricing</h3>

            <div className="bg-white p-4 rounded-lg my-4">
              <h4 className="font-semibold mb-2">Monthly subscription:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cost: $27/month</li>
                <li>Up to 50 documents per month</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg my-4">
              <h4 className="font-semibold mb-2">Overage:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Each document beyond 50: $1/document</li>
                <li>Charged automatically</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg my-4">
              <h4 className="font-semibold mb-2">Annual subscription:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cost: $290/year (paid in advance)</li>
                <li>Up to 50 documents per month</li>
              </ul>
            </div>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">5.2 Price and Service Changes</h3>
            <p>Uxellent may change from time to time:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Service prices</li>
              <li>Subscription types and packages</li>
              <li>Features and service mix</li>
            </ul>
            <p><strong>Changes apply:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>New users: upon publication</li>
              <li>Existing users: only at next renewal (not mid-period)</li>
            </ul>
            <p>
              <strong>Notice:</strong> Material changes will be published on the website and/or in the system at least 30 days in advance.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">5.3 Billing Cycles</h3>
            <p><strong>Monthly:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Unlimited duration</li>
              <li>Charged at the start of each month, in advance</li>
              <li>Cancellable at any time (see Section 6)</li>
            </ul>
            <p><strong>Annual:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Unlimited duration</li>
              <li>Charged once per year, in advance</li>
              <li>Cancellable at any time (see Section 6)</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">5.4 Billing Dates</h3>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>First charge upon subscription purchase</li>
              <li>Recurring charges at the start of each period (month/year), in advance</li>
              <li>Overage charges at month end</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">5.5 Invoices</h3>
            <p>
              After each charge, an invoice is generated automatically and saved in your account.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">6. Cancellation and Refunds</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.1 Monthly Cancellation</h3>

            <p><strong>Cancellation on purchase day:</strong></p>
            <p>
              If you cancel by 23:59 on the day of purchase and did not use the system, you receive a full refund.
            </p>

            <p className="mt-4"><strong>Cancellation after purchase day:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Cancellation takes effect at the end of the calendar month in which you notified us</li>
              <li>No refund</li>
              <li>You may continue using the system until month end</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.2 Annual Cancellation</h3>

            <p><strong>Cancellation within 14 days of purchase:</strong></p>
            <p>If you cancel within 14 days of purchase, refund is calculated as:</p>
            <div className="bg-blue-50 p-4 rounded-lg my-4 font-mono text-sm">
              <p>Credit = Annual subscription value</p>
              <p className="ml-8">minus: Prorated value of period used until cancellation</p>
              <p className="ml-8">minus: Cancellation fee (5% of subscription value or $100, whichever is lower)</p>
            </div>

            <div className="bg-white p-4 rounded-lg my-4">
              <p className="font-semibold mb-2">Example:</p>
              <ul className="space-y-1">
                <li>Annual subscription: $290</li>
                <li>Cancelled after 7 days</li>
                <li>Calculation: $290 − ($290 ÷ 365 × 7) = $284.5</li>
                <li>Cancellation fee: $100 (lower of $100 vs $14.5)</li>
                <li className="font-semibold">Final credit: $184.5</li>
              </ul>
            </div>

            <p className="mt-6"><strong>Cancellation after 14 days:</strong></p>
            <p>Cancellation takes effect within 3 business days. Refund:</p>
            <div className="bg-blue-50 p-4 rounded-lg my-4 font-mono text-sm">
              <p>Credit = Last annual charge value</p>
              <p className="ml-8">minus: (Monthly price × months used)</p>
              <p className="ml-8">minus: Cancellation fee (5% of annual charge or $100, whichever is lower)</p>
            </div>

            <div className="bg-white p-4 rounded-lg my-4">
              <p className="font-semibold mb-2">Example:</p>
              <ul className="space-y-1">
                <li>Annual subscription: $290</li>
                <li>Cancelled after 4 months</li>
                <li>Calculation: $290 − ($27 × 4) = $182</li>
                <li>Cancellation fee: $14.5 (5% of $290)</li>
                <li className="font-semibold">Final credit: $167.5</li>
              </ul>
            </div>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.3 How to Cancel</h3>
            <p>Cancel via:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Email: <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a></li>
              <li>In-app chat</li>
              <li>WhatsApp: 0545215193</li>
            </ul>
            <p>
              <strong>Monthly only:</strong> Also via "Cancel subscription" in your account.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">7. Intellectual Property</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">7.1 System Ownership</h3>
            <p>
              All rights in the system, including source code, design, content, trademarks, and patents, belong to Uxellent or its licensors.
            </p>
            <p><strong>You may not:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Copy, reproduce, or distribute any part of the system</li>
              <li>Reverse engineer</li>
              <li>Remove or alter trademarks or copyright notices</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">7.2 Your Content</h3>
            <p>
              You retain full ownership of all content and documents you create in the system.
            </p>
            <p>You grant Uxellent a license to use your content only for:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Operating the Services for you</li>
              <li>Improving the system and developing features (in anonymized form)</li>
              <li>Legal compliance</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">7.3 Use of Data for Improvement</h3>
            <p>
              You authorize Uxellent to use information collected from you (as detailed in the Privacy Policy) to create anonymized statistical data, including:
            </p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Aggregate and cumulative data</li>
              <li>Metrics and analytics</li>
              <li>AI system improvement</li>
              <li>New feature development</li>
              <li>Research and comparisons</li>
            </ul>
            <p><strong>Important:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Statistical data is fully anonymized and cannot identify you</li>
              <li>Statistical data is Uxellent's exclusive property</li>
              <li>Uxellent may use, sell, license, or share statistical data without restriction</li>
              <li>You waive any rights in the statistical data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">8. Limitation of Liability</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.1 AS-IS Services</h3>
            <p>
              Uxellent provides the Services "AS-IS" and "AS-AVAILABLE" without warranties of any kind.
            </p>
            <p><strong>We do not warrant:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Uninterrupted availability</li>
              <li>Absence of bugs or errors</li>
              <li>Accuracy or completeness of results</li>
              <li>Fitness for your specific needs</li>
              <li>100% uptime</li>
            </ul>
            <p>
              We may perform maintenance, updates, or upgrades that cause temporary downtime.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.2 Damage Limitation</h3>
            <p>Uxellent is not liable for any direct or indirect damage, including:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Loss of profits or revenue</li>
              <li>Loss of data or documents</li>
              <li>Damage from system downtime</li>
              <li>Damage from use or inability to use the system</li>
              <li>Damage from errors, bugs, or inaccuracies</li>
            </ul>
            <p>
              In any case, Uxellent's total liability does not exceed the amount you actually paid for the Services in the 3 months before the event causing damage.
            </p>
            <p><strong>Except in case of Uxellent's willful misconduct.</strong></p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.3 Your Responsibility</h3>
            <p>You assume full responsibility for:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Accuracy of documents you produce</li>
              <li>Content you enter into the system</li>
              <li>Compliance with tax and accounting laws</li>
              <li>Backing up your documents</li>
              <li>Proper and permitted use of the system</li>
            </ul>
            <p>
              Uxellent is not responsible for content you upload, transmit, or publish via the system.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.4 Document Backup</h3>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
              <p className="font-semibold text-red-800">Very important:</p>
              <p className="text-red-800">
                You must independently back up and store all documents and materials you create or upload to the system.
              </p>
            </div>
            <p><strong>Uxellent is not responsible for:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Loss of documents or data</li>
              <li>Deletion of documents (intentional or accidental)</li>
              <li>Inability to access documents</li>
              <li>Any damage from failure to back up</li>
            </ul>
            <p>
              The system is not intended to fulfill legal record-keeping obligations that apply to you or your accountant.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.5 Document Links - Limited Validity</h3>
            <p>
              Where the system allows sending a document link (instead of a PDF), the link is valid for <strong>3 months</strong> from creation.
            </p>
            <p>
              You must inform your customers of this limit. Uxellent is not responsible for inability to access links after expiry.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.6 Third-Party Services</h3>
            <p>Uxellent is not liable for any damage, loss, or expense arising from:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Malfunction, error, or disruption in third-party systems</li>
              <li>Services provided via third parties (not directly through Uxellent)</li>
              <li>Unavailability of third-party services</li>
              <li>Changes to or discontinuation of third-party services</li>
            </ul>
            <p>
              Example: If you use a third-party integration and it fails - that is the third party's responsibility, not Uxellent's.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.7 Internet Connection</h3>
            <p>
              You must ensure a stable internet connection before using the system.
            </p>
            <p>Uxellent is not responsible for damage from connection issues, including:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Disconnection</li>
              <li>Slowness</li>
              <li>Network faults</li>
              <li>Service interruptions</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.8 Device Security</h3>
            <p>
              Your device (computer, tablet, smartphone) is your sole responsibility, including its security.
            </p>
            <p>
              <strong>Warning:</strong> Actions such as jailbreaking or rooting may compromise your data security; some are also illegal.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.9 Cybersecurity Risks</h3>
            <p>As software on communication networks, the system is exposed to risks such as:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Viruses, malware, trojans</li>
              <li>Hacking or intrusion</li>
              <li>Communication interception</li>
              <li>Uxellent site impersonation</li>
              <li>Online fraud</li>
            </ul>
            <p>
              We invest significant effort in protection but cannot guarantee complete prevention.
            </p>
            <p>Uxellent is not liable for damage from these risks, including:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Disclosure or corruption of data</li>
              <li>Unauthorized actions</li>
              <li>System disruption</li>
              <li>Failure, incorrect execution, or delayed execution of instructions</li>
              <li>Exposure of account content from unauthorized access</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.10 Force Majeure</h3>
            <p>Uxellent is not liable for damage from factors beyond our control, including:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Communication line disruption</li>
              <li>Cloud or hosting provider faults</li>
              <li>Software or hardware malfunction (yours or third parties)</li>
              <li>Data exposure from inaccurate information you provided</li>
              <li>Handing your device to others (for repair or viewing)</li>
            </ul>
            <p>Provided Uxellent made reasonable efforts to prevent such factors.</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.11 External Links</h3>
            <p>
              The system may include links to third-party websites.
            </p>
            <p><strong>Important:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Links are for your convenience only</li>
              <li>Uxellent has not reviewed these sites and is not responsible for them</li>
              <li>Browsing, using, or sharing information with these sites is at your own risk</li>
              <li>Always verify the URL before clicking</li>
            </ul>
            <p>
              If you find problematic content on an external site, please notify us at <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">9. Indemnification</h2>
            <p>
              You agree to indemnify Uxellent, its employees, officers, and directors from any claim, demand, loss, damage, or expense (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Your breach of these Terms</li>
              <li>Your infringement of third-party rights</li>
              <li>Content you uploaded or documents you created</li>
              <li>Any illegal or unauthorized use by you</li>
            </ul>
            <p>Within 30 days of receiving Uxellent's written demand.</p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">10. Content Channels</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.1 What Are Content Channels</h3>
            <p>Uxellent operates various content channels, including:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Blog and articles on uxellent.com</li>
              <li>Social media posts (Facebook, Instagram, LinkedIn, TikTok)</li>
              <li>Tutorial videos and educational materials</li>
            </ul>
            <p>These channels and their content are referred to as "Content Channels" and "Content".</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.2 Agreement to Terms</h3>
            <p>
              Viewing, reading, or using the Content Channels constitutes agreement to these Terms and the terms of the platforms where content is published.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.3 Permitted Use</h3>
            <p>You may view, read, and listen to the Content.</p>
            <p><strong>You may not:</strong></p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Copy, reproduce, or distribute the Content</li>
              <li>Use the Content for commercial purposes</li>
              <li>Edit or modify the Content</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.4 Not Professional Advice</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
              <p className="font-semibold text-yellow-800">Important:</p>
              <p className="text-yellow-800">
                Content in the channels does not constitute professional advice (financial, legal, or otherwise).
              </p>
              <p className="text-yellow-800 mt-2">
                Content does not replace your own judgment or professional advice.
              </p>
            </div>
            <p>
              Any use of information from the Content is at your sole risk. Uxellent is not liable for loss or damage from relying on the Content.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.5 Content Suggestions</h3>
            <p>
              You may suggest topics and ideas at <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a>.
            </p>
            <p>If you submit a suggestion:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>Uxellent may use it without compensation</li>
              <li>Any resulting work is Uxellent's exclusive property</li>
              <li>You have no rights in the intellectual property or output</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.6 User-Uploaded Content</h3>
            <p>If Uxellent allows users to upload content, you represent and warrant:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>You are the creator and owner of the content</li>
              <li>No one else has rights in the content</li>
              <li>The content does not infringe third-party rights</li>
              <li>You grant Uxellent an unlimited license to use the content</li>
              <li>You are not entitled to compensation</li>
              <li>You have no claim against Uxellent regarding use of the content</li>
              <li>Uxellent is not responsible for third-party use of the content</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">10.7 Right to Remove Content</h3>
            <p>
              Uxellent may remove any content you published or terminate your access to Content Channels, at its sole discretion, without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">11. Changes to Terms</h2>
            <p>
              Uxellent may change these Terms at any time.
            </p>
            <p>
              Material changes will be published in the system and/or by email at least 30 days in advance.
            </p>
            <p>
              Continued use after publication constitutes agreement to the updated Terms.
            </p>
            <p>
              If you disagree with changes, you must stop using the Services and cancel your subscription.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">12. General Provisions</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">12.1 Entire Agreement</h3>
            <p>
              These Terms (together with the Privacy Policy) constitute the entire agreement between you and Uxellent.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">12.2 Waiver</h3>
            <p>
              Failure to enforce any right or provision does not waive that right or provision.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">12.3 Severability</h3>
            <p>
              If any provision is found illegal or unenforceable, the remaining provisions continue in full effect.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">12.4 Assignment</h3>
            <p>
              You may not assign your rights or obligations under this Agreement without our written consent.
            </p>
            <p>
              Uxellent may assign its rights and obligations to a third party at any time, provided the third party assumes Uxellent's obligations to you.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">12.5 Termination</h3>
            <p>Uxellent may terminate this Agreement:</p>
            <ul className="list-disc pl-6 my-3 space-y-1">
              <li>At any time, with 30 days' notice</li>
              <li>Immediately, for your breach of the Terms (without notice)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">13. Governing Law and Jurisdiction</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">13.1 Israeli Law</h3>
            <p>
              These Terms are governed by the laws of the State of Israel only.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">13.2 Jurisdiction</h3>
            <p>
              Exclusive jurisdiction for any dispute arising from these Terms lies with the competent courts in Tel Aviv–Jaffa, Israel.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">14. Contact</h2>
            <p className="mb-4">
              Questions about the Terms? Need to cancel or get support?
            </p>
            <div className="bg-white p-6 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a></p>
              <p><strong>WhatsApp:</strong> 0545215193</p>
              <p><strong>Company:</strong> Bugo Media Ltd</p>
              <p><strong>Company No.:</strong> 515960508</p>
            </div>
          </section>
        </LegalTemplate>
      </div>
    </div>
  )
}
