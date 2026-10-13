import type { Metadata } from "next";
import "@fontsource-variable/noto-serif-jp";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResourcesHero } from "@/components/resources/ResourcesHero";
import { ResourcesFeatured } from "@/components/resources/ResourcesFeatured";
import { ResourcesGrid } from "@/components/resources/ResourcesGrid";
import { ResourcesUseCases } from "@/components/resources/ResourcesUseCases";
import { ResourcesBottomCTA } from "@/components/resources/ResourcesBottomCTA";
import { ResourceDownloadDialog } from "@/components/resources/ResourceDownloadDialog";
import { siteUrl } from "@/lib/config";
import s from "@/components/resources/resources.module.css";

const description =
  "ENPATHの無料英語学習資料。30日間の学習計画、習慣化、目標設定など、英語学習を続けるための実践ガイドをご紹介します。";
export const metadata: Metadata = {
  title: "お役立ち資料・英語学習ガイド",
  description,
  alternates: { canonical: siteUrl ? new URL("/resources", siteUrl).href : "/resources" },
  openGraph: {
    title: "お役立ち資料・英語学習ガイド | ENPATH",
    description,
    type: "website",
    images: [{ url: "/images/resources/hero.webp", width: 734, height: 318, alt: "ENPATHの学習ガイド" }],
  },
};

export default function ResourcesPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <Header />
      <main id="main" className={s.page}>
        <ResourcesHero />
        <ResourcesFeatured />
        <ResourcesGrid />
        <ResourcesUseCases />
        <ResourcesBottomCTA />
      </main>
      <ResourceDownloadDialog />
      <Footer />
    </>
  );
}
