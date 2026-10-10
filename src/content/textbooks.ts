// Cover images are examples of textbooks. Titles are transcribed from the covers.
export type Book = {
  id: string;
  title: string;
  src: string;
  w: number;
  h: number;
};

const b = (id: string, title: string, w: number, h: number): Book => ({
  id,
  title,
  src: `/media/texts/${id}.webp`,
  w,
  h,
});

export const books = {
  ultimateListening1: b("ultimate-listening-1", "究極の英語リスニング Vol.1", 323, 445),
  ultimateBusiness3: b("ultimate-business-listening-3", "究極のビジネス英語リスニング Vol.3", 311, 445),
  instant: b("instant-eisakubun", "どんどん話すための瞬間英作文トレーニング", 312, 445),
  speakingPower: b("eigo-de-hanasu-chikara", "英語で話す力。", 312, 445),
  cnn: b("cnn-english-express", "CNN ENGLISH EXPRESS", 422, 584),
  evine: b("evine-junior-high-grammar", "中学英文法を修了するドリル", 343, 480),
  grammar1000: b("toeic-grammar-1000", "TOEIC L&R テスト 文法問題 でる1000問", 338, 480),
  grammar400: b("toeic-grammar-400", "TOEIC L&R テスト 文法問題 はじめの400問", 338, 480),
  official13: b("toeic-official-13", "公式 TOEIC Listening & Reading 問題集 13", 383, 480),
  deruTan: b("toeic-deru-tan", "TOEIC L&R TEST 出る単特急 金のフレーズ", 299, 480),
  ekiDai: b("toeic-1eki1dai", "1駅1題 TOEIC L&R TEST 文法特急", 299, 480),
  eiken3: b("eiken-grade3", "英検3級をひとつひとつわかりやすく。", 346, 480),
  eiken2: b("eiken-grade2", "英検2級 過去6回全問題集", 338, 480),
  kikutan: b("kikutan-entry", "キクタン【Entry】2000語レベル", 346, 480),
  shadowing: b("shadowing-intro", "決定版 英語シャドーイング 超入門", 338, 480),
} as const;

// Hand-placed so the first view looks scattered but renders identically on server and client.
// x/y: % of the stage, s: width in px (desktop), d: depth 0 (far) – 1 (near), r: tilt deg,
// t: float duration s, a: drift distance px, o: animation offset s
export const floating = [
  { book: books.shadowing, x: 4, y: 14, s: 150, d: 0.9, r: -7, t: 17, a: 22, o: -3 },
  { book: books.ultimateBusiness3, x: 17, y: 58, s: 128, d: 0.5, r: 6, t: 21, a: 18, o: -9 },
  { book: books.grammar1000, x: 9, y: 80, s: 112, d: 0.2, r: -4, t: 24, a: 14, o: -14 },
  { book: books.cnn, x: 27, y: 6, s: 120, d: 0.35, r: 9, t: 19, a: 16, o: -6 },
  { book: books.instant, x: 36, y: 74, s: 138, d: 0.7, r: -9, t: 18, a: 20, o: -1 },
  { book: books.kikutan, x: 62, y: 80, s: 118, d: 0.3, r: 5, t: 23, a: 15, o: -11 },
  { book: books.official13, x: 70, y: 4, s: 132, d: 0.6, r: -6, t: 20, a: 18, o: -5 },
  { book: books.ultimateListening1, x: 83, y: 16, s: 146, d: 0.95, r: 8, t: 16, a: 24, o: -8 },
  { book: books.deruTan, x: 88, y: 52, s: 124, d: 0.45, r: -8, t: 22, a: 17, o: -13 },
  { book: books.eiken2, x: 78, y: 76, s: 134, d: 0.8, r: 7, t: 19, a: 21, o: -2 },
  { book: books.speakingPower, x: 48, y: 90, s: 104, d: 0.15, r: -3, t: 26, a: 12, o: -16 },
  { book: books.evine, x: 2, y: 44, s: 108, d: 0.25, r: 4, t: 25, a: 13, o: -10 },
  { book: books.ekiDai, x: 52, y: -2, s: 100, d: 0.1, r: 6, t: 27, a: 11, o: -7 },
  { book: books.grammar400, x: 94, y: 78, s: 96, d: 0.12, r: -5, t: 28, a: 10, o: -4 },
  { book: books.eiken3, x: 22, y: 30, s: 92, d: 0.08, r: 3, t: 29, a: 10, o: -12 },
] as const;

export type GuideId = "business" | "toeic" | "daily" | "eiken";

export const guides: {
  id: GuideId;
  label: string;
  goal: string;
  level: string;
  books: { book: Book; role: string }[];
  steps: { when: string; where: string; how: string }[];
  note: string;
}[] = [
  {
    id: "business",
    label: "ビジネス英語",
    goal: "会議で、自分の考えを伝えたい。",
    level: "基礎文法は理解・会話に苦手意識",
    books: [
      { book: books.ultimateBusiness3, role: "仕事の場面を聴いて、音と語彙を身につける" },
      { book: books.instant, role: "短い英文を口に出して、反射的に言えるようにする" },
      { book: books.speakingPower, role: "賛成・反対・中立の意見を組み立てる練習" },
    ],
    steps: [
      { when: "通勤中・平日30分", where: "リスニング教材の1ユニットを聴く → 音読", how: "分からない箇所は無理に調べず、まず3回聴く。1週間で同じユニットを繰り返す。" },
      { when: "夜・平日15分", where: "瞬間英作文を1日10文", how: "日本語を見て口に出す。詰まった文に印をつけ、週末にまとめて復習する。" },
      { when: "休日・60分", where: "意見を1分で話す練習", how: "テーマを1つ選び、結論→理由→具体例の順で録音。翌週、聞き返して変化を確認する。" },
    ],
    note: "1か月目は「聴く・音読」、2か月目は「短く話す」、3か月目は「会議を想定して話す」と、教材の使う範囲を段階的に広げます。",
  },
  {
    id: "toeic",
    label: "TOEIC® L&R",
    goal: "試験に向けて、苦手を整理したい。",
    level: "模試で現在地を確認する想定",
    books: [
      { book: books.official13, role: "最初に現在地を測り、最後に仕上がりを確認する" },
      { book: books.deruTan, role: "頻出の語彙を、期限を決めて覚える" },
      { book: books.grammar1000, role: "文法問題を、弱点に絞って繰り返す" },
    ],
    steps: [
      { when: "開始時・1回", where: "公式問題集の1回分を時間を測って解く", how: "点数より「どのパートで・なぜ間違えたか」を記録し、教材の配分を決める。" },
      { when: "平日・45分", where: "語彙 → 文法の順に、弱点領域のみ", how: "語彙は1日の量を固定。文法は誤答した項目だけを解き直す。" },
      { when: "土日・90分", where: "公式問題集をパート単位で演習", how: "週ごとに範囲を決め、日曜に誤答分析。次週の教材配分を見直す。" },
    ],
    note: "受験日から逆算し、「いつまでに、どの教材の、どこまで」を週単位で決めます。進み具合に合わせて配分は調整します。",
  },
  {
    id: "daily",
    label: "日常英会話・学び直し",
    goal: "旅先で、自然に会話を楽しみたい。",
    level: "中学英語から学び直す想定",
    books: [
      { book: books.evine, role: "中学英文法を、短期間でおさらいする" },
      { book: books.kikutan, role: "基本の2000語を、音で覚える" },
      { book: books.shadowing, role: "聞こえた音をまねて、話す土台をつくる" },
    ],
    steps: [
      { when: "朝・平日20分", where: "単語を音声と一緒に、1日の量を決めて", how: "「聞いて・書いて」を1セット。覚えきれなくても次に進み、復習の日を別に設ける。" },
      { when: "夜・平日20分", where: "文法ドリルを1日1項目", how: "解いた日に声に出して読む。30日で1周を目安に、無理のない量に調整する。" },
      { when: "週末・40分", where: "シャドーイングを1つの題材で", how: "同じ素材を1週間繰り返し、旅先で使う場面を想像して言い換えてみる。" },
    ],
    note: "短い時間でも続くように、1回の量を小さく設計します。できた日を一緒に確認しながら、範囲を広げていきます。",
  },
  {
    id: "eiken",
    label: "英検・資格",
    goal: "次の級に、確実に合格したい。",
    level: "3級〜2級を目指す想定",
    books: [
      { book: books.eiken3, role: "3級の出題範囲を、基礎から整理する" },
      { book: books.eiken2, role: "2級の過去問で、形式と時間配分に慣れる" },
      { book: books.cnn, role: "生の英語に触れ、読む・聴く力を伸ばす" },
    ],
    steps: [
      { when: "開始〜2週間", where: "志望級の解説書を通読", how: "分からない単元に印をつけ、全体像を先につかむ。" },
      { when: "試験の2か月前〜", where: "過去問を1回分ずつ、時間を測って", how: "解いた当日に復習し、間違いの原因を「語彙・文法・読解」に分類する。" },
      { when: "直前・1週間", where: "弱点の単元だけを再確認", how: "新しい教材には手を出さず、手元の1冊を仕上げる。" },
    ],
    note: "志望級と試験日から、解説書・過去問・生教材の使う順番と量を決めます。",
  },
];
