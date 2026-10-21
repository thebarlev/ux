import { HomePage } from "@/app/_home/HomePage"

import "@/app/_home/nf.en.css"

// 404 under /en/* (uxb-031 v2, tbl-028): no breadcrumbs; Next marks the page noindex.
export default function NotFoundPageEn() {
  return <HomePage lang="en" page="nf" />
}
