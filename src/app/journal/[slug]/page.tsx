import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@fontsource-variable/noto-serif-jp";
import {
  getArticles,
  getVisibleArticles,
  getPreviewBody,
  isJournalPreview,
  articleHref,
  visibleArticles,
  type JournalQuery,
} from "@/lib/journal";
import { extractToc, readingMinutes } from "@/lib/journalToc";
import { categoryLabel } from "@/content/journal";
import {
  JournalShell,
  ArticleDate,
  ArticleCard,
} from "@/components/journal/Journal";
import {
  ArticleTracking,
  JournalBooking,
} from "@/components/journal/JournalTracking";
import { ArticleBody } from "@/components/journal/article/ArticleBody";
import { ArticleSidebar } from "@/components/journal/article/ArticleSidebar";
import { ArticleToc } from "@/components/journal/article/ArticleToc";
import { readyForIndexing, siteUrl } from "@/lib/config";
import s from "@/components/journal/article/article.module.css";
import cards from "@/components/journal/journal.module.css";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<JournalQuery>;
};

/** Only published articles are pre-rendered; drafts exist solely in the dev preview. */
export async function generateStaticParams() {
  return visibleArticles(await getArticles()).map((article) => ({
    slug: article.slug,
  }));
}

async function resolveArticle({ params, searchParams }: Props) {
  const { slug } = await params;
  // Preview exists only in development. Never touch searchParams in production: reading it
  // would turn the statically generated article pages into dynamic ones and break them.
  const preview =
    process.env.NODE_ENV === "development"
      ? isJournalPreview(await searchParams)
      : false;
  const articles = await getVisibleArticles(preview);
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return { article, articles, preview };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { article, preview } = await resolveArticle(props);
  const url = articleHref(article.slug);
  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.description;
  return {
    title: `${title} | ENPATH JOURNAL`,
    description,
    alternates: { canonical: url },
    robots: {
      index: readyForIndexing && !preview,
      follow: readyForIndexing && !preview,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [{ url: article.coverImage, alt: article.imageAlt ?? "記事のイメージ" }],
      ...(article.publishedAt ? { publishedTime: article.publishedAt } : {}),
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.coverImage],
    },
  };
}

export default async function ArticlePage(props: Props) {
  const { article, articles, preview } = await resolveArticle(props);
  const others = articles.filter((item) => item.slug !== article.slug);
  // Same category first, then the rest; at most three.
  const related = [
    ...others.filter((item) => item.category === article.category),
    ...others.filter((item) => item.category !== article.category),
  ].slice(0, 3);
  const source = article.body || (preview ? await getPreviewBody() : "");
  const toc = extractToc(source);
  const hasOwnCta = /<Cta[\s>]/.test(source);
  const minutes = readingMinutes(article.body);
  const journalHref = (query = "") =>
    `/journal${query}${preview ? `${query ? "&" : "?"}preview=1` : ""}`;
  const base = siteUrl;
  const jsonLd =
    base && !preview
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.seoDescription ?? article.description,
            image: new URL(article.coverImage, base).href,
            mainEntityOfPage: new URL(articleHref(article.slug), base).href,
            datePublished: article.publishedAt,
            inLanguage: "ja",
            publisher: {
              "@type": "Organization",
              name: "ENPATH",
              url: base,
              logo: { "@type": "ImageObject", url: new URL("/logo.png", base).href },
            },
            ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
            ...(article.author
              ? { author: { "@type": "Person", name: article.author } }
              : {}),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "ENPATH JOURNAL",
                item: new URL("/journal", base).href,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: categoryLabel(article.category),
                item: new URL(`/journal?category=${article.category}`, base).href,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: new URL(articleHref(article.slug), base).href,
              },
            ],
          },
        ]
      : null;
  const fields = {
    slug: article.slug,
    category: article.category,
    title: article.title,
  };

  return (
    <JournalShell preview={preview}>
      <ArticleTracking fields={fields} preview={preview} />
      <div className={s.page}>
        <nav className={s.crumbs} aria-label="パンくずリスト">
          <Link href={journalHref()}>ENPATH JOURNAL</Link>
          <span aria-hidden="true">＞</span>
          <Link href={journalHref(`?category=${article.category}`)}>
            {categoryLabel(article.category)}
          </Link>
          <span aria-hidden="true">＞</span>
          <span aria-current="page">{article.title}</span>
        </nav>

        <article>
          <header className={s.head}>
            <p className={s.pill}>{categoryLabel(article.category)}</p>
            <h1 className={s.title}>{article.title}</h1>
            <p className={s.lead}>{article.description}</p>
            <div className={s.meta}>
              <ArticleDate article={article} />
              {article.updatedAt && (
                <span>
                  更新{" "}
                  <time dateTime={article.updatedAt}>
                    {article.updatedAt.replaceAll("-", ".")}
                  </time>
                </span>
              )}
              {article.author && <span>執筆：{article.author}</span>}
              {minutes > 0 && <span>読了目安 約{minutes}分</span>}
            </div>
          </header>
          <div className={s.cover}>
            <Image
              src={article.coverImage}
              alt={article.imageAlt ?? ""}
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1104px"
            />
          </div>
          <p className={s.caption}>
            写真はイメージです。実際の受講者・コーチを示すものではありません。
          </p>

          <div className={s.layout}>
            <div className={s.main}>
              <ArticleToc items={toc} variant="inline" />
              {preview && (
                <p className={s.notice}>
                  {article.status === "draft"
                    ? "開発用プレビューです。この記事は下書きのため、本番には表示されません。"
                    : "開発用プレビューです。"}
                  {article.body
                    ? ""
                    : "本文は未作成です。以下は表示確認用のサンプルで、この記事の本文ではありません。"}
                </p>
              )}
              <ArticleBody source={source} fields={fields} preview={preview} />

              {!hasOwnCta && (
                <section className={s.endCta} aria-labelledby="end-cta-title">
                  <h2 id="end-cta-title">英語学習を、あなたに合った方法で。</h2>
                  <p>
                    ENPATHでは、一人ひとりの目標や課題に合わせた学習プランをご提案しています。
                  </p>
                  <JournalBooking preview={preview} fields={fields} />
                </section>
              )}

              <nav className={s.endNav} aria-label="記事を読んだあとに">
                <Link href={journalHref()}>← ENPATH JOURNALへ戻る</Link>
                <Link href={journalHref(`?category=${article.category}`)}>
                  「{categoryLabel(article.category)}」の記事を見る
                </Link>
              </nav>
            </div>
            <ArticleSidebar
              article={article}
              toc={toc}
              related={related}
              preview={preview}
            />
          </div>
        </article>

        {related.length > 0 && (
          <section className={s.relatedSection} aria-labelledby="related-heading">
            <h2 id="related-heading">関連記事</h2>
            <div className={cards.grid}>
              {related.map((item) => (
                <ArticleCard
                  key={item.slug}
                  article={item}
                  preview={preview}
                  related
                />
              ))}
            </div>
          </section>
        )}
      </div>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </JournalShell>
  );
}
