// Verified business information belongs here. Null means unconfirmed, never an invented claim.
export const service = {
  coach: {
    name: null as string | null,
    portrait: null as string | null,
    experience: null as string | null,
    specialty: null as string | null,
    message: null as string | null,
  },
  pricing: {
    price: null as string | null,
    duration: null as string | null,
    meetings: null as string | null,
    support: null as string | null,
    conditions: null as string | null,
  },
  film: {
    mp4: null as string | null,
    webm: null as string | null,
    poster: null as string | null,
  },
  // Replace with licensed standalone photographs in /public/media. Keep the image disclosure accurate.
  photos: {
    listening: null as string | null,
    planning: "/media/planning.webp" as string | null,
    online: "/media/online.webp" as string | null,
    future: null as string | null,
  },
};

export const chapters = [
  {
    id: "listening",
    label: "目標を知る",
    en: "LISTENING",
    title: "まずは、あなたの話から。",
    description: "今の悩みも、これからの目標も。あなたの想いを丁寧に伺います。",
    start: 0,
    photo: "listening",
  },
  {
    id: "planning",
    label: "学習を設計する",
    en: "PLANNING",
    title: "目標までの道筋を、一緒に。",
    description:
      "英語力と生活リズムを踏まえて、無理なく続く学習計画を考えます。",
    start: 4,
    photo: "planning",
  },
  {
    id: "online",
    label: "一緒に続ける",
    en: "COACHING",
    title: "一人で頑張らなくていい。",
    description: "進み具合を振り返り、計画を見直す。日々の学びに伴走します。",
    start: 8,
    photo: "online",
  },
] as const;

export const roadmaps = [
  {
    id: "business",
    label: "ビジネス英語",
    goal: "会議で、自分の考えを伝えたい。",
    level: "基礎文法は理解・会話に苦手意識",
    deadline: "3か月後",
    time: "平日30分・休日60分",
    total: "週4.5時間",
    schedule: [
      ["月", "聴く・音読", "30分"],
      ["火", "仕事の語彙", "30分"],
      ["水", "聴く・音読", "30分"],
      ["木", "意見を話す", "30分"],
      ["金", "1週間の復習", "30分"],
      ["土", "会議を想定した練習", "60分"],
      ["日", "振り返り・計画調整", "60分"],
    ],
    milestones: [
      ["1か月目", "伝える土台をつくる", "基本表現と音のつながりを確認"],
      ["2か月目", "自分の言葉で話す", "短い意見と理由を組み立てる"],
      ["3か月目", "仕事の場面で実践", "会議を想定して繰り返し練習"],
    ],
    metric: "学習実施率・要点の聞き取り・1分間スピーチの変化",
    note: "通勤時間にリスニング、夜に短い音読。今の生活に、学びを組み込みます。",
  },
  {
    id: "toeic",
    label: "TOEIC®対策",
    goal: "試験に向けて、苦手を整理したい。",
    level: "模試で現在地を確認する想定",
    deadline: "4か月後の受験",
    time: "平日45分・休日90分",
    total: "週6.75時間",
    schedule: [
      ["月", "語彙・短文読解", "45分"],
      ["火", "リスニング", "45分"],
      ["水", "文法・弱点復習", "45分"],
      ["木", "長文読解", "45分"],
      ["金", "聞き取り・復習", "45分"],
      ["土", "時間を測って演習", "90分"],
      ["日", "誤答分析・計画調整", "90分"],
    ],
    milestones: [
      ["1か月目", "現在地と弱点を知る", "模試と誤答の傾向を確認"],
      ["2〜3か月目", "苦手な領域に取り組む", "語彙・文法・聴解を補強"],
      ["4か月目", "時間配分を整える", "模試で解き方を振り返る"],
    ],
    metric: "領域別正答率・解答時間・復習の定着度",
    note: "点数だけでなく、つまずく理由を確認。苦手に合わせて配分を調整します。",
  },
  {
    id: "daily",
    label: "日常英会話・学び直し",
    goal: "旅先で、自然に会話を楽しみたい。",
    level: "中学英語から学び直す想定",
    deadline: "6か月後",
    time: "平日20分・休日40分",
    total: "週3時間",
    schedule: [
      ["月", "基本フレーズ", "20分"],
      ["火", "音を聴く・まねる", "20分"],
      ["水", "身近なことを話す", "20分"],
      ["木", "基本文法", "20分"],
      ["金", "フレーズの復習", "20分"],
      ["土", "旅先を想定した練習", "40分"],
      ["日", "振り返り・計画調整", "40分"],
    ],
    milestones: [
      ["1〜2か月目", "英語に慣れる", "基礎表現と音読を習慣に"],
      ["3〜4か月目", "身近なことを伝える", "自己紹介や日常の話題を練習"],
      ["5〜6か月目", "場面を広げて楽しむ", "旅行・買い物のやり取りを練習"],
    ],
    metric: "学習継続日数・使える表現・会話で伝えられる内容",
    note: "短い時間から、少しずつ。できたことを一緒に見つけて、次の一歩へ。",
  },
] as const;

export const faqs = [
  [
    "英語初心者でも利用できますか？",
    "初心者の方も想定したサービスです。学習経験や現在の英語力を確認し、取り組む内容を一緒に整理します。対応可能な支援内容は、カウンセリング時にご確認ください。",
  ],
  [
    "英語を直接教えてもらえるのですか？",
    "ENPATHは、学習計画の設計と継続支援を中心とした英語コーチングサービスです。週1回の振り返りでは、学習状況の確認や計画の見直しに加え、必要に応じたティーチングも行います。",
  ],
  [
    "TOEICやビジネス英語にも対応していますか？",
    "TOEIC対策やビジネス英語など、目的に応じた学習設計を想定しています。複数の目標がある場合も、優先順位や期限を一緒に整理します。個別の対応範囲はご相談ください。",
  ],
  [
    "仕事が忙しくても利用できますか？",
    "確保できる時間や生活リズムを踏まえて計画を考えます。忙しい時期には学習量や取り組み方を見直し、継続できる方法を探します。成果や特定の学習時間を保証するものではありません。",
  ],
  [
    "学習計画はどのように作成されますか？",
    "目標・現在の英語力・期限・学習時間・過去の学習経験などを確認して作成します。開始後も進捗に合わせて調整します。このページのロードマップは説明用のサンプルです。",
  ],
  [
    "コーチとの面談はどのように行いますか？",
    "コーチとの振り返りは週1回行います。学習進捗の確認、課題の整理、学習計画の調整に加え、必要に応じてティーチングを行います。",
  ],
  [
    "料金や契約期間はどのようになっていますか？",
    "ENPATHは、入会金5,000円・受講料月額20,000円の1プラン制です。受講期間や解約・支払い条件については、ご契約前にご案内します。",
  ],
] as const;
