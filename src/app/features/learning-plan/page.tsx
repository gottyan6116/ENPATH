import type { Metadata } from "next";
import { PlanPage } from "@/components/plan/PlanPage";
import { siteUrl } from "@/lib/config";

const title = "オーダーメイドの英語学習計画｜毎日の学習を個別設計｜ENPATH";
const description =
  "ENPATHでは、目標・英語力・生活スタイルに合わせた個別学習計画を作成します。1日の学習方法、1週間のスケジュール例、忙しい週の計画調整までご紹介します。";
const url = siteUrl ? new URL("/features/learning-plan", siteUrl).href : undefined;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url ?? null },
  openGraph: { title, description, ...(url ? { url } : {}) },
  twitter: { title, description },
};

export default function Page() {
  return <PlanPage />;
}
