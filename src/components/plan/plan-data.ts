export type Slot = "朝" | "昼" | "夜";
export type Category = "vocab" | "listening" | "grammar" | "speaking" | "review";

export type StudyActivity = {
  id: string;
  title: string;
  durationMinutes: number;
  category: Category;
  slot: Slot;
};
export type StudyDay = { day: string; activities: StudyActivity[]; isRestDay?: boolean };
export type DailyScene = { id: string; time: string; title: string; activity: string; image: string; alt: string };

export const slots: Slot[] = ["朝", "昼", "夜"];

export const categoryLabel: Record<Category, string> = {
  vocab: "語彙・表現",
  listening: "リスニング",
  grammar: "文法・音読",
  speaking: "スピーキング",
  review: "復習・振り返り",
};

let n = 0;
const a = (slot: Slot, title: string, durationMinutes: number, category: Category): StudyActivity => ({
  id: `a${++n}`,
  slot,
  title,
  durationMinutes,
  category,
});

/** Sample plan: business English, 45 minutes a day (an explanatory assumption, not a required study time). */
export const week: StudyDay[] = [
  { day: "月", activities: [a("朝", "語彙・表現", 15, "vocab"), a("昼", "リスニング", 15, "listening"), a("夜", "スピーキング", 15, "speaking")] },
  { day: "火", activities: [a("朝", "リスニング", 15, "listening"), a("夜", "文法・音読", 30, "grammar")] },
  { day: "水", activities: [a("朝", "語彙・表現", 15, "vocab"), a("昼", "復習", 10, "review"), a("夜", "スピーキング", 20, "speaking")] },
  { day: "木", activities: [a("朝", "リスニング", 15, "listening"), a("昼", "語彙・表現", 10, "vocab"), a("夜", "会議を想定した練習", 20, "speaking")] },
  { day: "金", activities: [a("朝", "語彙・表現", 15, "vocab"), a("夜", "会議を想定した練習", 30, "speaking")] },
  { day: "土", activities: [a("朝", "リスニング", 15, "listening"), a("昼", "文法・音読", 15, "grammar"), a("夜", "スピーキング", 15, "speaking")] },
  { day: "日", activities: [a("朝", "語彙・表現の復習", 15, "review"), a("夜", "1週間の振り返り", 30, "review")] },
];

export const scenes: DailyScene[] = [
  { id: "morning", time: "朝の準備", title: "単語・表現の確認", activity: "ノートを開いて、使いたい表現を見直す。", image: "s1", alt: "朝の光が入る机に開かれた、表現をまとめた英語ノート" },
  { id: "commute", time: "通勤時間", title: "リスニング", activity: "電車の中で、イヤホンから英語を聞く。", image: "s2", alt: "電車の窓際でイヤホンを着け、スマートフォンを手にする女性" },
  { id: "lunch", time: "昼休み", title: "短時間の復習", activity: "単語リストを見返して、記憶を確かめる。", image: "s3", alt: "単語リストとノートが広がる明るい机" },
  { id: "evening", time: "帰宅後", title: "スピーキング練習", activity: "声に出して、伝える練習をする。", image: "s4", alt: "ノートPCに向かい、身振りを交えて英語を話す女性" },
  { id: "night", time: "就寝前", title: "学習の振り返り", activity: "できたことと課題を、ノートに残す。", image: "s5", alt: "夜の暖かな照明の下、ノートを前に一日を振り返る女性" },
];

export const normalWeek = {
  label: "通常の週",
  title: "1日45分の学習",
  text: "学習時間を確保できる週。",
  bars: [
    { category: "vocab" as Category, minutes: 15 },
    { category: "listening" as Category, minutes: 15 },
    { category: "speaking" as Category, minutes: 15 },
  ],
};
export const busyWeek = {
  label: "忙しい週",
  title: "1日20分のミニマムプラン",
  text: "仕事が忙しく、学習時間を確保しづらい週。",
  bars: [
    { category: "listening" as Category, minutes: 10 },
    { category: "vocab" as Category, minutes: 10 },
  ],
};

export const menus = [
  {
    no: "01",
    title: "ビジネス英語",
    goal: "仕事で自信を持って英語を使いたい",
    text: "伝えたいことを整理し、会議や報告を想定した表現を練習に取り入れます。",
    image: "g-business",
    alt: "オンラインでコーチと話しながら、学習計画を確認する女性",
  },
  {
    no: "02",
    title: "TOEIC・資格対策",
    goal: "スコアを上げて、キャリアの選択肢を広げたい",
    text: "語彙・文法の基礎、聞き取る力、英文を読む力など、試験の内容に合わせて優先順位を考えます。",
    image: "g-toeic",
    alt: "教材とノートを広げて学習計画を確認する机",
  },
  {
    no: "03",
    title: "日常英会話",
    goal: "海外旅行や日常で、自然に話せるようになりたい",
    text: "聞き取る練習と、自分の言葉で話す練習を中心に、生活場面に近い内容を選びます。",
    image: "g-daily",
    alt: "明るい室内で、笑顔でノートに向かう女性",
  },
];
