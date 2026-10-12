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
import {
  JournalShell,
  JournalCTA,
  ArticleCard,
} from "@/components/journal/Journal";
import {
  JournalHero,
  type HeroSlide,
} from "@/components/journal/JournalHero";
import { JournalListing } from "@/components/journal/JournalListing";
import { JournalCard } from "@/components/journal/JournalCard";
import { previewCards } from "@/content/journalCards";
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
  // Cards: each planned card links to its article only once that article is published; the rest stay
  // unlinked (never a dead link, never in sitemap/JSON-LD). Dev preview lists every MDX file instead.
  const published = new Set(articles.map((article) => article.slug));
  const showSamples = !preview && previewCards.some((card) => !published.has(card.id));
  // The hero is independent of the selected category: featured articles first, then the newest.
  // No articles -> design fallback.
  const heroArticles = [
    ...articles.filter((article) => article.featured),
    ...articles.filter((article) => !article.featured),
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
      <JournalHero slides={slides} preview={preview} />
      <div className={s.wrap}>
        <JournalListing
          items={
            preview
              ? articles.map((article) => ({
                  slug: article.slug,
                  category: article.category,
                  node: <ArticleCard article={article} preview={preview} />,
                }))
              : [
                  ...previewCards.map((card) => ({
                    slug: card.id,
                    category: card.category,
                    node: (
                      <JournalCard
                        item={published.has(card.id) ? { ...card, slug: card.id } : card}
                      />
                    ),
                  })),
                  ...articles
                    .filter((article) => !previewCards.some((card) => card.id === article.slug))
                    .map((article) => ({
                      slug: article.slug,
                      category: article.category,
                      node: <ArticleCard article={article} preview={preview} />,
                    })),
                ]
          }
          samples={showSamples}
          initialCategory={selected?.id ?? "all"}
          preview={preview}
        />
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
      {base && !preview && articles.length > 0 && (
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
                itemListElement: articles.map((article, index) => ({
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
