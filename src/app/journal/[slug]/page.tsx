import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getVisibleArticles,
  getPreviewBody,
  isJournalPreview,
  articleHref,
  type JournalQuery,
} from "@/lib/journal";
import { categoryLabel } from "@/content/journal";
import {
  JournalShell,
  ArticleDate,
  ArticleCard,
  JournalCTA,
} from "@/components/journal/Journal";
import { ArticleTracking } from "@/components/journal/JournalTracking";
import { readyForIndexing, siteUrl } from "@/lib/config";
import s from "@/components/journal/journal.module.css";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<JournalQuery>;
};
async function resolveArticle({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const preview = isJournalPreview(query);
  const articles = await getVisibleArticles(preview);
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return { article, articles, preview };
}
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { article, preview } = await resolveArticle(props);
  const url = articleHref(article.slug);
  return {
    title: `${article.title} | ENPATH JOURNAL`,
    description: article.description,
    alternates: { canonical: url },
    robots: {
      index: readyForIndexing && !preview,
      follow: readyForIndexing && !preview,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url,
      images: [{ url: article.coverImage, alt: "記事のイメージ" }],
      ...(article.publishedAt ? { publishedTime: article.publishedAt } : {}),
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.coverImage],
    },
  };
}
export default async function ArticlePage(props: Props) {
  const { article, articles, preview } = await resolveArticle(props);
  const related = articles
    .filter((item) => item.slug !== article.slug)
    .sort(
      (a, b) =>
        Number(b.category === article.category) -
        Number(a.category === article.category),
    )
    .slice(0, 3);
  const source = article.body || (preview ? await getPreviewBody() : "");
  const jsonLd =
    siteUrl && !preview
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            image: new URL(article.coverImage, siteUrl).href,
            mainEntityOfPage: new URL(articleHref(article.slug), siteUrl).href,
            datePublished: article.publishedAt,
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
                name: "ENPATH",
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "ENPATH JOURNAL",
                item: new URL("/journal", siteUrl).href,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: new URL(articleHref(article.slug), siteUrl).href,
              },
            ],
          },
        ]
      : null;
  return (
    <JournalShell preview={preview}>
      <ArticleTracking
        fields={{
          slug: article.slug,
          title: article.title,
          category: article.category,
        }}
        preview={preview}
      />
      <div className={s.wrap}>
        <nav className={s.breadcrumb} aria-label="パンくずリスト">
          <Link href="/">ホーム</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/journal${preview ? "?preview=1" : ""}`}>
            ENPATH JOURNAL
          </Link>
          <span aria-hidden="true">/</span>
          <span>{categoryLabel(article.category)}</span>
        </nav>
        <article>
          <header className={s.articleHeader}>
            <p className={s.category}>{categoryLabel(article.category)}</p>
            <h1>{article.title}</h1>
            <p className={s.lead}>{article.description}</p>
            <div className={s.date}>
              <ArticleDate article={article} />
              {article.updatedAt && (
                <span>
                  更新：
                  <time dateTime={article.updatedAt}>
                    {article.updatedAt.replaceAll("-", ".")}
                  </time>
                </span>
              )}
              {article.author && <span>執筆：{article.author}</span>}
            </div>
          </header>
          <div className={s.articleCover}>
            <Image
              src={article.coverImage}
              alt="記事内容のイメージ（実際の受講者・コーチではありません）"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1040px"
            />
          </div>
          <p className={s.imageNote}>
            写真はイメージです。実際の受講者・コーチを示すものではありません。
          </p>
          {preview && (
            <p className={s.bodyNotice}>
              {article.body
                ? "承認前の下書きです。本番では表示されません。"
                : "本文は未作成です。以下は見出し・表・画像などのレイアウト確認用サンプルであり、この記事の本文ではありません。"}
            </p>
          )}
          <div className={s.prose}>
            <MDXRemote
              source={source}
              options={{
                blockJS: true,
                mdxOptions: { remarkPlugins: [remarkGfm] },
              }}
              components={{
                h1: (props) => <h2 {...props} />,
                img: ({ src, alt }) => (
                  <Image
                    src={typeof src === "string" ? src : ""}
                    alt={alt ?? ""}
                    width={1200}
                    height={675}
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                ),
                table: (props) => (
                  <div
                    className={s.tableScroll}
                    tabIndex={0}
                    role="region"
                    aria-label="表（横にスクロールできます）"
                  >
                    <table {...props} />
                  </div>
                ),
                a: (props) => (
                  <a
                    {...props}
                    rel={
                      props.href?.startsWith("https://")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  />
                ),
              }}
            />
          </div>
        </article>
        <nav className={s.articleNav} aria-label="記事を読んだあとに">
          <Link href={`/journal${preview ? "?preview=1" : ""}`}>
            ← JOURNAL一覧へ
          </Link>
          <Link href="/features">ENPATHの特徴 ↗</Link>
          <Link href="/#coach">コーチについて ↗</Link>
        </nav>
        {related.length > 0 && (
          <section className={s.latest} aria-labelledby="related-heading">
            <div className={s.sectionTitle}>
              <h2 id="related-heading">あわせて読みたい</h2>
            </div>
            <div className={s.grid}>
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
      <JournalCTA article={article} preview={preview} />
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
