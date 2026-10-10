import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { BookingLink } from "@/components/BookingLink";
import { FloatingTexts } from "@/components/FloatingTexts";
import { SectionHeading } from "@/components/SectionHeading";
import { TextbookGuide } from "@/components/TextbookGuide";
import { siteUrl } from "@/lib/config";
import "./textbooks.css";

const description =
  "ENPATHは、数ある英語教材の中から、あなたの目的とレベルに合う教材をプロが選定。いつ・どこまで・どう進めるかまで具体的に落とし込みます。";
export const metadata = {
  title: "教材選定｜あなたの一冊を、プロが選ぶ",
  description,
  alternates: { canonical: siteUrl ? new URL("/textbooks", siteUrl).href : null },
};

const pains = [
  ["書店やネットで、どれを選べばいいか分からない。", "レベルも目的もばらばらな教材が、無数に並んでいる。"],
  ["買ったのに、最後まで終わらない。", "難しすぎた、量が多すぎた。理由が分からないまま積まれていく。"],
  ["やっているのに、力がついている実感がない。", "どの順で、どこまでやれば良いのかが決まっていない。"],
];

const steps = [
  ["01", "Listening", "目的とレベルを伺う", "英語を使う場面、期限、現在の英語力、使える時間をカウンセリングで確認します。"],
  ["02", "Selection", "プロが教材を選定", "数多くの教材の中から、あなたの目的とレベルに合うものをコーチが絞り込みます。多ければ良いわけではなく、まず1〜3冊に。"],
  ["03", "Design", "使い方まで落とし込む", "いつ・どこで・どこまで・どうやるか。週単位の計画に教材の範囲を割り当て、進み具合に応じて見直します。"],
];

const criteria = [
  ["目的との一致", "会議、試験、旅行。ゴールで必要な力は変わります。"],
  ["今のレベルとの距離", "少し頑張れば届く難しさ。易しすぎても、難しすぎても続きません。"],
  ["生活の中で続く量", "通勤や夜の15分でも回せる、1回の分量と構成を選びます。"],
];

export default function Textbooks() {
  return (
    <>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <header className="tb-header">
        <Link href="/" className="brand" aria-label="ENPATH ホームへ戻る">
          <Image src="/logo.png" width={180} height={60} alt="ENPATH" priority />
        </Link>
        <BookingLink compact placement="textbooks_header" />
      </header>
      <main id="main" className="tb-page">
        <section className="tb-hero" aria-labelledby="tb-title">
          <FloatingTexts />
          <div className="tb-hero-copy">
            <p className="eyebrow">TEXTBOOK SELECTION</p>
            <h1 id="tb-title">
              数ある教材から、
              <br />
              あなたの一冊を。
            </h1>
            <p className="tb-lead">
              目的とレベルに合う教材を、プロが選定。
              <br />
              使い方や、いつ・どこまでやるかまで、具体的に落とし込みます。
            </p>
            <a className="tb-scroll" href="#why">
              選び方を見る
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="why" className="section">
          <div className="container">
            <SectionHeading label="WHY IT MATTERS">
              英語が続かない原因は、
              <br />
              「教材選び」にあることも。
            </SectionHeading>
            <ul className="tb-pains">
              {pains.map(([a, b]) => (
                <li key={a}>
                  <strong>{a}</strong>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section tb-method">
          <div className="container">
            <SectionHeading label="HOW WE SELECT">
              選ぶだけで終わらせない。
              <br />
              使い方まで、一緒に決める。
            </SectionHeading>
            <ol className="tb-steps">
              {steps.map(([n, en, title, text]) => (
                <li key={n}>
                  <span className="tb-step-n">{n}</span>
                  <span className="support-en">{en}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
            <div className="tb-criteria">
              <h3>選定で見ている3つのポイント</h3>
              <dl>
                {criteria.map(([t, d]) => (
                  <div key={t}>
                    <dt>{t}</dt>
                    <dd>{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="guide" className="section">
          <div className="container">
            <SectionHeading
              label="SAMPLE"
              description="目的を選ぶと、教材の例と、いつ・どこまで・どう進めるかのイメージを確認できます。"
            >
              目的別に見る、
              <br />
              教材と進め方の例。
            </SectionHeading>
            <TextbookGuide />
            <p className="sample-note">
              ※ 掲載は説明用のサンプルです。実際の教材と進め方は、カウンセリングで伺う目的・レベル・生活リズムに応じて個別に決定します。特定の教材の購入を条件とするものではなく、成果を保証するものでもありません。書影は教材の例示であり、各書籍の著作権・商標は各権利者に帰属します。
            </p>
          </div>
        </section>

        <section className="tb-cta">
          <div className="container">
            <p className="eyebrow">FREE COUNSELING</p>
            <h2>
              あなたに合う一冊は、
              <br />
              どんな本でしょう。
            </h2>
            <p>まずは無料カウンセリングで、目的と現在地をお聞かせください。</p>
            <BookingLink light placement="textbooks_footer" />
          </div>
        </section>
      </main>
      <footer className="tb-footer">
        <Link href="/">ENPATH トップへ</Link>
        <Link href="/privacy">プライバシーポリシー</Link>
        <Link href="/legal">運営者情報・サービス条件</Link>
      </footer>
    </>
  );
}
