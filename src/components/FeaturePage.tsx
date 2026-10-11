import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BookingLink } from "./BookingLink";
import { FeatureExplorer } from "./FeatureExplorer";
import { FeatureComparison } from "./FeatureComparison";
import { BridgeSection } from "./BridgeSection";
import { Roadmap } from "./Roadmap";
import { featureDetails, type FeatureKey } from "@/content/features";
import { siteUrl } from "@/lib/config";

export function featureMetadata(key: FeatureKey) {
  const data = featureDetails[key];
  const path = key === "overview" ? "/features" : `/features/${key}`;
  return {
    title: data.label,
    description: data.lead,
    alternates: { canonical: siteUrl ? new URL(path, siteUrl).href : null },
    openGraph: {
      title: `${data.label} | ENPATH`,
      description: data.lead,
      ...(siteUrl ? { url: new URL(path, siteUrl).href } : {}),
    },
    twitter: { title: `${data.label} | ENPATH`, description: data.lead },
  };
}

export function FeaturePage({ page }: { page: FeatureKey }) {
  const data = featureDetails[page];
  return (
    <>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <div id="top" />
      <Header />
      <main id="main" className={`feature-page feature-page-${page}`}>
        <section className="feature-hero">
          <div className="container">
            <nav aria-label="パンくずリスト" className="feature-breadcrumb">
              <Link href="/">ホーム</Link>
              <span>/</span>
              {page !== "overview" && (
                <>
                  <Link href="/features">ENPATHの特徴</Link>
                  <span>/</span>
                </>
              )}
              <span aria-current="page">{data.label}</span>
            </nav>
            <div className="feature-hero-layout">
              <div>
                <p className="feature-label">{data.label}</p>
                <h1>
                  {data.title.split("\n").map((line, i) => (
                    <span key={line}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h1>
              </div>
              <div className="feature-hero-aside">
                <p>{data.lead}</p>
                <a href="#understand" className="text-link">
                  詳しく見る <ArrowDown size={19} />
                </a>
              </div>
            </div>
            <ol
              className="feature-overview-steps"
              aria-label="このページでわかること"
            >
              {data.steps.map(([title], index) => (
                <li key={title}>
                  <a href={`#detail-${index}`}>
                    <span>0{index + 1}</span>
                    {title}
                    <ArrowRight size={15} />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>
        {page === "overview" ? (
          <>
            <FeatureComparison />
            <BridgeSection />
          </>
        ) : (
          <section id="understand" className="feature-intro container">
            <h2>{data.question}</h2>
            <p>{data.answer}</p>
          </section>
        )}
        <section className="feature-method container">
          <h2>{data.stepsTitle}</h2>
          <ol>
            {data.steps.map(([title, description], i) => (
              <li id={`detail-${i}`} key={title}>
                <span className="feature-step-number">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="feature-note">{data.note}</p>
        </section>
        {page === "learning-plan" && <Roadmap />}
        {page === "support" && (
          <section className="feature-example">
            <div className="container">
              <p className="feature-label">見直しの例</p>
              <h2>「毎晩30分」が難しかったら。</h2>
              <div>
                <p>
                  <strong>振り返る</strong>帰宅が遅く、夜は集中できなかった。
                </p>
                <ArrowRight aria-hidden="true" />
                <p>
                  <strong>次の一歩</strong>
                  通勤中の10分に聞く練習、休日にまとめて復習。時間帯と量を組み替える。
                </p>
              </div>
              <small>
                説明用の例です。生活と目標に合わせて取り組み方を考えます。
              </small>
            </div>
          </section>
        )}
        {page === "counseling" && (
          <section className="feature-example">
            <div className="container">
              <h2>準備は、わかる範囲で大丈夫。</h2>
              <p>
                英語を使いたい場面、普段使っている教材、学習できそうな時間。思いつくことをメモしておくと、ご相談が具体的になります。スコアや明確な目標がなくても、現在のお悩みをお聞かせください。
              </p>
            </div>
          </section>
        )}
        <FeatureExplorer related={data.related} />
        <section className="feature-cta">
          <div className="container">
            <h2>
              あなたの場合は、
              <br />
              どこから始めましょう。
            </h2>
            <p>目標も、悩みも、今の生活も。まずはお聞かせください。</p>
            <BookingLink light placement={`feature_${page}`} />
            <small>
              Googleフォームが開きます。日程はお申し込み後の案内をご確認ください。
            </small>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
