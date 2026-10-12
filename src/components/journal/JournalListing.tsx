"use client";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { journalCategories } from "@/content/journal";
import { track } from "@/lib/analytics";
import { JournalReveal } from "./JournalReveal";
import s from "./journal.module.css";

export type ListingItem = { slug: string; category: string; node: ReactNode };
const all = { id: "all", label: "すべて", description: "いま読んでほしい、ピックアップ記事です。" };
const categories = [all, ...journalCategories];

const hrefFor = (id: string, preview: boolean) => {
  const q = [id !== "all" ? `category=${id}` : "", preview ? "preview=1" : ""]
    .filter(Boolean)
    .join("&");
  return `/journal${q ? `?${q}` : ""}`;
};
const fromLocation = () => {
  const id = new URLSearchParams(window.location.search).get("category");
  return categories.some((c) => c.id === id) ? (id as string) : "all";
};

/**
 * Category nav + article list. Filtering happens on the client without a route change,
 * so the hero above never re-renders or reloads. The URL is kept in sync for sharing/back.
 */
export function JournalListing({
  items,
  initialCategory,
  preview,
  samples = false,
}: {
  items: ListingItem[];
  initialCategory: string;
  preview: boolean;
  /** Items are pre-publication samples: don't present a story count as if they were published. */
  samples?: boolean;
}) {
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const onPop = () => setCategory(fromLocation());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const select = useCallback(
    (id: string, title: string) => {
      if (id === category) return;
      setCategory(id);
      window.history.pushState(null, "", hrefFor(id, preview));
      if (!preview) track("journal_category_select", { slug: "journal", category: id, title });
    },
    [category, preview],
  );

  const current = categories.find((c) => c.id === category) ?? all;
  const shown = category === "all" ? items : items.filter((item) => item.category === category);

  return (
    <>
      <nav aria-label="記事カテゴリ" className={s.filters}>
        <span className={s.filterLabel} aria-hidden="true">
          CATEGORY <i>/</i>
        </span>
        <div className={s.filterList}>
          {categories.map((c) => (
            <a
              key={c.id}
              href={hrefFor(c.id, preview)}
              aria-current={c.id === category ? "page" : undefined}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                select(c.id, c.label);
              }}
            >
              {c.label}
            </a>
          ))}
        </div>
      </nav>
      <section className={s.latest} aria-labelledby="latest-heading">
        <div className={s.sectionTitle}>
          <div>
            <h2 id="latest-heading">{category === "all" ? "注目の記事" : current.label}</h2>
            <p>{current.description}</p>
          </div>
          {!samples && (
            <span aria-live="polite">{String(shown.length).padStart(2, "0")} STORIES</span>
          )}
        </div>
        {shown.length ? (
          <JournalReveal key={category} className={s.grid}>
            {shown.map((item) => (
              <div key={item.slug} className={s.gridItem}>
                {item.node}
              </div>
            ))}
          </JournalReveal>
        ) : (
          <div className={s.empty}>
            <p className={s.eyebrow}>COMING SOON</p>
            <h3>
              {items.length
                ? "このカテゴリの読みものを、準備しています。"
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
    </>
  );
}
