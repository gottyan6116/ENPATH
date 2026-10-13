// Free resources (white papers). Add an entry here to add a card; no component changes are needed.
// `pdf` stays null until the real PDF file exists - the download dialog then says "preparing".
export type Resource = {
  id: string;
  category: "plan" | "habit" | "goal" | "guide";
  categoryLabel: string;
  title: string;
  description: string;
  cover: { src: string; w: number; h: number; alt: string };
  /** Public path of the real PDF, e.g. "/downloads/xxx.pdf". null = not available yet. */
  pdf: string | null;
};

export const featured: Resource & { kicker: string; tags: string[] } = {
  id: "coaching-guide",
  category: "guide",
  categoryLabel: "PICK UP",
  kicker: "ENPATHの考え方を詰め込んだ、はじめの一冊",
  title: "はじめての英語コーチングガイド",
  description:
    "英語コーチングとは？どんな効果があるの？という疑問から、ENPATHのメソッド、実際の学習ステップまでをやさしくまとめたガイドです。英語学習をこれから始める方、コーチングに興味がある方におすすめです。",
  tags: ["英語コーチングの基礎", "ENPATHのメソッド", "実践の事例", "よくある質問"],
  cover: { src: "/images/resources/guide.webp", w: 1047, h: 1246, alt: "資料「はじめての英語コーチングガイド」の表紙" },
  pdf: null,
};

export const resources: Resource[] = [
  {
    id: "plan-30days",
    category: "plan",
    categoryLabel: "学習計画",
    title: "30日間学習プラン",
    description: "無理なく、着実に。一歩ずつ進める30日間の学習スケジュール。",
    cover: { src: "/images/resources/plan-30days.webp", w: 978, h: 1089, alt: "資料「30日間学習プラン」の表紙" },
    pdf: null,
  },
  {
    id: "review-sheet",
    category: "habit",
    categoryLabel: "習慣化",
    title: "学習の振り返りワークシート",
    description: "学びを続けるために、いまの自分を知る。日々の学習を振り返るワークシートです。",
    cover: { src: "/images/resources/review-sheet.webp", w: 1049, h: 1289, alt: "資料「学習の振り返りワークシート」の表紙" },
    pdf: null,
  },
  {
    id: "goal-sheet",
    category: "goal",
    categoryLabel: "目標設定",
    title: "理想のわたしに近づく目標設定シート",
    description: "なぜ英語を学ぶのか？どんな自分になりたいのか？目標を整理するためのワークシートです。",
    cover: { src: "/images/resources/goal-sheet.webp", w: 998, h: 1175, alt: "資料「理想のわたしに近づく目標設定シート」の表紙" },
    pdf: null,
  },
];

/** Hero shortcuts: scroll to the matching card. */
export const shortcuts = [
  { icon: "calendar", title: "学習計画", sub: "計画を立てる", target: "plan-30days" },
  { icon: "refresh", title: "習慣化", sub: "続ける仕組み", target: "review-sheet" },
  { icon: "flag", title: "目標設定", sub: "なりたい自分から考える", target: "goal-sheet" },
] as const;

/** Not customer reviews: ways to use each resource. */
export const useCases = [
  { title: "学習計画を立てる", text: "30日間の学習スケジュールを手がかりに、無理のない進め方を考えられます。" },
  { title: "学習を振り返る", text: "ワークシートで日々の学習を見直し、続けるためのヒントを探せます。" },
  { title: "自分の目標を整理する", text: "なぜ英語を学ぶのか、どんな自分になりたいのかを書き出して整理できます。" },
] as const;
