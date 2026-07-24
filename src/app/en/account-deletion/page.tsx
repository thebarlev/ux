/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next"

import { LegalTemplate } from "@/app/_components/legal/LegalTemplate"
import { heEnAlternateLanguages } from "@/lib/seo/hreflang"

export const metadata: Metadata = {
  title: "Account Deletion | Uxellent",
  description: "Learn how to request account deletion from the Uxellent service, including support channels and data-retention notes.",
  alternates: {
    canonical: "/en/account-deletion",
    languages: heEnAlternateLanguages("/account-deletion", "/en/account-deletion"),
  },
}

export default function AccountDeletionPageEn() {
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="ltr">
      <div id="main" role="main">
        <LegalTemplate
          title="Account Deletion"
          subtitle="Information about the user account deletion process for the Uxellent service"
          lastUpdated="February 8, 2026"
          dir="ltr"
        >
          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">Deleting a User Account</h2>
            <p>
              If you wish to request the deletion of your account from the Uxellent service, you may contact us through any of the following methods:
            </p>
            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h3 className="text-[18px] font-semibold mb-3">Ways to request account deletion:</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Via the chat available on the website and/or the app (where available)</li>
                <li>By email at: <a href="mailto:support@uxellent.com" className="text-blue-600 underline font-semibold">support@uxellent.com</a></li>
              </ul>
            </div>
            <p>
              Your request will be handled in accordance with applicable law and the service's privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-[24px] font-bold mb-4 mt-8">Data Retention</h2>
            <p>
              Please note that the types of data retained by the Company and the periods for which they are retained are detailed in Uxellent's Privacy Policy, available on our <a href="https://uxellent.com/en/privacy" className="text-blue-600 underline">website</a>.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="font-semibold text-yellow-800 mb-2">Important to know:</p>
              <p className="text-yellow-800">
                In general, the Company may be required to retain certain types of documents and data - including accounting documents, digitally signed documents, and operational logs - for varying periods, in accordance with legal requirements, operational needs, information security, and legal protection purposes.
              </p>
            </div>
            <p>
              <strong>Deleting your account does not necessarily result in the immediate or complete deletion of all your data</strong> where the Company has a legal or legitimate obligation to continue retaining such information.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-[24px] font-bold mb-4">Contact Us</h2>
            <div className="bg-white p-6 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:support@uxellent.com" className="text-blue-600 underline">support@uxellent.com</a></p>
              <p><strong>WhatsApp:</strong> 0545215193</p>
              <p className="mt-4 text-sm text-gray-600">
                For further questions or more detailed information, please reach out to us through one of the channels above.
              </p>
            </div>
          </section>
        </LegalTemplate>
      </div>
    </div>
  )
}