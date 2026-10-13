import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featureLinks } from "@/content/features";
import { JournalReveal } from "@/components/journal/JournalReveal";
import "@fontsource-variable/noto-serif-jp";
import s from "./explore.module.css";

/** Question per card, in the same order as `featureLinks` (hrefs stay owned by that list). */
const cards = [
  { key: "features", question: "英会話スクールや\n独学と何が違う？", link: "ENPATHの特徴を知る", w: 499, h: 600, tone: "mint" },
  { key: "textbooks", question: "自分に合う\n教材はどう選ぶ？", link: "あなたに合った教材選びを見る", w: 473, h: 640, tone: "cream" },
  { key: "steps", question: "どんな順序で\n英語を学ぶ？", link: "英会話習得までのステップを見る", w: 485, h: 603, tone: "mint" },
  { key: "plan", question: "毎日どんな勉強をする？", link: "オーダーメイドの学習計画を見る", w: 515, h: 640, tone: "cream" },
  { key: "support", question: "途中で続かなくなったら？", link: "続けられる学習サポートを見る", w: 470, h: 621, tone: "mint" },
  { key: "counseling", question: "申し込む前に\n何を相談できる？", link: "無料カウンセリングの流れを見る", w: 706, h: 640, tone: "cream" },
] as const;

/** Home-only "EXPLORE ENPATH" (question-lead cards). Sub-pages keep using FeatureExplorer. */
export function ExploreSection() {
  return (
    <section className={`section ${s.section}`} aria-labelledby="explore-title">
      <div className={`container ${s.wrap}`}>
        <p className={s.eyebrow}>EXPLORE ENPATH</p>
        <h2 id="explore-title">あなたが知りたいことから、ENPATHを。</h2>
        <p className={s.lead}>気になるテーマから、ENPATHの学び方を知ることができます。</p>
        <JournalReveal className={s.grid}>
          {cards.map((c, i) => (
            <Link key={c.key} href={featureLinks[i].href} className={`${s.card} ${c.tone === "mint" ? s.mint : s.cream}`}>
              <span className={s.figure}>
                <Image src={`/images/explore/${c.key}.webp`} alt="" width={c.w} height={c.h} sizes="(max-width: 760px) 90px, 150px" aria-hidden="true" />
              </span>
              <span className={s.body}>
                <strong>{c.question}</strong>
                <span className={s.link}>
                  <span>{c.link}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </JournalReveal>
      </div>
    </section>
  );
}
