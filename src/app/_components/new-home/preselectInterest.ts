/**
 * Channel between the page's CTAs and the lead form.
 *
 * Six CTAs across #services and #products link to #contact and must preselect
 * the matching "מה הכי מעניין אותך?" option (brief §7). The reference HTML did
 * this by reaching into the DOM; here the CTAs dispatch an event and the form
 * — which owns that field's state — listens for it, so React stays the single
 * source of truth for the value.
 */

export const PRESELECT_EVENT = "uxellent:preselect-interest"

export function dispatchPreselect(interest: string) {
  window.dispatchEvent(
    new CustomEvent<string>(PRESELECT_EVENT, { detail: interest })
  )
}
