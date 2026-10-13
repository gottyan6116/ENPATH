import Image from "next/image";
import { ArrowRight, BookOpen, BriefcaseBusiness, MessagesSquare, Plane, Sprout } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { JournalReveal } from "@/components/journal/JournalReveal";
import s from "./goals.module.css";

const goals = [
  { key: "business", Icon: BriefcaseBusiness, title: "ビジネス英語", detail: "仕事の可能性を広げたい", alt: "明るいオフィスで、前を見つめるネイビーのジャケットの女性", goal: "business" },
  { key: "toeic", Icon: BookOpen, title: "TOEIC®・資格対策", detail: "目標に向けて取り組みたい", alt: "TOEICの問題集とペン、コーヒーが置かれた明るい学習机", goal: "toeic" },
  { key: "daily", Icon: MessagesSquare, title: "日常英会話", detail: "自分の言葉で話したい", alt: "カフェで相手と楽しそうに会話する女性", goal: "daily" },
  { key: "abroad", Icon: Plane, title: "海外生活・留学", detail: "新しい世界に踏み出したい", alt: "ヨーロッパの街並みで、リュックを背負い遠くを見つめる男性", goal: undefined },
  { key: "relearn", Icon: Sprout, title: "英語の学び直し", detail: "もう一度、基礎から始めたい", alt: "明るい部屋で、ノートに書きながら学ぶ女性", goal: undefined },
] as const;

/** YOUR GOALS — photo cards (proposal A). Same five links/attributes as before; no new destinations. */
export function GoalsSection() {
  return (
    <section className={`section goals-section ${s.section}`} aria-labelledby="goals-title">
      <div className={`container ${s.wrap}`}>
        <SectionHeading label="YOUR GOALS">
          <span id="goals-title">あなたが英語を学ぶ理由は何ですか？</span>
        </SectionHeading>
        <p className={s.lead}>
          目指す未来は、人それぞれ。
          <br />
          ENPATHは、あなたの目標から学習の道筋を設計します。
        </p>
        <JournalReveal className={s.grid}>
          {goals.map(({ key, Icon, title, detail, alt, goal }, i) => (
            <a
              key={key}
              href="#roadmap"
              {...(goal ? { "data-roadmap-goal": goal } : {})}
              className={`${s.card} ${i === 4 ? s.wide : ""}`}
            >
              <span className={s.photo}>
                <Image
                  src={`/images/goals/${key}.webp`}
                  alt={alt}
                  width={1000}
                  height={750}
                  sizes={i === 4 ? "(max-width: 760px) 44vw, 34vw" : "(max-width: 760px) 46vw, 40vw"}
                  quality={80}
                />
                <span className={s.badge}>
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </span>
              <span className={s.body}>
                <span className={s.titleRow}>
                  <h3>{title}</h3>
                  <ArrowRight size={18} aria-hidden="true" className={s.arrow} />
                </span>
                <span className={s.detail}>{detail}</span>
              </span>
            </a>
          ))}
        </JournalReveal>
        <p className={s.note}>
          目標は、一つでなくても大丈夫。
          <span>固定のコースに当てはめず、あなたの想いに合わせて学習を設計します。</span>
        </p>
      </div>
    </section>
  );
}
