import type { JournalCategory } from "./journal";

/**
 * Pre-publication preview cards for the JOURNAL list.
 * These are NOT published articles: no body, date, summary or detail URL exists yet, so the cards
 * are not linked and are never added to the sitemap or structured data.
 * Shown only while there are no published articles; replace with MDX metadata when articles go live.
 */
export type JournalCardItem = {
  id: string;
  title: string;
  category: JournalCategory;
  categoryLabel: string;
  image: string;
  /** Set when a real detail page exists; the card then becomes a link. */
  slug?: string;
};

export const previewCards: JournalCardItem[] = [
  {
    id: "jp-english-education",
    title: "日本の英語教育は実は素晴らしい",
    category: "learning",
    categoryLabel: "英語学習のヒント",
    image: "/images/journal/articles/jp-english-education.webp",
  },
  {
    id: "why-enpath-story",
    title: "私がENPATHを立ち上げた理由",
    category: "our-story",
    categoryLabel: "ENPATHの想い",
    image: "/images/journal/articles/why-enpath-story.webp",
  },
  {
    id: "ai-era-learning",
    title: "AI時代の英語学習",
    category: "perspectives",
    categoryLabel: "英語と、これから",
    image: "/images/journal/articles/ai-era-learning.webp",
  },
];
