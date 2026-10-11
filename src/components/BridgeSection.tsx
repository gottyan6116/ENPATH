import styles from "./BridgeSection.module.css";

export function BridgeSection() {
  return (
    <section
      id="bridge"
      className={styles.section}
      aria-labelledby="bridge-heading"
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={styles.label}>学習アプリ Bridge</p>
          <h2 id="bridge-heading">
            今日の一歩を、
            <br />
            続く学びへ。
          </h2>
          <p className={styles.lead}>
            何を学ぶかが見えると、毎日の一歩を踏み出しやすくなる。Bridgeは、日々の学習と復習、取り組みの記録をひとつにまとめる学習アプリです。
          </p>
          <ul className={styles.points}>
            <li>
              <strong>今日やることが、ひと目でわかる。</strong>
              <span>復習や記事など、その日の学習メニューを確認。</span>
            </li>
            <li>
              <strong>単語・表現を、繰り返し学ぶ。</strong>
              <span>覚えた内容を復習し、日々の学習につなげます。</span>
            </li>
            <li>
              <strong>積み重ねが、記録に残る。</strong>
              <span>
                継続記録や学習時間から、自分の取り組みを振り返れます。
              </span>
            </li>
          </ul>
        </div>
        <figure className={styles.media}>
          <video
            controls
            playsInline
            preload="none"
            poster="/media/bridge/bridge_intro_poster.jpg"
            width={1920}
            height={1080}
            aria-label="Bridgeの紹介動画"
          >
            <source
              src="/media/bridge/bridge_intro_1080p.webm"
              type="video/webm"
            />
            お使いのブラウザーでは動画を再生できません。
            <a href="/media/bridge/bridge_intro_1080p.webm">
              Bridgeの紹介動画を開く
            </a>
          </video>
          <figcaption>
            Bridgeの使い方を、動画でご紹介します。
            <span>再生・音量・全画面表示は、動画の操作ボタンから。</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
