import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { categoryLabel } from "@/content/journal";
import { articleHref, type JournalArticle } from "@/lib/journal";
import { JournalBooking, JournalLink } from "./JournalTracking";
import s from "./journal.module.css";

export function JournalShell({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview: boolean;
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <div id="top" />
      <Header />
      <main id="main" className={s.main}>
        {preview && (
          <aside className={s.preview} aria-label="開発用プレビュー">
            開発用プレビュー —
            すべての記事企画は下書きです。記事本文・公開日は未確定で、本番には表示されません。
          </aside>
        )}
        {children}
      </main>
      <Footer />
    </>
  );
}
export function ArticleDate({ article }: { article: JournalArticle }) {
  return (
    <>
      {article.publishedAt && (
        <time dateTime={article.publishedAt}>
          {article.publishedAt.replaceAll("-", ".")}
        </time>
      )}
      {article.status === "draft" && (
        <span className={s.draft}>下書き・企画案</span>
      )}
    </>
  );
}
export function ArticleCard({
  article,
  preview,
  related = false,
}: {
  article: JournalArticle;
  preview: boolean;
  related?: boolean;
}) {
  return (
    <article className={s.card}>
      <JournalLink
        href={articleHref(article.slug, preview)}
        event={related ? "journal_related_article_click" : undefined}
        fields={{
          slug: article.slug,
          category: article.category,
          title: article.title,
        }}
        preview={preview}
        className={s.cardLink}
      >
        <div className={s.cardImage}>
          <Image
            src={article.coverImage}
            alt=""
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
          />
        </div>
        <div className={s.cardText}>
          <p className={s.category}>{categoryLabel(article.category)}</p>
          <h3>{article.title}</h3>
          <p className={s.summary}>{article.description}</p>
          <div className={s.date}>
            <ArticleDate article={article} />
            <span aria-hidden="true">↗</span>
          </div>
        </div>
      </JournalLink>
    </article>
  );
}
export function JournalCTA({
  article,
  preview,
}: {
  article?: JournalArticle;
  preview: boolean;
}) {
  return (
    <section className={s.cta}>
      <div className={s.wrap}>
        <p className={s.eyebrow}>YOUR ENGLISH. YOUR PATH.</p>
        <h2>
          あなたに合う英語学習を、
          <br />
          一緒に考えませんか。
        </h2>
        <p>
          英語学習の進め方に迷ったら、まずは今の目標や悩みをお聞かせください。
        </p>
        <JournalBooking
          preview={preview}
          fields={{
            slug: article?.slug ?? "journal",
            category: article?.category ?? "all",
            title: article?.title ?? "ENPATH JOURNAL",
          }}
        />
      </div>
    </section>
  );
}
export function JournalTeaser() {
  return (
    <section className={s.teaser}>
      <div className={s.wrap}>
        <p className={s.eyebrow}>ENPATH JOURNAL</p>
        <h2>英語と、学びの話。</h2>
        <p>学び方を考え、自分らしい一歩を見つけるための読みもの。</p>
        <Link href="/journal" className={s.textLink}>
          ENPATH JOURNALを読む <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
