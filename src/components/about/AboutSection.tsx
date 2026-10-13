import Image from "next/image";
import { ArrowRight, Brain, Clock, Flag, TrendingUp, UserRound } from "lucide-react";
import { JournalReveal } from "@/components/journal/JournalReveal";
import "@fontsource-variable/noto-serif-jp";
import s from "./about.module.css";

const concerns = [
  { Icon: Brain, title: "何から勉強すればよいかわからない", sub: "情報が多すぎて、何を優先すればよいか判断できない。" },
  { Icon: UserRound, title: "自分に合った学習方法がわからない", sub: "独学が続かず、今のやり方で良いのか自信がない。" },
  { Icon: Clock, title: "やる気はあるのに、なかなか続かない", sub: "忙しくて中断が続けば、三日坊主になってしまう。" },
  { Icon: TrendingUp, title: "勉強していても、成長を実感できない", sub: "努力しているのに、なかなか成果が見えない。" },
  { Icon: Flag, title: "目標までの道筋が、まだ見えない", sub: "いつまでに、どのレベルを目指せばよいのか分からない。" },
];

const img = (name: string) => `/images/about/${name}.webp`;

/** #about — "FIND YOUR STARTING POINT" (proposal C: Before / After). Text stays real HTML. */
export function AboutSection() {
  return (
    <section id="about" className={`section ${s.section}`} aria-labelledby="about-title">
      <div className={s.wrap}>
        <div className={s.title}>
          <p className={s.eyebrow}>FIND YOUR STARTING POINT</p>
          <h2 id="about-title">
            英語学習、こんな悩みは
            <br />
            ありませんか？
          </h2>
          <p className={s.lead}>
            頑張りたい気持ちは、もうある。
            <br />
            必要なのは、自分に合った進め方と、
            <br />
            一緒に考えてくれる人かもしれません。
          </p>
        </div>

        <div className={s.stage}>
          <div className={s.before} aria-hidden="true" />
          <div className={s.after} aria-hidden="true" />

          <Image className={`${s.pic} ${s.beforeWoman}`} src={img("before-woman")} alt="学習に行き詰まり、頭を抱えてノートに向かう女性" width={900} height={995} sizes="(max-width: 760px) 46vw, 26vw" />
          <Image className={`${s.pic} ${s.afterWoman}`} src={img("after-woman")} alt="ペンを手に、前向きな表情で遠くを見つめる女性" width={900} height={1051} sizes="(max-width: 760px) 52vw, 28vw" />

          <Image className={`${s.pic} ${s.b1}`} src={img("bubble-1")} alt="何からやれば…" width={700} height={341} sizes="20vw" />
          <Image className={`${s.pic} ${s.b2}`} src={img("bubble-2")} alt="これで合ってる？" width={700} height={298} sizes="20vw" />
          <Image className={`${s.pic} ${s.b3}`} src={img("bubble-3")} alt="成長してるのかな…" width={700} height={298} sizes="20vw" />
          <Image className={`${s.pic} ${s.b4}`} src={img("bubble-4")} alt="もう一度やり直したい…" width={700} height={282} sizes="20vw" />

          <Image className={`${s.pic} ${s.arrow}`} src={img("arrow")} alt="" width={800} height={198} sizes="14vw" aria-hidden="true" />
          <Image className={`${s.pic} ${s.labelBefore}`} src={img("label-before")} alt="Before" width={600} height={178} sizes="12vw" />
          <Image className={`${s.pic} ${s.labelAfter}`} src={img("label-after")} alt="After" width={600} height={212} sizes="12vw" />
          <Image className={`${s.pic} ${s.hand}`} src={img("handwriting")} alt="自分に合った学び方で、前に進める。" width={900} height={565} sizes="(max-width: 760px) 38vw, 24vw" />
        </div>

        <div role="list" aria-label="英語学習でよくある5つの悩み">
        <JournalReveal className={s.bubbles}>
          {concerns.map(({ Icon, title, sub }) => (
            <div role="listitem" key={title} className={s.bubble}>
              <span className={s.bubbleIcon}>
                <Icon size={30} strokeWidth={1.4} aria-hidden="true" />
              </span>
              <span className={s.bubbleText}>
                <strong>{title}</strong>
                <span>{sub}</span>
              </span>
            </div>
          ))}
        </JournalReveal>
        </div>

        <JournalReveal className={s.message}>
          <p>
            悩みも、目指す未来も、<wbr />一人ひとり違うから。
            <span>ENPATHが、あなたに合った学び方を一緒に考えます。</span>
          </p>
          <Image className={s.thinker} src={img("thinker")} alt="" width={700} height={673} sizes="(max-width: 760px) 28vw, 18vw" aria-hidden="true" />
        </JournalReveal>

        <a href="#approach" className={s.more}>
          ENPATHができること
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
