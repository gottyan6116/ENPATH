import Image from "next/image";
import { BookOpen, Clock3, MessageCircle, UserRound } from "lucide-react";
import styles from "./FeatureComparison.module.css";

const assetRoot = "/images/features/comparison/";
const schoolSteps = [
  {
    title: "予習",
    body: "教材を確認",
    image: "open_book_on_mint_badge",
    alt: "開いた教材のアイコン",
  },
  {
    title: "レッスン",
    body: "英語を話す・学ぶ",
    image: "sage_green_team_badge",
    alt: "グループで学ぶ人のアイコン",
  },
  {
    title: "復習",
    body: "学んだ内容を振り返る",
    image: "mint_checklist_document_icon",
    alt: "復習用チェックリストのアイコン",
  },
];
const enpathSteps = [
  {
    title: "目標設定",
    body: "目的・期限・現状を整理",
    image: "mint_circular_flag_badge",
    alt: "目標を示す旗のアイコン",
  },
  {
    title: "学習計画",
    body: "生活に合わせて個別設計",
    image: "mint_calendar_badge_icon",
    alt: "学習計画のカレンダーのアイコン",
  },
  {
    title: "日々の実践",
    body: "進捗を確認し継続を支援",
    image: "mint_growth_chart_badge",
    alt: "進捗を示すグラフのアイコン",
  },
  {
    title: "振り返り・改善",
    body: "定期面談で計画を見直す",
    image: "sage_circular_refresh_icon",
    alt: "振り返りと改善の循環を示すアイコン",
  },
];
const comparisons = [
  {
    label: "形式",
    icon: MessageCircle,
    school: "対面のグループレッスン",
    enpath: "完全1対1のオンラインコーチング",
  },
  {
    label: "主な提供内容",
    icon: BookOpen,
    school: "英会話レッスン",
    enpath: "学習設計・教材選定・進捗管理・定期面談",
  },
  {
    label: "学習の進め方",
    icon: UserRound,
    school: "教材やレッスンに沿って学ぶ",
    enpath: "一人ひとりの目標・生活に合わせて設計",
  },
  {
    label: "レッスン外の支援",
    icon: Clock3,
    school: "サービス・プランによって異なる",
    enpath: "学習相談・計画の見直し・継続サポート",
  },
];

function Flow({ school = false }: { school?: boolean }) {
  const steps = school ? schoolSteps : enpathSteps;
  return (
    <ol
      className={`${styles.flow} ${school ? styles.schoolFlow : styles.enpathFlow}`}
      aria-label={
        school ? "英会話スクールの学習の流れ" : "ENPATHの学習支援の流れ"
      }
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={school && index === 1 ? styles.lesson : undefined}
        >
          <div className={styles.icon}>
            <Image
              src={`${assetRoot}${step.image}.webp`}
              width={256}
              height={256}
              sizes="(max-width: 760px) 60px, 76px"
              alt={step.alt}
            />
          </div>
          <h4>{step.title}</h4>
          <p>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function FeatureComparison() {
  return (
    <section
      id="understand"
      className={styles.section}
      aria-labelledby="difference-heading"
    >
      <div className="container">
        <div className={styles.heading}>
          <p className={styles.eyebrow}>DIFFERENCE</p>
          <h2 id="difference-heading">
            <span>英会話スクールと、</span>
            <span>どう違うの？</span>
          </h2>
          <p className={styles.lead}>
            英会話スクールが、レッスンを通じて英語を話す・学ぶ機会を提供するのに対し、ENPATHは一人ひとりの目標や生活に合わせて、日々の学習そのものを設計し、継続を支えます。
          </p>
        </div>
        <div className={styles.cards}>
          <article
            className={`${styles.card} ${styles.school}`}
            aria-labelledby="school-heading"
          >
            <div className={styles.photo}>
              <Image
                src={`${assetRoot}collaborative_english_workshop_discussion.webp`}
                width={1448}
                height={1086}
                sizes="(max-width: 900px) calc(100vw - 44px), (max-width: 1328px) calc((100vw - 128px) / 2), 588px"
                alt="教室で講師1名と複数の学習者が英語のグループレッスンを受ける様子"
              />
            </div>
            <div className={styles.cardBody}>
              <h3 id="school-heading">一般的な英会話スクール</h3>
              <p className={styles.description}>
                レッスンを通じて、英語を話す機会を提供する
              </p>
              <Flow school />
            </div>
          </article>
          <article
            className={`${styles.card} ${styles.enpath}`}
            aria-labelledby="enpath-heading"
          >
            <div className={styles.photo}>
              <Image
                src={`${assetRoot}virtual_coaching_session.webp`}
                width={1448}
                height={1086}
                sizes="(max-width: 900px) calc(100vw - 44px), (max-width: 1328px) calc((100vw - 128px) / 2), 588px"
                alt="自宅の学習者がパソコン越しに女性コーチと1対1で対話する様子"
              />
            </div>
            <div className={styles.cardBody}>
              <h3 id="enpath-heading">ENPATH</h3>
              <p className={styles.description}>
                目標から日々の学習まで、一緒に設計し伴走する
              </p>
              <Flow />
            </div>
          </article>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="sr-only">
              一般的な英会話スクールのグループレッスンとENPATHのサービス比較
            </caption>
            <thead>
              <tr>
                <th scope="col">比較項目</th>
                <th scope="col">
                  一般的な英会話スクール<span>グループレッスンの例</span>
                </th>
                <th scope="col">ENPATH</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map(({ label, icon: Icon, school, enpath }) => (
                <tr key={label}>
                  <th scope="row">
                    <span>
                      <Icon size={22} aria-hidden="true" />
                      {label}
                    </span>
                  </th>
                  <td>{school}</td>
                  <td>{enpath}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className={styles.mobileComparison}
          aria-label="サービス内容の比較"
        >
          {comparisons.map(({ label, icon: Icon, school, enpath }) => (
            <div className={styles.mobileRow} key={label}>
              <h3>
                <Icon size={20} aria-hidden="true" />
                {label}
              </h3>
              <dl>
                <div>
                  <dt>
                    英会話スクール<span>グループレッスンの例</span>
                  </dt>
                  <dd>{school}</dd>
                </div>
                <div>
                  <dt>ENPATH</dt>
                  <dd>{enpath}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          ※英会話スクールにはマンツーマンレッスンや学習支援付きのサービスもあります。比較は代表的なグループレッスンの一例です。
        </p>
      </div>
    </section>
  );
}
