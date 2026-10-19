/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next"

import { LegalTemplate } from "@/app/_components/legal/LegalTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"
import { JsonLd, webPageSchema } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "Privacy Policy | Uxellent",
  description: "Read Uxellent's privacy policy to understand how we collect, protect, and use personal information across our website and services.",
  alternates: {
    canonical: "/en/privacy",
    languages: heEnAlternateLanguages("/privacy", "/en/privacy"),
  },
}

export default function PrivacyPageEn() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="ltr">
      <JsonLd
        data={webPageSchema({
          name: "Privacy Policy | Uxellent",
          description: "Uxellent's Privacy Policy - How We Protect Your Personal Information",
          url: "https://uxellent.com/en/privacy",
          dateModified: "2026-02-01",
        })}
      />
      <div id="main" role="main">
        <LegalTemplate
          title="Privacy Policy"
          subtitle="Uxellent's Privacy Policy - How We Protect Your Personal Information"
          lastUpdated="February 2026"
          dir="ltr"
        >
          <section>
            <p className="text-[18px] leading-relaxed mb-6">
              Bugo Media LTD, Company No. 515960508 (hereinafter: "Uxellent", "we" or "the Company") is committed to protecting your privacy and enabling you to have control over your personal information.
            </p>
            <p className="text-[18px] leading-relaxed mb-6">
              This privacy policy explains what information we collect, why we use it, who we share it with, and how you can control it.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <p><strong>System Address:</strong> <a href="https://app.uxellent.com" className="text-blue-600 underline">app.uxellent.com</a></p>
              <p><strong>Email:</strong> <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">1. Who This Policy Applies To</h2>

            <p>This privacy policy applies to anyone who uses Uxellent's services, including:</p>
            <ul className="list-disc ml-6 my-4 space-y-2">
              <li>Our marketing website (<a href="https://uxellent.com" className="text-blue-600 underline">uxellent.com</a>)</li>
              <li>The accounting document creation system (<a href="https://app.uxellent.com" className="text-blue-600 underline">app.uxellent.com</a>)</li>
              <li>The digital signature service (<a href="https://dsign.uxellent.com" className="text-blue-600 underline">dsign.uxellent.com</a>)</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="font-semibold text-yellow-800">
                By using our services, you agree to this privacy policy. If you do not agree - do not use the services.
              </p>
            </div>

            <p>Terms not defined herein shall be interpreted in accordance with our Terms of Use.</p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">2. What Information We Collect</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.1 Information You Provide to Us</h3>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">When creating an account:</h4>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Full name</li>
              <li>National ID number</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Your business details (name, business/company number, address, field of activity)</li>
            </ul>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">When making a payment:</h4>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Credit card details (transferred directly to the payment provider - we do not store credit card numbers)</li>
              <li>Billing address</li>
              <li>Transaction details (amount, date, subscription type)</li>
            </ul>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">Business documents and content you create:</h4>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Invoices, receipts, and accounting documents you generate in the system</li>
              <li>Your clients' details (names, addresses, phone numbers, email)</li>
              <li>Transaction details you enter</li>
              <li>Files you upload (logo, images, documents)</li>
            </ul>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">Support inquiries:</h4>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Any information you share with us via chat, email, or phone</li>
              <li>Records of the conversation or correspondence</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>

            <p>When you use our services, we collect:</p>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>IP address</li>
              <li>Browser type and operating system</li>
              <li>Device ID</li>
              <li>Pages you visited</li>
              <li>Time and duration of use</li>
              <li>Actions performed in the system</li>
            </ul>

            <p className="mt-4">This information is collected using cookies and similar tracking technologies (see section 8).</p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">3. Why We Use Your Information</h2>

            <p>We use your information for the following purposes:</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.1 Operating the Service</h3>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Providing access to our system and tools</li>
              <li>Creating and sending accounting documents</li>
              <li>Storing your documents</li>
              <li>Providing the digital signature service (Dsign)</li>
              <li>Technical support and customer service</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.2 Improvement and Security</h3>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Analyzing usage patterns to improve the system</li>
              <li>Detecting and preventing fraud attempts</li>
              <li>Handling bugs and technical issues</li>
              <li>Developing new features based on user needs</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.3 Communication and Marketing</h3>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Sending service updates (price changes, new features)</li>
              <li>Sending newsletters and business management tips (if you consented)</li>
              <li>Targeted advertising tailored to your preferences</li>
              <li>Satisfaction surveys</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">3.4 Legal Obligations</h3>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Compliance with tax authority and other regulatory requirements</li>
              <li>Maintaining records as required by law</li>
              <li>Cooperating with law enforcement authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">4. Who We Share Your Information With</h2>

            <p className="font-semibold text-lg mb-4">We do not sell personal information to third parties.</p>
            <p>We share information only in the following cases:</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.1 Technical Service Providers</h3>

            <p>We work with external service providers who help us operate the system and deliver services:</p>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">Hosting and server services:</h4>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Storage of files, applications, and documents in the system</li>
              <li>All collected data is stored with our service providers</li>
            </ul>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">Payment processing services:</h4>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Receiving credit card payments</li>
              <li>Credit card details are transferred directly to the payment provider, not through us</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="font-semibold text-blue-800 mb-2">Important to know:</p>
              <ul className="text-blue-800 space-y-1">
                <li>• All service providers are bound by confidentiality and data security agreements</li>
                <li>• Some service providers are located outside of Israel</li>
                <li>• The level of data protection in those countries may differ from that in Israel</li>
                <li>• By using Uxellent's services, you consent to the transfer of your personal information to these providers</li>
              </ul>
            </div>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.2 Advertising and Analytics Tools</h3>

            <p className="mb-4">We use third-party services to understand how our services are used and to show you relevant advertising:</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong>Google Analytics</strong> - usage pattern analysis
                <br />
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>Google Ads</strong> - targeted advertising
                <br />
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>Meta (Facebook/Instagram)</strong> - social media advertising
                <br />
                <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>Microsoft Clarity</strong> - user experience analysis
                <br />
                <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>TikTok</strong> - advertising on TikTok
                <br />
                <a href="https://www.tiktok.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>Taboola</strong> - targeted advertising
                <br />
                <a href="https://www.taboola.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>

            <p className="mt-4">These services use cookies and tracking technologies to collect information about your use of our system and other websites.</p>
            <p className="mt-2"><strong>How to manage targeted advertising:</strong> See section 8.4</p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.3 Your Clients</h3>

            <p>When you send a document (invoice, receipt) to your clients via the system, clients will see:</p>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Your business details</li>
              <li>Document content</li>
              <li>Digital signature</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.4 Authorities and Law Enforcement</h3>

            <p>We will share information with enforcement authorities or legal entities if:</p>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Required by court order or legal requirement</li>
              <li>There is suspicion of illegal activity or fraud</li>
              <li>There is a need to protect our rights or the rights of others</li>
              <li>There is suspicion of a breach of the Terms of Use</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">4.5 Business Transfer</h3>

            <p>
              In the event of a merger, sale, or transfer of the company's assets, your information may be transferred to the acquiring entity. In such a case, the information will continue to be subject to this privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">5. How We Protect Your Information</h2>

            <p>We take reasonable and industry-standard security measures, including:</p>
            <ul className="list-disc ml-6 my-4 space-y-2">
              <li>Data encryption during transmission (SSL/TLS)</li>
              <li>Restricting access to information to authorized employees only</li>
              <li>Periodic data backups</li>
              <li>Monitoring for suspicious activity</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="font-semibold text-yellow-800 mb-2">However:</p>
              <p className="text-yellow-800">
                No method of storage or transmission over the internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">Your Responsibilities:</h3>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Keep your password confidential</li>
              <li>Do not share access to your account</li>
              <li>Log out from public devices</li>
              <li>Report any suspected breach immediately</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">6. Your Rights</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.1 Right of Access</h3>
            <p>
              Under Section 13 of the Privacy Protection Law, 5741-1981, you are entitled to request access to your personal information held by us.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.2 Right to Correction and Deletion</h3>
            <p>Under Section 14 of the Privacy Protection Law, you are entitled to request:</p>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Correction of inaccurate or outdated information</li>
              <li>Deletion of information (subject to legal obligations)</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">6.3 How to Exercise Your Rights</h3>
            <p>
              Send a request to: <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a>
            </p>
            <p className="mt-2">We will respond within 21 days and inform you of the actions taken.</p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="font-semibold text-blue-800 mb-2">Important to know:</p>
              <ul className="text-blue-800 space-y-1">
                <li>• We may request identity verification before providing sensitive information</li>
                <li>• In certain cases (legal obligation, protection of others' rights) we may be unable to delete information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">7. How Long We Retain Your Information</h2>

            <p>We will retain your personal information for as long as necessary to:</p>
            <ul className="list-disc ml-6 my-4 space-y-2">
              <li>Fulfill the purposes of use described in this privacy policy</li>
              <li>Comply with our legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce our agreements</li>
              <li>Or for a longer period as required by applicable law</li>
            </ul>

            <p className="mt-4">
              We may delete your information without notifying you, if we determine it is no longer needed for the purposes described above.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">8. Cookies and Tracking Technologies</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.1 What Are Cookies?</h3>
            <p>
              Cookies are small text files stored on your device when you browse a website. They help us remember you, understand how you use the service, and improve your experience.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.2 Types of Cookies We Use</h3>

            <div className="space-y-4 my-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Essential cookies:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Basic operation - login, navigation, preference memory</li>
                  <li><strong>Cannot be blocked</strong> (without them the system will not work)</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Security cookies:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>User identification, impersonation prevention, protection against attacks</li>
                  <li><strong>Cannot be blocked</strong></li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Functional cookies:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Remembering your preferences (language, display)</li>
                  <li><strong>Can be blocked</strong></li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Analytical cookies:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Understanding usage patterns (Google Analytics)</li>
                  <li><strong>Can be blocked</strong></li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Advertising cookies:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Displaying targeted advertising</li>
                  <li><strong>Can be blocked</strong></li>
                </ul>
              </div>
            </div>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.3 Third-Party Cookies</h3>
            <p>We use cookies from the following parties:</p>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Google Analytics - traffic analysis</li>
              <li>Google Ads, Meta, TikTok, Taboola, Microsoft Clarity - targeted advertising</li>
            </ul>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">8.4 How to Manage Cookies</h3>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">Blocking cookies in your browser:</h4>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Block Cookies</li>
            </ul>

            <h4 className="text-[18px] font-semibold mb-2 mt-4">Opting out of targeted advertising:</h4>
            <ul className="space-y-2 my-3">
              <li>
                <strong>Google:</strong>{" "}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  adssettings.google.com
                </a>
              </li>
              <li>
                <strong>Facebook:</strong>{" "}
                <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  facebook.com/ads/preferences
                </a>
              </li>
              <li><strong>TikTok:</strong> Settings → Privacy → Ads</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 my-6">
              <p className="font-semibold text-red-800">
                Important: Blocking essential cookies will prevent you from using parts of the services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">9. Third-Party Services</h2>

            <p>
              Our system may include links or integrations to external services (such as WhatsApp, Google Drive).
            </p>

            <p className="mt-4">
              <strong>Responsibility:</strong> Use of these services is solely at your own risk and subject to their own privacy policies. We are not responsible for the content, policies, or actions of third parties.
            </p>

            <p className="mt-4">
              <strong>Recommendation:</strong> Read the privacy policy of each third-party service before use.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">10. Use by Minors</h2>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 my-6">
              <p className="font-semibold text-red-800">
                Uxellent's services must not be used by anyone under the age of 18.
              </p>
            </div>

            <p>
              If you are a parent or guardian and have discovered that a minor has used the service without your permission, contact us immediately at <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a> and we will close the account.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">11. Communications and Notifications</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">11.1 Service Notifications (Mandatory)</h3>
            <p>We reserve the right to send you service-related notifications, such as:</p>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Changes to the privacy policy or terms of use</li>
              <li>Updates regarding payment obligations</li>
              <li>Security alerts</li>
              <li>Changes in service availability</li>
            </ul>
            <p className="mt-4"><strong>These notifications cannot be cancelled unless you close your account.</strong></p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">11.2 Marketing Communications (Optional)</h3>
            <p>If you have consented to receive marketing communications (newsletter, tips, offers), you may unsubscribe at any time:</p>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Click "Unsubscribe" at the bottom of any email</li>
              <li>Contact us at <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">12. Changes to This Policy</h2>

            <p>
              We may update this policy from time to time to reflect changes in the service or applicable law.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">How we will notify you:</h3>
            <ul className="list-disc ml-6 my-3 space-y-1">
              <li>Publishing a notice in the system (<a href="https://app.uxellent.com" className="text-blue-600 underline">app.uxellent.com</a>)</li>
              <li>Sending an email to registered users (for material changes only)</li>
              <li>Updating the "Last Updated" date at the top of this document</li>
            </ul>

            <p className="mt-4">We recommend visiting this page periodically to stay up to date.</p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="font-semibold text-yellow-800">
                Continued use of the service after an update constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">13. Contact Us</h2>

            <p className="mb-4">
              Do you have questions about the privacy policy? Would you like to exercise your rights?
            </p>

            <div className="bg-white p-6 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a></p>
              <p><strong>Company Name:</strong> Bugo Media LTD</p>
              <p><strong>Company Number:</strong> 515960508</p>
              <p className="mt-4 text-sm text-gray-600">Registered data repository</p>
            </div>
          </section>
        </LegalTemplate>
      </div>
    </div>
  )
}