import "server-only"

/**
 * 042: everything about the mailing list, email and automations (the card
 * lines, the section on "what you get", the home card and the legal sections)
 * shows only when MAILING_LIVE=true. Preview: true. Production: off until
 * "דיוור — אפשר לאוויר" comes from [עיצוב] through Itzik. The lead form is live
 * today and does not depend on it.
 */
export const MAILING_LIVE = process.env.MAILING_LIVE === "true"
