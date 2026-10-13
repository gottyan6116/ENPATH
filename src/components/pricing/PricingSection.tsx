import Image from "next/image";
import { BarChart3, Check, FileText, Lightbulb, MessageCircle, BookOpen } from "lucide-react";
import { BookingLink } from "@/components/BookingLink";
import { JournalReveal } from "@/components/journal/JournalReveal";
import "@fontsource-variable/noto-serif-jp";
import s from "./pricing.module.css";

const steps = [
  { no: "01", title: "コンサルティング", sub: ["現状分析・目標設定"], icon: "icon-consulting", w: 846, h: 850, pos: s.s1, alt: "分析グラフのアイコン" },
  { no: "02", title: "個別学習計画", sub: ["目標から逆算した", "あなただけの計画"], icon: "icon-plan", w: 793, h: 797, pos: s.s2, alt: "ドキュメントのアイコン" },
  { no: "03", title: "日々の学習", sub: ["テキスト選定・", "学習方法の指導"], icon: "icon-learning", w: 738, h: 741, pos: s.s3, alt: "開いた本のアイコン" },
  { no: "04", title: "週1回の振り返り", sub: ["進捗確認・ティーチング"], icon: "icon-coaching", w: 1022, h: 1021, pos: s.s4, alt: "コーチと受講者のアイコン" },
] as const;

const recommended = [
  "英語でのプレゼンや会議に自信をつけたい",
  "海外赴任・海外出張に向けて集中的に準備したい",
  "独学での英語学習に限界を感じている",
  "仕事と両立しながら、効率的に英語力を伸ばしたい",
  "目標から逆算した学習戦略で、着実に取り組みたい",
];

const included = [
  { icon: MessageCircle, text: "コンサルティング（現状分析・目標設定）" },
  { icon: FileText, text: "個別学習計画" },
  { icon: BookOpen, text: "テキスト選定" },
  { icon: Lightbulb, text: "学習方法の指導" },
  { icon: BarChart3, text: "週1回の振り返り（ティーチング含む）" },
];

export function PricingSection() {
  return (
    <section id="pricing" className={s.section} aria-labelledby="pricing-title">
      <div className={s.wrap}>
        <header className={s.head}>
          <p className={s.eyebrow}>PRICE</p>
          <h2 id="pricing-title">目標から逆算した、ひとつのコーチングプラン。</h2>
          <p>
            ENPATHは、コンサルティング・学習計画・日々の学習・定期的な振り返りを
            <br className={s.pcBreak} />
            一貫してサポートする、パーソナル英語コーチングです。
          </p>
        </header>

        <div className={s.grid}>
          <div className={s.cycle}>
            <Image
              src="/images/pricing/desk.webp"
              alt=""
              fill
              sizes="(max-width: 1000px) 100vw, 56vw"
              quality={82}
              className={s.cycleBg}
            />
            <div className={s.cycleShade} aria-hidden="true" />
            <div className={s.cycleHead}>
              <p className={s.cycleLabel}>
                <i aria-hidden="true" />
                ENPATHのサポートサイクル
              </p>
              <h3>
                戦略から実践まで、
                <br />
                担当コーチが一貫して伴走します。
              </h3>
            </div>
            <div className={s.ring} aria-hidden="true">
              <Image src="/images/pricing/ring.webp" alt="" width={929} height={839} sizes="40vw" />
            </div>
            <div className={s.center}>
              <strong>ENPATH</strong>
              <span>
                続けられる仕組みを、
                <br />
                一人ひとりに。
              </span>
            </div>
            <ol className={s.steps}>
              {steps.map((st) => (
                <li key={st.no} className={`${s.step} ${st.pos}`}>
                  <Image src={`/images/pricing/${st.icon}.webp`} alt="" width={st.w} height={st.h} sizes="64px" />
                  <div>
                    <strong>
                      <span className="sr-only">STEP {st.no}：</span>
                      {st.title}
                    </strong>
                    <small>
                      {st.sub.map((line, i) => (
                        <span key={line}>
                          {line}
                          {i < st.sub.length - 1 && <br className={s.pcBreak} />}
                        </span>
                      ))}
                    </small>
                  </div>
                  <em aria-hidden="true">{st.no}</em>
                </li>
              ))}
            </ol>
          </div>

          <div className={s.side}>
            <div className={s.recommend}>
              <h3>こんな方におすすめ</h3>
              <ul>
                {recommended.map((t) => (
                  <li key={t}>
                    <span className={s.check} aria-hidden="true">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.plan}>
              <p className={s.planLabel}>
                ENPATHの基本プラン
                <i aria-hidden="true" />
              </p>
              <h3>パーソナル英語コーチング</h3>
              <p className={s.planText}>
                担当コーチが、あなたの目標達成に向けて学習計画の設計から日々の実践・振り返りまでサポートします。
              </p>
              <dl className={s.prices}>
                <div>
                  <dt>入会金</dt>
                  <dd>
                    <b>5,000</b>
                    <span>円</span>
                  </dd>
                </div>
                <div>
                  <dt>受講料（1ヶ月）</dt>
                  <dd>
                    <b>20,000</b>
                    <span>円</span>
                  </dd>
                </div>
              </dl>
              <p className={s.includedLabel}>含まれるサポート内容</p>
              <JournalReveal className={s.included}>
                {included.map(({ icon: Icon, text }) => (
                  <div key={text}>
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                    <span>{text}</span>
                  </div>
                ))}
              </JournalReveal>
              <div className={s.cta}>
                <BookingLink placement="pricing" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
