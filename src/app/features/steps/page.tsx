import type { Metadata } from "next";
import { StepsPage } from "@/components/steps/StepsPage";
import { siteUrl } from "@/lib/config";

const title = "英語学習の順序と学習方法｜目標に合わせた学習設計｜ENPATH";
const description =
  "英語学習の順序や方法は、目標・現在の英語力・課題によって異なります。ENPATHでは英語を理解し使うための力を整理し、あなたに合った個別学習計画を設計します。";
const url = siteUrl ? new URL("/features/steps", siteUrl).href : undefined;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url ?? null },
  openGraph: { title, description, ...(url ? { url } : {}) },
  twitter: { title, description },
};

export default function Page() {
  const crumbs = siteUrl
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "ENPATHの特徴", item: new URL("/features", siteUrl).href },
          { "@type": "ListItem", position: 3, name: "英会話習得までのステップ", item: url },
        ],
      }
    : null;
  return (
    <>
      {crumbs && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />}
      <StepsPage />
    </>
  );
}
