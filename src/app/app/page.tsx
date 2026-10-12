import type { Metadata } from "next";
import Image from "next/image";
import "@fontsource-variable/noto-serif-jp";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingLink } from "@/components/BookingLink";
import { BridgeSection } from "@/components/BridgeSection";
import { AppHero } from "@/components/app/AppHero";
import { JournalReveal } from "@/components/journal/JournalReveal";
import { siteUrl } from "@/lib/config";
import s from "@/components/app/appPage.module.css";

const description =
  "ENPATH受講生専用の学習アプリ「Bridge」のご紹介。単語、記事、表現、学習記録まで。受講期間中は追加のアプリ利用料金なしでご利用いただけます。";
export const metadata: Metadata = {
  title: "学習アプリ Bridge",
  description,
  alternates: { canonical: siteUrl ? new URL("/app", siteUrl).href : "/app" },
  openGraph: {
    title: "学習アプリ Bridge｜ENPATH",
    description,
    type: "website",
    images: [{ url: "/images/app/laptop.webp", width: 1313, height: 969, alt: "Bridgeのホーム画面" }],
  },
};

const features = [
  {
    title: "学習ホーム",
    lead: "今日の学習を、ひと目で。",
    text: "「今日の学習」のメニューと完了数をホームで確認できます。最初のタスクから、すぐに始められます。",
    src: "/images/app/laptop.webp",
    w: 1313,
    h: 969,
    alt: "Bridgeのホーム画面",
  },
  {
    title: "単語学習",
    lead: "フラッシュカードで、単語を学ぶ。",
    text: "フラッシュカード形式で単語を学習します。復習のメニューは、ホームから始められます。",
    src: "/images/app/card-words.webp",
    w: 995,
    h: 1324,
    alt: "Bridgeの単語学習画面",
  },
  {
    title: "記事学習",
    lead: "レベルを目安に、記事を読む。",
    text: "記事一覧から、A2〜C1などのレベル表示を目安に、読む記事を選べます。",
    src: "/images/app/card-articles.webp",
    w: 1339,
    h: 969,
    alt: "Bridgeの記事一覧画面",
  },
  {
    title: "表現学習",
    lead: "テーマごとに、英語表現を学ぶ。",
    text: "「賛成する」などのテーマごとに、仕事・日常の場面で使える英語表現を確認します。",
    src: "/images/app/card-expressions.webp",
    w: 1187,
    h: 1003,
    alt: "Bridgeの表現学習画面",
  },
  {
    title: "学習記録",
    lead: "積み重ねを、記録に残す。",
    text: "累計の学習時間と学習カレンダーから、これまでの取り組みを振り返れます。",
    src: "/images/app/card-record.webp",
    w: 891,
    h: 1239,
    alt: "Bridgeの学習記録画面",
  },
] as const;

export default function AppPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <Header />
      <main id="main" className={s.page}>
        <AppHero />

        <section id="app-features" className={s.features} aria-labelledby="app-features-title">
          <div className={s.wrap}>
            <p className={s.eyebrow}>FEATURES</p>
            <h2 id="app-features-title">Bridgeでできること</h2>
            <p className={s.intro}>
              日々の学習と復習、取り組みの記録を、ひとつのアプリにまとめています。
            </p>
            <JournalReveal className={s.list}>
              {features.map((f, i) => (
                <article key={f.title} className={`${s.row} ${i % 2 ? s.reverse : ""}`}>
                  <div className={s.visual}>
                    <Image
                      src={f.src}
                      alt={f.alt}
                      width={f.w}
                      height={f.h}
                      sizes="(max-width: 767px) 80vw, 460px"
                      quality={85}
                    />
                  </div>
                  <div className={s.body}>
                    <p className={s.no}>{String(i + 1).padStart(2, "0")}</p>
                    <h3>{f.title}</h3>
                    <p className={s.lead}>{f.lead}</p>
                    <p>{f.text}</p>
                  </div>
                </article>
              ))}
            </JournalReveal>
          </div>
        </section>

        <section className={s.pricing} aria-labelledby="app-pricing-title">
          <div className={s.wrap}>
            <p className={s.eyebrow}>FOR ENPATH STUDENTS</p>
            <h2 id="app-pricing-title">追加料金なしで、ご利用いただけます。</h2>
            <p className={s.price}>
              ENPATH受講生は、受講期間中に追加のアプリ利用料金なしでご利用いただけます。
            </p>
            <p className={s.note}>
              ※ Bridgeは、ENPATHの受講生向けにご提供するアプリです。どなたでも無料でご利用いただけるものではありません。
            </p>
          </div>
        </section>

        <BridgeSection />

        <section className={s.final} aria-labelledby="app-final-title">
          <div className={s.wrap}>
            <h2 id="app-final-title">まずは、無料カウンセリングから。</h2>
            <p>
              学習の進め方や目標について、お気軽にご相談ください。Bridgeは、受講を始めた方にご利用いただけます。
            </p>
            <div className={s.finalCta}>
              <BookingLink placement="app_footer" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
