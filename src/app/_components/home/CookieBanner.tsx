"use client";
import * as React from "react";
import Image from "next/image";

const CONSENT_KEY = "vow_cookie_consent";
const CONSENT_TIMESTAMP_KEY = "vow_cookie_consent_ts";
type ConsentValue = "accepted" | "rejected";

type CookieBannerProps = { locale?: "he" | "en" }

export function CookieBanner({ locale }: CookieBannerProps = {}) {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
      const ts = localStorage.getItem(CONSENT_TIMESTAMP_KEY);
      if (!consent || !ts) setVisible(true);
      else setVisible(false);
    } catch {
      setVisible(true);
    }
  }, []);

  const setConsent = (value: ConsentValue) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      localStorage.setItem(CONSENT_TIMESTAMP_KEY, String(Date.now()));
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!mounted) return null;
  if (!visible) return null;

  return (
    <div
      className="hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-4 sm:px-6"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex max-w-[1200px] items-start gap-4 sm:items-center">
        
        {/* מובייל: פריסה אנכית */}
        <div className="flex-1 flex flex-col gap-4 sm:hidden">
          <div className="flex items-start gap-3 text-right">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-[20px] font-semibold text-[#FF6B35] leading-tight">
                כל הקליקים על המשולחן
              </h3>
              <p className="text-[16px] text-gray-700 leading-snug">
                אנחנו משתמשים בעוגיות (cookies) כדי לשפר את חווית הגלישה באתר. המשך גלישה באתר = הסכמה מצדך. רוצה לדעת יותר?{" "}
                <a href={locale === "en" ? "/en/privacy" : "/privacy"} className="link-orange">לחץ כאן</a>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button type="button" className="btn-secondary w-[80px]" onClick={() => setConsent("rejected")}>
                דחה
              </button>
              <button type="button" className="btn-primary w-[80px]" onClick={() => setConsent("accepted")}>
                מאשר
              </button>
            </div>
            <Image
              src="/cookies.svg"
              alt="Cookie policy icon for website privacy and consent settings"
              width={68}
              height={68}
              className="flex-shrink-0"
            />
          </div>
        </div>

        {/* דסקטופ: טקסט וכפתורים בשורה אחת   */}
        <div className="hidden sm:flex items-start gap-4 flex-1">
          <Image
            src="/cookies.svg"
            alt="Cookie policy icon for website privacy and consent settings"
            width={40}
            height={40}
            className="flex-shrink-0"
          />
          <div className="flex-1 flex items-start gap-4 " >
            <div className="flex flex-col gap-1 flex-1 min-w-0 hidden">
              <h3 className="text-[20px] font-semibold text-[#FF6B35] leading-[1.2]">
                כל הקליקים על המשולחן
              </h3>
              <p className="text-[16px] text-gray-700 leading-[1.4]">
                אנחנו משתמשים בעוגיות (cookies) כדי לשפר את חווית הגלישה באתר. המשך גלישה באתר = הסכמה מצדך. רוצה לדעת יותר?{" "}
                <a href={locale === "en" ? "/en/privacy" : "/privacy"} className="link-orange">לחץ כאן</a>
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button type="button" className="btn-secondary w-[100px]" onClick={() => setConsent("rejected")}>
                דחה
              </button>
              <button type="button" className="btn-primary w-[100px]" onClick={() => setConsent("accepted")}>
                מאשר
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}