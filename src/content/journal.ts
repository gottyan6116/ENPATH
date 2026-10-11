export const journalCategories = [
  {
    id: "learning",
    label: "英語学習のヒント",
    description: "日々の学びに役立つ、方法と考え方。",
  },
  {
    id: "our-story",
    label: "ENPATHの想い",
    description: "私たちが大切にしている、学びへの想い。",
  },
  {
    id: "perspectives",
    label: "英語と、これから",
    description: "変わる時代のなかで、英語の価値を考える。",
  },
] as const;
export type JournalCategory = (typeof journalCategories)[number]["id"];
export const journalDescription =
  "英語を学ぶ理由から、毎日の学習のヒントまで。学び方を考え、自分らしい一歩を見つけるための読みものをお届けします。";
export function categoryLabel(id: JournalCategory) {
  return journalCategories.find((category) => category.id === id)!.label;
}
