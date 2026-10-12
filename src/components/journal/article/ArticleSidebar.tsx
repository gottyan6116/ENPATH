import Image from "next/image";
import Link from "next/link";
import { categoryLabel } from "@/content/journal";
import { articleHref, type JournalArticle } from "@/lib/journal";
import type { TocItem } from "@/lib/journalToc";
import { JournalBooking } from "../JournalTracking";
import { ArticleToc } from "./ArticleToc";
import s from "./article.module.css";

export function ArticleSidebar({
  article,
  toc,
  related,
  preview,
}: {
  article: JournalArticle;
  toc: TocItem[];
  related: JournalArticle[];
  preview: boolean;
}) {
  return (
    <aside className={s.aside} aria-label="サイドバー">
      <ArticleToc items={toc} variant="sidebar" />
      <section className={s.sideCta} aria-labelledby="side-cta-title">
        <h2 id="side-cta-title">
          英語学習の悩みを、
          <br />
          一緒に整理してみませんか？
        </h2>
        <p>あなたの目標や現在の課題に合わせて、学習の進め方をご提案します。</p>
        <JournalBooking
          preview={preview}
          fields={{ slug: article.slug, category: article.category, title: article.title }}
        />
      </section>
      {related.length > 0 && (
        <section className={s.sideRelated} aria-labelledby="side-related-title">
          <p className={s.sideLabel} id="side-related-title">
            関連記事
          </p>
          <ul className={s.relatedMini}>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={articleHref(item.slug, preview)}>
                  <span className={s.thumb}>
                    <Image src={item.coverImage} alt="" fill sizes="76px" />
                  </span>
                  <span>
                    <small>{categoryLabel(item.category)}</small>
                    <strong>{item.title}</strong>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}
