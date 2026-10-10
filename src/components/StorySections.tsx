import {
  ArrowRight,
  BriefcaseBusiness,
  BookOpen,
  MessagesSquare,
  Plane,
  Sprout,
  Check,
  UserRound,
  UsersRound,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Photo } from "./Photo";
import { BookingLink } from "./BookingLink";

export function PainPoints() {
  const concerns = [
    "何から勉強すればよいかわからない",
    "自分に合った学習方法がわからない",
    "やる気はあるのに、なかなか続かない",
    "勉強していても、成長を実感できない",
    "目標までの道筋が、まだ見えない",
  ];
  return (
    <section id="about" className="section pain-section">
      <div className="container pain-layout">
        <div>
          <SectionHeading label="FIND YOUR STARTING POINT">
            英語学習、こんな悩みは
            <br />
            ありませんか？
          </SectionHeading>
          <p className="body-copy">
            頑張りたい気持ちは、もうある。
            <br />
            必要なのは、自分に合った進め方と、
            <br />
            一緒に考えてくれる人かもしれません。
          </p>
          <a href="#approach" className="text-link">
            ENPATHができること
            <ArrowRight size={18} />
          </a>
        </div>
        <ul className="concerns">
          {concerns.map((text, i) => (
            <li key={text}>
              <span>0{i + 1}</span>
              {text}
              <span className="concern-dot" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export function Goals() {
  const goals = [
    [BriefcaseBusiness, "ビジネス英語", "仕事の可能性を広げたい"],
    [BookOpen, "TOEIC®・資格対策", "目標に向けて取り組みたい"],
    [MessagesSquare, "日常英会話", "自分の言葉で話したい"],
    [Plane, "海外生活・留学", "新しい世界に踏み出したい"],
    [Sprout, "英語の学び直し", "もう一度、基礎から始めたい"],
  ] as const;
  return (
    <section className="section goals-section">
      <div className="container">
        <SectionHeading label="YOUR GOALS">
          あなたが英語を学ぶ理由は何ですか？
        </SectionHeading>
        <div className="goals-grid">
          {goals.map(([Icon, title, detail], index) => (
            <a
              href="#roadmap"
              data-roadmap-goal={
                index === 0 ? "business" : index === 1 ? "toeic" : "daily"
              }
              key={title}
            >
              <Icon size={30} strokeWidth={1.4} />
              <h3>{title}</h3>
              <p>{detail}</p>
              <ArrowRight size={18} />
            </a>
          ))}
        </div>
        <p className="goals-note">
          目標は、一つでなくても大丈夫。
          <span>
            固定のコースに当てはめず、あなたの想いに合わせて学習を設計します。
          </span>
        </p>
      </div>
    </section>
  );
}
export function Support() {
  const items = [
    [
      "Goal Setting",
      "目標を、一緒に明確に。",
      "英語を使って何をしたいのか。想いを具体的な目標に変え、学ぶ理由をはっきりさせます。",
    ],
    [
      "Personalized Learning Plan",
      "あなたに合う学習計画。",
      "英語力・期限・生活リズムを踏まえ、取り組む内容と時間を整理。毎日の迷いを減らします。",
    ],
    [
      "Learning Habit Support",
      "続けられる習慣づくり。",
      "忙しい日も含めて学習の進め方を考え、生活の中で無理なく取り組める形を探します。",
    ],
    [
      "Progress Tracking",
      "変化が見える振り返り。",
      "学習量だけでなく、できるようになったことも確認。次に取り組む課題が見えてきます。",
    ],
    [
      "Regular Coaching",
      "一人にしない、伴走。",
      "定期的な対話を通じて悩みや進捗を共有。状況に合わせて計画を見直していきます。",
    ],
  ];
  return (
    <section id="support" className="section support-section">
      <div className="container support-layout">
        <div className="support-intro">
          <SectionHeading label="OUR SUPPORT">
            目標達成まで、
            <br />
            5つのサポート。
          </SectionHeading>
          <div className="support-photo">
            <Photo decorative={false} />
            <span>YOUR PARTNER, EVERY STEP.</span>
          </div>
          <p className="image-disclosure">
            写真はイメージです。実際の担当コーチではありません。
          </p>
        </div>
        <div className="support-list">
          {items.map(([en, title, text], i) => (
            <article key={en}>
              <span className="support-number">0{i + 1}</span>
              <div>
                <span className="support-en">{en}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Comparison() {
  return (
    <section className="section comparison-section">
      <div className="container">
        <SectionHeading label="WHY ENPATH">
          英語を学ぶ方法だけでなく、
          <br />
          学び続ける仕組みを。
        </SectionHeading>
        <p className="body-copy">
          学び方には、それぞれの良さがあります。
          <br />
          ENPATHが大切にするのは、日々の学習を設計し、続けられるよう支えること。
        </p>
        <div
          className="table-scroll"
          role="region"
          aria-label="学習方法の比較"
          tabIndex={0}
        >
          <table className="comparison-table">
            <caption className="sr-only">
              独学、一般的な英会話レッスン、ENPATHの役割の違い
            </caption>
            <thead>
              <tr>
                <th scope="col">大切にすること</th>
                <th scope="col">独学</th>
                <th scope="col">一般的な英会話レッスン</th>
                <th scope="col">
                  ENPATH<span>英語コーチング</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "主な役割",
                  "自分のペースで学ぶ",
                  "英語を使う・教わる",
                  "学習を設計し、継続を支える",
                ],
                [
                  "学習内容の決め方",
                  "自分で選ぶ",
                  "教材・レッスンに沿って学ぶ",
                  "目標と現在地から一緒に考える",
                ],
                [
                  "レッスン外の学習",
                  "自分で管理する",
                  "サービスによって異なる",
                  "日々の計画と習慣づくりを支援",
                ],
                [
                  "進捗の振り返り",
                  "自分で確認する",
                  "サービスによって異なる",
                  "コーチと確認し、計画を見直す",
                ],
              ].map(([label, ...values]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {values.map((value, i) => (
                    <td key={value}>
                      {i === 2 && <Check size={15} />}
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="sample-note">
          ※一般的な傾向を整理したものです。英会話サービスの支援内容は提供者やプランによって異なります。
        </p>
      </div>
    </section>
  );
}
export function Process() {
  const steps = [
    [
      "無料カウンセリング",
      "今の悩みと、これからの目標をお聞かせください。",
      "あなた × コーチ",
    ],
    [
      "現状分析",
      "英語力と学習経験を確認し、出発点を整理します。",
      "コーチと確認",
    ],
    [
      "目標・学習計画の設定",
      "期限や生活リズムに合わせて、道筋を具体化します。",
      "一緒に設計",
    ],
    [
      "コーチング開始",
      "日々の学習へ。つまずいた時も一緒に考えます。",
      "あなたの実践を支援",
    ],
    [
      "進捗確認と改善",
      "対話を通じて振り返り、次の一歩を見直します。",
      "コーチと振り返り",
    ],
  ];
  return (
    <section className="section process-section">
      <div className="container">
        <SectionHeading label="HOW IT WORKS">ENPATHの始め方</SectionHeading>
        <ol className="process-list">
          {steps.map(([title, text, people], i) => (
            <li key={title}>
              <span className="process-index">
                STEP <b>0{i + 1}</b>
              </span>
              <span className="process-people">
                {i === 3 ? <UserRound size={24} /> : <UsersRound size={24} />}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <small>{people}</small>
            </li>
          ))}
        </ol>
        <div className="process-cta">
          <p>まだ、目標がはっきりしていなくても大丈夫です。</p>
          <BookingLink />
        </div>
      </div>
    </section>
  );
}
