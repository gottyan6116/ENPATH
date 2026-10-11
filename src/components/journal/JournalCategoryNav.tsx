import { journalCategories } from "@/content/journal";
import { JournalLink } from "./JournalTracking";
import s from "./journal.module.css";

const all = { id: "all", label: "すべて", description: "すべての読みもの" };

export function JournalCategoryNav({
  selectedId,
  preview,
}: {
  selectedId?: string;
  preview: boolean;
}) {
  return (
    <nav aria-label="記事カテゴリ" className={s.filters}>
      <span className={s.filterLabel} aria-hidden="true">
        CATEGORY <i>/</i>
      </span>
      <div className={s.filterList}>
        {[all, ...journalCategories].map((category) => {
          const query = [
            category.id !== "all" ? `category=${category.id}` : "",
            preview ? "preview=1" : "",
          ]
            .filter(Boolean)
            .join("&");
          return (
            <JournalLink
              key={category.id}
              href={`/journal${query ? `?${query}` : ""}`}
              event="journal_category_select"
              fields={{
                slug: "journal",
                category: category.id,
                title: category.label,
              }}
              preview={preview}
              current={
                selectedId ? category.id === selectedId : category.id === "all"
              }
            >
              {category.label}
            </JournalLink>
          );
        })}
      </div>
    </nav>
  );
}
