import type { Metadata } from "next";
import {
  journalCategories,
  journalDescription,
  categoryLabel,
} from "@/content/journal";
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
import { JournalLink } from "@/components/journal/JournalTracking";
import {
  JournalHero,
  type HeroSlide,
} from "@/components/journal/JournalHero";
import { JournalReveal } from "@/components/journal/JournalReveal";
import { readyForIndexing } from "@/lib/config";
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
          url: "/media/planning.webp",
          width: 1672,
          height: 941,
          alt: "学習計画を考えるイメージ",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "ENPATH JOURNAL｜英語と、学びの話。",
      description: journalDescription,
      images: ["/media/planning.webp"],
    },
  };
}
export default async function JournalPage({ searchParams }: Props) {
  const query = await searchParams;
  const preview = isJournalPreview(query);
  const articles = await getVisibleArticles(preview);
  const selected = journalCategories.find((item) => item.id === query.category);
  const filtered = selected
    ? articles.filter((article) => article.category === selected.id)
    : articles;
  // Hero stories: published featured articles first, then the newest ones.
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
  const latest = filtered.filter(
    (article) => !heroArticles.some((item) => item.slug === article.slug),
  );
  return (
    <JournalShell preview={preview}>
      <JournalHero
        slides={slides}
        fallbackImage="/media/planning.webp"
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
        <nav aria-label="記事カテゴリ" className={s.filters}>
          {[
            { id: "all", label: "すべて", description: "すべての読みもの" },
            ...journalCategories,
          ].map((category) => (
            <JournalLink
              key={category.id}
              href={`/journal${category.id !== "all" ? `?category=${category.id}${preview ? "&preview=1" : ""}` : preview ? "?preview=1" : ""}`}
              event="journal_category_select"
              fields={{
                slug: "journal",
                category: category.id,
                title: category.label,
              }}
              preview={preview}
              current={
                selected ? category.id === selected.id : category.id === "all"
              }
            >
              {category.label}
            </JournalLink>
          ))}
        </nav>
        <section className={s.latest} aria-labelledby="latest-heading">
          <div className={s.sectionTitle}>
            <h2 id="latest-heading">
              {selected ? selected.label : "新着の読みもの"}
            </h2>
            <span>{String(filtered.length).padStart(2, "0")} STORIES</span>
          </div>
          {latest.length > 0 ? (
            <JournalReveal className={s.grid}>
              {latest.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  preview={preview}
                />
              ))}
            </JournalReveal>
          ) : (
            <div className={s.empty}>
              <p className={s.eyebrow}>COMING SOON</p>
              <h3>
                {heroArticles.length > 0
                  ? "次の読みものを、準備しています。"
                  : "読みものは、ただいま準備しています。"}
              </h3>
              <p>
                英語との向き合い方や、日々の学びのヒントを
                <br />
                この場所からお届けしていきます。
              </p>
            </div>
          )}
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
    </JournalShell>
  );
}
