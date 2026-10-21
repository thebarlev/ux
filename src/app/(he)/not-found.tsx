import { HomePage } from "@/app/_home/HomePage"

import "@/app/_home/nf.he.css"

// 404 (uxb-030 v2, tbl-028): no breadcrumbs; Next marks the page noindex.
export default function NotFoundPage() {
  return <HomePage lang="he" page="nf" />
}
