import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AudioLines, BookOpen, CalendarCheck, ChartColumn, Ear, FileText, Lightbulb, MessageCircle, MessagesSquare, RefreshCw, Target } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JournalReveal } from "@/components/journal/JournalReveal";
import { StepsCta } from "./StepsCta";
import "@fontsource-variable/noto-serif-jp";
import s from "./steps.module.css";

const img = (n: string) => `/images/steps/${n}.webp`;

/** The five workings of language use: ENPATH's own conceptual summary, not a fixed learning order. */
const flow = [
  { Icon: Ear, title: "音を聞き取る", text: "英語の音を認識し、言葉として聞き取る力。" },
  { Icon: MessageCircle, title: "意味を理解する", text: "聞いた英語の意味を理解する力。" },
  { Icon: Lightbulb, title: "伝えたいことを整理する", text: "自分の考えや気持ちを整理する力。" },
  { Icon: FileText, title: "英語に組み立てる", text: "適切な語彙・文法・表現を使って英語にする力。" },
  { Icon: AudioLines, title: "口に出して使う", text: "英語を発話し、実際のコミュニケーションで使う力。" },
];

const goals = [
  {
    key: "business",
    category: "ビジネス英語",
    goal: "仕事で自信を持って英語を使いたい",
    heading: "重点的に取り組むプロセス例",
    items: ["03｜伝えたいことを整理する", "04｜英語に組み立てる", "05｜口に出して使う"],
    img: "goal-business",
    alt: "窓辺で考えを巡らせながらノートPCに向かうスーツ姿の男性",
    href: "/features/learning-plan",
    cta: "学習計画の考え方を見る",
  },
  {
    key: "toeic",
    category: "TOEIC・資格対策",
    goal: "スコアを上げてキャリアの選択肢を広げたい",
    heading: "重点的に取り組む内容例",
    items: ["語彙・文法の基礎", "英語を聞き取る力", "英文を読む力と設問への対応"],
    img: "goal-toeic",
    alt: "問題集とノート、ペンが置かれた明るい学習デスク",
    href: "/textbooks",
    cta: "教材選びを見る",
  },
  {
    key: "daily",
    category: "日常英会話",
    goal: "海外旅行や日常で自然に話せるようになりたい",
    heading: "重点的に取り組むプロセス例",
    items: ["01｜音を聞き取る", "02｜意味を理解する", "05｜口に出して使う"],
    img: "goal-daily",
    alt: "カフェのようなテーブルで、笑顔で会話する二人の女性",
    href: "/features/learning-plan",
    cta: "学習計画の考え方を見る",
  },
];

export type CoachingStep = { id: string; title: string; description: string; image: string; alt: string; Icon: typeof Target };
const steps: CoachingStep[] = [
  { id: "01", title: "目標整理", description: "なりたい姿から、学びのゴールを明確にします。", image: "p1", alt: "ノートに目標を書き出す手元", Icon: Target },
  { id: "02", title: "現状分析", description: "今のスキル・知識・課題を丁寧に分析します。", image: "p2", alt: "ノートPCで学習の結果を確認する様子", Icon: ChartColumn },
  { id: "03", title: "学習計画", description: "目標から逆算し、あなたに合った学習計画を設計します。", image: "p3", alt: "スケジュール帳に学習計画を書き込む手元", Icon: CalendarCheck },
  { id: "04", title: "教材選定", description: "目的に最適な教材・コンテンツを選定します。", image: "p4", alt: "机に積まれた英語学習の教材", Icon: BookOpen },
  { id: "05", title: "実践・伴走", description: "学んだ内容を実践し、継続できるよう伴走します。", image: "p5", alt: "オンラインでコーチと話しながら学ぶ女性", Icon: MessagesSquare },
  { id: "06", title: "振り返り・改善", description: "定期的に振り返り、より良い学びの形へ改善します。", image: "p6", alt: "学習の記録をノートに書き込む手元", Icon: RefreshCw },
];

const refs = [
  { text: "Levelt, W. J. M. (1989). Speaking: From Intention to Articulation. MIT Press." },
  {
    text: "Levelt, W. J. M., Roelofs, A., & Meyer, A. S. (1999). A theory of lexical access in speech production. Behavioral and Brain Sciences, 22(1), 1–38.",
    href: "https://doi.org/10.1017/S0140525X99001776",
  },
  {
    text: "Council of Europe (2020). Common European Framework of Reference for Languages: Learning, teaching, assessment – Companion Volume. Council of Europe Publishing.",
    href: "https://www.coe.int/en/web/common-european-framework-reference-languages",
  },
];

export function StepsPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <div id="top" />
      <Header />
      <main id="main" className={s.page}>
        {/* 01 Hero */}
        <section className={s.hero} aria-labelledby="steps-title">
          <div className={`container ${s.heroGrid}`}>
            <nav aria-label="パンくずリスト" className={s.crumb}>
              <Link href="/">ホーム</Link>
              <span>/</span>
              <Link href="/features">ENPATHの特徴</Link>
              <span>/</span>
              <span aria-current="page">英会話習得までのステップ</span>
            </nav>
            <p className={s.eyebrow}>YOUR LEARNING PATH</p>
            <h1 id="steps-title">
              目標が違えば、
              <br />
              学ぶ順番も、方法も違う。
            </h1>
            <p className={s.heroLead}>
              英語を学ぶ目的も、今の英語力も、一人ひとり異なります。
              <br />
              ENPATHでは、現在の課題と目標を整理し、
              <br />
              あなたに必要な学習内容とその順序を一緒に設計します。
            </p>
            <figure className={s.heroPhoto}>
              <Image src={img("hero")} alt="明るい室内で、ペンを手に学習について考える女性" width={1672} height={941} priority sizes="(max-width: 760px) 100vw, 58vw" />
            </figure>
            <div className={s.heroCta}>
              <StepsCta label="無料カウンセリングで相談する" placement="steps_hero" className={s.cta} />
            </div>
          </div>
        </section>

        {/* 02 Learning flow */}
        <section className={s.section} aria-labelledby="flow-title">
          <div className={`container ${s.wrap}`}>
            <div className={s.head}>
              <p className={s.eyebrow}>LEARNING FLOW</p>
              <h2 id="flow-title">英語学習を、5つの働きから理解する</h2>
              <p className={s.lead}>
                英語を理解し、使うためには、いくつもの力が関わっています。
                <br />
                それぞれの働きを理解することで、今の課題や伸ばすべきポイントが見えてきます。
              </p>
            </div>
            <JournalReveal className={s.flow}>
              {flow.map(({ Icon, title, text }, i) => (
                <div key={title} className={`${s.flowItem} ${i % 2 ? s.cream : s.mint}`}>
                  <span className={s.flowIcon}>
                    <Icon size={30} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className={s.flowText}>
                    <span className={s.flowNo}>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </span>
                  {i < flow.length - 1 && <ArrowRight size={18} className={s.flowArrow} aria-hidden="true" />}
                </div>
              ))}
            </JournalReveal>
            <div className={s.base}>
              <BookOpen size={28} strokeWidth={1.4} aria-hidden="true" />
              <div>
                <strong>すべてを支える土台：語彙・文法・発音・表現のストック</strong>
                <span>英語を理解し、使うためには、語彙・文法・音に関する知識なども重要です。</span>
              </div>
            </div>
            <p className={s.note}>
              ※本図は、心理言語学・第二言語習得研究などの考え方を参考に、ENPATHが学習理解のために整理した概念図です。すべての学習者に共通する固定的な学習順序を示すものではありません。
            </p>
          </div>
        </section>

        {/* 03 Goal based */}
        <section className={`${s.section} ${s.tint}`} aria-labelledby="goal-title">
          <div className={`container ${s.wrap}`}>
            <div className={s.head}>
              <p className={s.eyebrow}>GOAL BASED LEARNING</p>
              <h2 id="goal-title">
                同じ英語学習でも、
                <br />
                伸ばす順番は一つではありません。
              </h2>
              <p className={s.lead}>
                目標や現在の英語力によって、重点的に取り組むべき内容や学ぶ順序は異なります。
                <br />
                ここでは代表的な3つの目標の例をご紹介します。
              </p>
            </div>
            <JournalReveal className={s.goals}>
              {goals.map((g) => (
                <article key={g.key} className={s.goalCard}>
                  <div className={s.goalPhoto}>
                    <Image src={img(g.img)} alt={g.alt} width={1448} height={1086} sizes="(max-width: 760px) 92vw, 30vw" />
                  </div>
                  <div className={s.goalBody}>
                    <h3>{g.category}</h3>
                    <p className={s.goalEx}>
                      <small>目標例</small>
                      {g.goal}
                    </p>
                    <p className={s.goalHead}>{g.heading}</p>
                    <ul>
                      {g.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                    <Link href={g.href} className={s.goalLink}>
                      {g.cta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </JournalReveal>
            <p className={s.note}>
              ※各カードの内容は説明用の例です。目標が同じでも、個人の課題によって重点は異なります。TOEICなど試験対策は、試験の測定内容に応じた学習内容を組み合わせます。
            </p>
          </div>
        </section>

        {/* 04 Process */}
        <section className={s.section} aria-labelledby="process-title">
          <div className={`container ${s.wrap}`}>
            <div className={s.head}>
              <p className={s.eyebrow}>ENPATH PROCESS</p>
              <h2 id="process-title">
                ENPATHは、学ぶ順番を
                <br />
                一緒に設計し、続く形まで整えます。
              </h2>
              <p className={s.lead}>一人ひとりの目標と現在地に合わせて、最適な学習計画を作成し、コーチが伴走しながら実践・改善までサポートします。</p>
            </div>
            <JournalReveal className={s.process}>
              {steps.map(({ id, title, description, image, alt, Icon }, i) => (
                <div key={id} className={s.step}>
                  <span className={s.stepNo}>{id}</span>
                  <span className={s.stepIcon}>
                    <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <div className={s.stepText}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <div className={s.stepPhoto}>
                    <Image src={img(image)} alt={alt} width={1448} height={1086} sizes="(max-width: 760px) 104px, 14vw" />
                  </div>
                  {i < steps.length - 1 && <ArrowRight size={16} className={s.stepArrow} aria-hidden="true" />}
                </div>
              ))}
            </JournalReveal>
          </div>
        </section>

        {/* 05 Final CTA */}
        <section className={s.final} aria-labelledby="final-title">
          <div className={`container ${s.finalGrid}`}>
            <div className={s.finalPhoto}>
              <Image src={img("goal-daily")} alt="コーチと向かい合い、笑顔で相談する女性" width={1448} height={1086} sizes="(max-width: 760px) 100vw, 40vw" />
            </div>
            <div className={s.finalText}>
              <h2 id="final-title">一人ひとりに、違う学びの道筋を。</h2>
              <p>
                あなたの目標・現在の英語力・生活スタイルに合わせて、最適な学習計画を一緒に考えます。
                <br />
                まずは無料カウンセリングで、お気軽にご相談ください。
              </p>
              <StepsCta label="無料カウンセリングを予約する" placement="steps_final" className={s.cta} />
            </div>
          </div>
        </section>

        <section className={s.refs} aria-labelledby="refs-title">
          <div>
            <h2 id="refs-title">参考資料</h2>
            <p>
              「5つの働き」の整理は、言語産出の研究などの考え方を参考にENPATHが独自に編集したものです。以下の資料は考え方の背景として参照しており、ENPATHの学習効果を示すものではありません。
            </p>
            <ul>
              {refs.map((r) => (
                <li key={r.text}>
                  {r.text}
                  {r.href && (
                    <>
                      {" "}
                      <a href={r.href} target="_blank" rel="noopener noreferrer">
                        リンク
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
