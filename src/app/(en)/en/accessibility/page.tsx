/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next"

import { LegalTemplate } from "@/app/_components/legal/LegalTemplate"
import { JsonLd, webPageSchema } from "@/components/JsonLd"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export const metadata: Metadata = {
  title: "Accessibility Statement | Uxellent",
  description: "Read the Uxellent accessibility statement, including website accessibility standards, support options, and accessibility contact details.",
  alternates: {
    canonical: "/en/accessibility",
    languages: heEnAlternateLanguages("/accessibility", "/en/accessibility"),
  },
}

export default function AccessibilityPageEn() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="ltr">
      <JsonLd
        data={webPageSchema({
          name: "Accessibility | Uxellent",
          description: "Uxellent is committed to accessibility. The site meets Israeli Standard 5568 and WCAG 2.1 Level AA.",
          url: "https://uxellent.com/en/accessibility",
          dateModified: "2025-02-01",
        })}
      />
      <div id="main" role="main">
        <LegalTemplate
          title="Accessibility"
          subtitle="Our commitment to making Uxellent accessible to everyone"
          lastUpdated="February 2025"
          dir="ltr"
        >
          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">Our Commitment to Accessibility</h2>
            <p className="text-[18px] leading-relaxed mb-6">
              Uxellent Ltd. makes every effort and invests significant resources to provide all customers with access to its website and platform in a respectful, accessible, and professional manner. In accordance with the Equal Rights for Persons with Disabilities Law, 5758-1998, and the regulations enacted thereunder, extensive efforts and resources are dedicated to implementing the required accessibility adjustments - enabling people with disabilities to use the platform and website independently and on equal terms.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">Accessible Customer Service</h2>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">Employee Accessibility Training</h3>
            <p className="mb-4">
              We conduct training sessions to raise awareness of accessibility, build employee understanding of the field, and provide practical tools for delivering accessible service.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">Accessible Support</h3>
            <p className="mb-4">
              You can contact us in writing via email or by direct message on our LinkedIn page. For users with disabilities, we also offer phone support - please contact us in writing with your phone number and we will call you back.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">Additional Contact Methods</h3>
            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Email:{" "}
                  <a href="mailto:support@uxellent.com" className="text-blue-600 underline font-semibold">
                    support@uxellent.com
                  </a>
                </li>
                <li>
                  Contact form:{" "}
                  <a href="https://uxellent.com/en/contact" className="text-blue-600 underline">
                    uxellent.com/en/contact
                  </a>
                </li>
                <li>LinkedIn page: direct message via our LinkedIn profile</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">Website Accessibility</h2>
            <p className="mb-4">
              An accessible website is one that allows people with disabilities and older adults to browse at the same level of efficiency and enjoyment as all other users. According to a 2003 Microsoft study, 20–25% of the population encounters difficulties using the internet and may benefit from more accessible web content.
            </p>
            <p className="mb-6">
              Uxellent Ltd. believes in and actively promotes equal opportunity in the digital space for people with various disabilities and those who rely on assistive technologies.
            </p>

            <h3 className="text-[20px] font-semibold mb-3 mt-6">Accessibility Standards & Compliance</h3>
            <div className="bg-white p-6 rounded-lg my-4 space-y-3">
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  This website complies with the requirements of the Equal Rights for Persons with Disabilities Regulations (Service Accessibility Adjustments), 5773-2013
                </li>
                <li>
                  Accessibility adjustments were made in accordance with the Israeli Standard (IS 5568) for web content accessibility at Level AA, and the international WCAG 2.1 guidelines
                </li>
                <li>
                  Tested for highest compatibility with modern browsers: Chrome, Firefox, Safari, and Edge
                </li>
                <li>
                  The site provides semantic structure for assistive technologies and supports standard keyboard navigation using arrow keys, Enter, and Esc to close menus and dialogs
                </li>
                <li>
                  Optimized for display across popular browsers and mobile devices
                </li>
                <li>
                  For the best screen reader experience, we recommend using the latest version of NVDA or JAWS
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">Physical Accessibility</h2>
            <p className="mb-4">
              Uxellent is a fully digital platform providing complete service online, 24/7. You may contact us through the digital channels listed above.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">Feedback & Accessibility Requests</h2>
            <p className="mb-4">
              We are continuously working to improve accessibility as part of our commitment to ensuring that all people, including those with disabilities, receive the most accessible service possible.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="font-semibold text-yellow-800 mb-2">Encountered an issue?</p>
              <p className="text-yellow-800">
                If you have come across any accessibility problem or difficulty, we would appreciate you letting us know. We will make every effort to find a suitable solution and address the issue as promptly as possible.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">Accessibility Coordinator</h2>
            <div className="bg-white p-6 rounded-lg">
              <p><strong>Name:</strong> Yitzhak Berlav</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@uxellent.com" className="text-blue-600 underline">
                  support@uxellent.com
                </a>
              </p>
              <p><strong>Phone:</strong> 054-5215193</p>
            </div>
          </section>
        </LegalTemplate>
      </div>
    </div>
  )
}