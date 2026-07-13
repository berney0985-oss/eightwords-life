import { redirect } from "next/navigation";

/**
 * 相容重導：舊 /results 永久導向 /assessment/work/results。
 * 舊書籤與舊工作結果（decision-science-result-v1）皆不失效——
 * 新結果頁讀取的是同一個 LocalStorage key。
 */
export default function ResultsPage() {
  redirect("/assessment/work/results");
}
