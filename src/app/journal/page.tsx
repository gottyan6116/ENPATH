import type { Metadata } from "next";
import "@fontsource-variable/noto-serif-jp";
import {
  journalCategories,
  journalDescription,
  categoryLabel,
} from "@/content/journal";
import { heroImages } from "@/content/journalHero";
import {
  getVisibleArticles,
  isJournalPreview,
  articleHref,
  type JournalQuery,
} from "@/lib/journal";
import { JournalShell, JournalCTA } from "@/components/journal/Journal";
import {
  JournalHero,
  type HeroSlide,
} from "@/components/journal/JournalHero";
import { JournalCategoryNav } from "@/components/journal/JournalCategoryNav";
import { JournalArticleGrid } from "@/components/journal/JournalArticleGrid";
import { readyForIndexing, siteUrl } from "@/lib/config";
import s from "@/components/journal/journal.module.css";
type Props = { searchParams: Promise<JournalQuery> };
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const query = await searchParams;
  const category = journalCategories.find((item) => item.id === query.category);
  return {
    title: category
      ? `${category.label} | ENPATH JOURNAL`
      : "ENPATH JOURNAL｜英語と、学びの話。",
    description: category?.description ?? journalDescription,
    alternates: { canonical: "/journal" },
    robots: {
      index: readyForIndexing && !isJournalPreview(query) && !query.category,
      follow: readyForIndexing && !isJournalPreview(query),
    },
    openGraph: {
      title: "ENPATH JOURNAL｜英語と、学びの話。",
      description: journalDescription,
      url: "/journal",
      images: [
        {
          url: heroImages.main,
          width: 1672,
          height: 941,
          alt: "窓辺の机に開かれた英語のノートとコーヒー",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "ENPATH JOURNAL｜英語と、学びの話。",
      description: journalDescription,
      images: [heroImages.main],
    },
  };
}
export default async function JournalPage({ searchParams }: Props) {
  const query = await searchParams;
  const base = siteUrl;
  const preview = isJournalPreview(query);
  const articles = await getVisibleArticles(preview);
  const selected = journalCategories.find((item) => item.id === query.category);
  const filtered = selected
    ? articles.filter((article) => article.category === selected.id)
    : articles;
  // Hero stories: featured articles first, then the newest ones. No articles -> design fallback.
  const heroArticles = [
    ...filtered.filter((article) => article.featured),
    ...filtered.filter((article) => !article.featured),
  ].slice(0, 3);
  const slides: HeroSlide[] = heroArticles.map((article) => ({
    slug: article.slug,
    href: articleHref(article.slug, preview),
    title: article.title,
    category: article.category,
    categoryLabel: categoryLabel(article.category),
    description: article.description,
    coverImage: article.coverImage,
  }));
  return (
    <JournalShell preview={preview}>
      <JournalHero
        slides={slides}
        compact={Boolean(selected)}
        preview={preview}
        heading={
          selected
            ? {
                label: "ENPATH JOURNAL",
                title: selected.label,
                description: selected.description,
              }
            : undefined
        }
      />
      <div className={s.wrap}>
        <JournalCategoryNav selectedId={selected?.id} preview={preview} />
        <section className={s.latest} aria-labelledby="latest-heading">
          <div className={s.sectionTitle}>
            <div>
              <h2 id="latest-heading">
                {selected ? selected.label : "注目の記事"}
              </h2>
              <p>
                {selected
                  ? selected.description
                  : "いま読んでほしい、ピックアップ記事です。"}
              </p>
            </div>
            <span>{String(filtered.length).padStart(2, "0")} STORIES</span>
          </div>
          <JournalArticleGrid
            articles={filtered}
            preview={preview}
            hasFeatured={heroArticles.length > 0}
          />
        </section>
        <section className={s.about}>
          <p className={s.eyebrow}>ABOUT THIS JOURNAL</p>
          <div>
            <h2>英語を学ぶ、その先まで。</h2>
            <p>
              英語の勉強方法を知ることも、大切です。でも、それと同じくらい、自分がなぜ英語を学ぶのか、どのように学び続けるのかを考えることも大切だと、私たちは考えています。
            </p>
            <p>
              ENPATH
              JOURNALでは、日々の学習に役立つ情報だけでなく、英語との向き合い方や、これからの時代における英語の価値についても発信していきます。
            </p>
          </div>
        </section>
      </div>
      <JournalCTA preview={preview} />
      {base && !preview && filtered.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "ENPATH JOURNAL",
              description: journalDescription,
              url: new URL("/journal", base).href,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: filtered.map((article, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: new URL(articleHref(article.slug, false), base).href,
                  name: article.title,
                })),
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </JournalShell>
  );
}
