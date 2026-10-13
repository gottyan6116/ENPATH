import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingLink } from "@/components/BookingLink";
import { FeatureExplorer } from "@/components/FeatureExplorer";
import { Roadmap } from "@/components/Roadmap";
import { JournalReveal } from "@/components/journal/JournalReveal";
import { busyWeek, categoryLabel, menus, normalWeek, scenes, slots, week, type Category } from "./plan-data";
import "@fontsource-variable/noto-serif-jp";
import s from "./plan.module.css";

const img = (n: string) => `/images/plan/${n}.webp`;
const total = (items: { durationMinutes: number }[]) => items.reduce((sum, i) => sum + i.durationMinutes, 0);
const cat: Record<Category, string> = { vocab: s.cVocab, listening: s.cListening, grammar: s.cGrammar, speaking: s.cSpeaking, review: s.cReview };

function Bars({ data }: { data: typeof normalWeek }) {
  const sum = data.bars.reduce((t, b) => t + b.minutes, 0);
  return (
    <div className={s.barWrap}>
      <div className={s.bar} role="img" aria-label={`${data.title}：${data.bars.map((b) => `${categoryLabel[b.category]} ${b.minutes}分`).join("、")}`}>
        {data.bars.map((b) => (
          <span key={b.category} className={cat[b.category]} style={{ flexGrow: b.minutes }} />
        ))}
      </div>
      <ul className={s.legend}>
        {data.bars.map((b) => (
          <li key={b.category}>
            <i className={cat[b.category]} aria-hidden="true" />
            {categoryLabel[b.category]}
            <b>{b.minutes}分</b>
          </li>
        ))}
        <li className={s.sum}>合計 {sum}分</li>
      </ul>
    </div>
  );
}

export function PlanPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <div id="top" />
      <Header />
      <main id="main" className={s.page}>
        {/* 01 Hero (no CTA in the first view; the header keeps its booking button) */}
        <section className={s.hero} aria-labelledby="plan-title">
          <Image className={s.heroImg} src={img("hero")} alt="明るい部屋で、ペンを手に学習について考える女性" fill priority sizes="100vw" />
          <div className={s.heroVeil} aria-hidden="true" />
          <div className={`container ${s.heroText}`}>
            <nav aria-label="パンくずリスト" className={s.crumb}>
              <Link href="/">ホーム</Link>
              <span>/</span>
              <Link href="/features">ENPATHの特徴</Link>
              <span>/</span>
              <span aria-current="page">オーダーメイドの学習計画</span>
            </nav>
            <p className={s.eyebrow}>YOUR PERSONAL LEARNING PLAN</p>
            <h1 id="plan-title">
              日々の生活の中に、
              <br />
              英語がある。
              <br />
              それが、続く力になる。
            </h1>
            <p className={s.heroLead}>
              あなたの目標・現在地・生活スタイルに合わせて、
              <br />
              無理なく続けられる学習計画を一緒に設計します。
            </p>
          </div>
          <a href="#day" className={s.scroll}>
            SCROLL TO EXPLORE
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </section>

        {/* 02 A day with ENPATH */}
        <section id="day" className={s.section} aria-labelledby="day-title">
          <div className={`container ${s.wrap}`}>
            <div className={s.head}>
              <p className={s.label}>A DAY WITH ENPATH</p>
              <h2 id="day-title">こんな一日の中に、英語学習を組み込めます。</h2>
              <p className={s.lead}>
                忙しい日々の中でも、学習に使える時間は一人ひとり異なります。
                <br />
                ENPATHでは、あなたの生活に合わせて学習時間と内容を設計します。
              </p>
            </div>
            <JournalReveal className={s.scenes}>
              {scenes.map((sc, i) => (
                <div key={sc.id} className={s.scene}>
                  <div className={s.sceneTime}>
                    <span className={s.sceneNo}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{sc.time}</span>
                  </div>
                  <div className={s.sceneText}>
                    <h3>{sc.title}</h3>
                    <p>{sc.activity}</p>
                  </div>
                  <div className={s.scenePhoto}>
                    <Image src={img(sc.image)} alt={sc.alt} width={1448} height={1086} sizes="(max-width: 760px) 96px, 15vw" />
                  </div>
                  {i < scenes.length - 1 && <ArrowRight size={18} className={s.sceneArrow} aria-hidden="true" />}
                </div>
              ))}
            </JournalReveal>
            <p className={s.note}>※生活場面の例です。5つすべてを毎日行うことを前提にしたものではありません。</p>
          </div>
        </section>

        {/* 03 Plan example */}
        <section className={`${s.section} ${s.tint}`} aria-labelledby="week-title">
          <div className={`container ${s.wrap}`}>
            <div className={s.head}>
              <p className={s.label}>PLAN EXAMPLE</p>
              <h2 id="week-title">1週間の学習スケジュール例</h2>
              <p className={s.lead}>目標から逆算した学習内容を、毎日のスケジュールに落とし込みます。</p>
              <p className={s.sample}>サンプル｜目標：ビジネス英語　1日45分（説明用の仮定）</p>
            </div>
            <JournalReveal className={s.week}>
              <div className={s.slotCol} aria-hidden="true">
                <span />
                {slots.map((sl) => (
                  <span key={sl}>{sl}</span>
                ))}
              </div>
              {week.map((d) => (
                <div key={d.day} className={s.day}>
                  <h3>
                    <span>{d.day}</span>
                    <small>{total(d.activities)}分</small>
                  </h3>
                  <ul>
                    {slots.map((sl) => {
                      const act = d.activities.find((x) => x.slot === sl);
                      return act ? (
                        <li key={sl} className={`${s.cell} ${cat[act.category]}`}>
                          <em>{sl}</em>
                          <span>{act.title}</span>
                          <b>{act.durationMinutes}分</b>
                        </li>
                      ) : (
                        <li key={sl} className={s.empty} aria-hidden="true" />
                      );
                    })}
                  </ul>
                </div>
              ))}
            </JournalReveal>
            <p className={s.note}>
              ※学習計画のサンプルです。1日45分は説明用の仮定で、すべての受講生に共通する必須の学習時間ではありません。実際の内容・量・時間帯は、目標や生活に合わせて個別に決め、週1回の振り返りで見直します。
            </p>
          </div>
        </section>

        {/* 04 Adjustment */}
        <section className={s.section} aria-labelledby="adjust-title">
          <div className={`container ${s.wrap}`}>
            <div className={s.head}>
              <p className={s.label}>PLAN ADJUSTMENT</p>
              <h2 id="adjust-title">忙しい週も、計画を柔軟に調整できます。</h2>
              <p className={s.lead}>生活の変化に合わせて、学習の量・内容・優先順位を見直します。</p>
            </div>
            <JournalReveal className={s.compare}>
              <article className={s.state}>
                <p className={s.stateLabel}>{normalWeek.label}</p>
                <h3>{normalWeek.title}</h3>
                <p>{normalWeek.text}</p>
                <Bars data={normalWeek} />
              </article>
              <div className={s.shift} aria-hidden="true">
                <ArrowRight size={22} />
                <span>計画を調整</span>
              </div>
              <article className={`${s.state} ${s.stateBusy}`}>
                <p className={s.stateLabel}>{busyWeek.label}</p>
                <h3>{busyWeek.title}</h3>
                <p>{busyWeek.text}</p>
                <Bars data={busyWeek} />
              </article>
            </JournalReveal>
            <p className={s.adjustNote}>学習時間が減る週は、優先する内容を絞り、目標時期や進め方もあわせて見直します。時間を減らしても同じ成果が得られることを示すものではありません。</p>
            <p className={s.note}>※上記は学習計画の調整例です。実際の計画は目標や学習状況に応じて検討します。</p>
          </div>
        </section>

        {/* 05 Learning menu */}
        <section className={`${s.section} ${s.tint}`} aria-labelledby="menu-title">
          <div className={`container ${s.wrap}`}>
            <div className={s.head}>
              <p className={s.label}>LEARNING MENU</p>
              <h2 id="menu-title">目的別の学習計画例</h2>
              <p className={s.lead}>目指すゴールによって、優先すべき学習内容は異なります。</p>
            </div>
            <JournalReveal className={s.menus}>
              {menus.map((m) => (
                <article key={m.no} className={s.menu}>
                  <div className={s.menuPhoto}>
                    <Image src={img(m.image)} alt={m.alt} width={1448} height={1086} sizes="(max-width: 760px) 92vw, 30vw" />
                  </div>
                  <div className={s.menuBody}>
                    <span className={s.menuNo}>{m.no}</span>
                    <h3>{m.title}</h3>
                    <p className={s.menuGoal}>{m.goal}</p>
                    <p>{m.text}</p>
                  </div>
                </article>
              ))}
            </JournalReveal>
            <p className={s.note}>※3つは別々のプランではなく、ENPATHの1つのコーチングプランの中で扱う学習目的の例です。</p>
          </div>
        </section>

        <Roadmap />
        <FeatureExplorer related={[1, 4]} />
        <section className="feature-cta">
          <div className="container">
            <h2>あなたに合った学習計画を、一緒に。</h2>
            <p>目標も、悩みも、今の生活も。まずはお聞かせください。</p>
            <BookingLink light placement="feature_learning-plan" />
            <small>Googleフォームが開きます。日程はお申し込み後の案内をご確認ください。</small>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
