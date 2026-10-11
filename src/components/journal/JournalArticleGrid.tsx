import type { JournalArticle } from "@/lib/journal";
import { ArticleCard } from "./Journal";
import { JournalReveal } from "./JournalReveal";
import s from "./journal.module.css";

export function JournalArticleGrid({
  articles,
  preview,
  hasFeatured,
}: {
  articles: JournalArticle[];
  preview: boolean;
  hasFeatured: boolean;
}) {
  if (!articles.length)
    return (
      <div className={s.empty}>
        <p className={s.eyebrow}>COMING SOON</p>
        <h3>
          {hasFeatured
            ? "次の読みものを、準備しています。"
            : "読みものは、ただいま準備しています。"}
        </h3>
        <p>
          英語との向き合い方や、日々の学びのヒントを
          <br />
          この場所からお届けしていきます。
        </p>
      </div>
    );
  return (
    <JournalReveal className={s.grid}>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} preview={preview} />
      ))}
    </JournalReveal>
  );
}
